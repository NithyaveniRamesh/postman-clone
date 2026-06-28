from fastapi import FastAPI

app = FastAPI(
    title="Postman Clone API",
    version="1.0.0",
)

@app.get("/")
async def root():
    return {
        "message": "Welcome to the Postman Clone Backend!"
    }