import json
import time

import httpx
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, models
from app.database import get_db
from app.logger import logger
from app.schemas import SendRequest, SendResponse
from app.utils.variable_resolver import resolve_variables

router = APIRouter(
    prefix="/runner",
    tags=["Request Runner"],
)


@router.post(
    "/send",
    response_model=SendResponse,
)
async def send_request(
    request: SendRequest,
    db: Session = Depends(get_db),
):
    try:

        # ==========================================
        # Resolve Environment Variables
        # ==========================================

        variables = request.environment or {}

        url = resolve_variables(
            str(request.url),
            variables,
        )

        headers = request.headers or {}

        headers = {
            key: (
                resolve_variables(value, variables)
                if isinstance(value, str)
                else value
            )
            for key, value in headers.items()
        }

        params = request.params or {}

        params = {
            key: (
                resolve_variables(value, variables)
                if isinstance(value, str)
                else value
            )
            for key, value in params.items()
        }

        body = resolve_variables(
            request.body,
            variables,
        )

        # ==========================================
        # Authentication
        # ==========================================

        auth = None

        if request.auth_type == "Bearer":

            headers["Authorization"] = (
                f"Bearer {request.auth_value}"
            )

        elif request.auth_type == "Basic":

            if request.auth_value:

                username, password = (
                    request.auth_value.split(
                        ":",
                        1,
                    )
                )

                auth = (
                    username,
                    password,
                )

        logger.info(
            f"Sending {request.method} request to {url}"
        )

        # ==========================================
        # Send HTTP Request
        # ==========================================

        start_time = time.perf_counter()

        async with httpx.AsyncClient(
            timeout=30,
            follow_redirects=True,
        ) as client:

            response = await client.request(
                method=request.method,
                url=url,
                params=params,
                headers=headers,
                content=body,
                auth=auth,
            )

        end_time = time.perf_counter()

        response_time = round(
            (end_time - start_time) * 1000,
            2,
        )

        response_size = len(
            response.content
        )

        logger.info(
            f"Response received: {response.status_code}"
        )

        # ==========================================
        # Pretty Response
        # ==========================================

        try:

            response_body = json.dumps(
                response.json(),
                indent=2,
            )

        except Exception:

            response_body = response.text

                    # ==========================================
        # Save Request History
        # ==========================================

        history = models.History(
            method=request.method,
            url=url,
            status_code=response.status_code,
            response_time=int(response_time),
            response_size=response_size,
            request_body=body,
            response_body=response_body,
        )

        crud.create_history(
            db,
            history,
        )

        # ==========================================
        # Return Response
        # ==========================================

        return SendResponse(
            status_code=response.status_code,
            response_time=response_time,
            response_size=response_size,
            headers=dict(response.headers),
            body=response_body,
        )

    except httpx.TimeoutException:

        raise HTTPException(
            status_code=408,
            detail="Request timed out.",
        )

    except httpx.InvalidURL:

        raise HTTPException(
            status_code=400,
            detail="Invalid URL.",
        )

    except httpx.ConnectError:

        raise HTTPException(
            status_code=503,
            detail="Unable to connect to the server.",
        )

    except httpx.HTTPStatusError as e:

        raise HTTPException(
            status_code=e.response.status_code,
            detail=str(e),
        )

    except Exception as e:

        logger.exception(e)

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )