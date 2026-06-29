from datetime import datetime
from typing import Optional, Dict, Literal

from pydantic import BaseModel, ConfigDict, HttpUrl

# ======================================================
# Collection Schemas
# ======================================================

class CollectionBase(BaseModel):
    name: str
    description: Optional[str] = None


class CollectionCreate(CollectionBase):
    pass


class CollectionUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

class CollectionRequestResponse(BaseModel):
    id: int
    name: str
    method: str
    url: str

    model_config = ConfigDict(from_attributes=True)
class CollectionResponse(CollectionBase):
    id: int

    created_at: datetime

    updated_at: datetime

    requests: list[CollectionRequestResponse] = []

    model_config = ConfigDict(from_attributes=True)


# ======================================================
# Request Schemas
# ======================================================

class RequestBase(BaseModel):
    name: str
    method: str
    url: str

    params: Optional[Dict[str, str]] = None
    headers: Optional[Dict[str, str]] = None

    body: Optional[str] = None
    body_type: Optional[str] = None

    content_type: Optional[str] = None

    auth_type: Optional[str] = None
    auth_value: Optional[str] = None


class RequestCreate(RequestBase):
    collection_id: int


class RequestUpdate(BaseModel):
    name: Optional[str] = None
    method: Optional[str] = None
    url: Optional[str] = None

    params: Optional[Dict[str, str]] = None
    headers: Optional[Dict[str, str]] = None

    body: Optional[str] = None
    body_type: Optional[str] = None

    content_type: Optional[str] = None

    auth_type: Optional[str] = None
    auth_value: Optional[str] = None

    collection_id: Optional[int] = None


class RequestResponse(RequestBase):
    id: int
    collection_id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


# ======================================================
# Environment Schemas
# ======================================================

class EnvironmentBase(BaseModel):
    name: str


class EnvironmentCreate(EnvironmentBase):
    pass


class EnvironmentUpdate(BaseModel):
    name: Optional[str] = None


class EnvironmentResponse(EnvironmentBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# ======================================================
# Variable Schemas
# ======================================================

class VariableBase(BaseModel):
    key: str
    value: Optional[str] = None
    is_enabled: bool = True


class VariableCreate(VariableBase):
    environment_id: int


class VariableUpdate(BaseModel):
    key: Optional[str] = None
    value: Optional[str] = None
    is_enabled: Optional[bool] = None
    environment_id: Optional[int] = None


class VariableResponse(VariableBase):
    id: int
    environment_id: int

    model_config = ConfigDict(from_attributes=True)


# ======================================================
# History Schemas
# ======================================================

class HistoryResponse(BaseModel):
    id: int

    method: str
    url: str

    status_code: Optional[int] = None

    response_time: Optional[int] = None

    response_size: Optional[int] = None

    request_body: Optional[str] = None

    response_body: Optional[str] = None

    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# ======================================================
# Request Runner Schemas
# ======================================================

class SendRequest(BaseModel):
    method: Literal[
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "HEAD",
        "OPTIONS",
    ]

    url: HttpUrl

    params: Optional[Dict[str, str]] = None

    headers: Optional[Dict[str, str]] = None

    body: Optional[str] = None

    body_type: Optional[str] = None

    auth_type: Optional[str] = None

    auth_value: Optional[str] = None

    # Used for {{variable}} replacement
    environment: Optional[Dict[str, str]] = None


class SendResponse(BaseModel):
    status_code: int

    response_time: float

    response_size: int

    headers: Dict[str, str]

    body: str