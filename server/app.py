from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from torchvision import models
import warnings
from routers.predictCancer import predictCancerRouter
from models import device
warnings.filterwarnings("ignore")


def download_add_cache_models():
    print(f"🖥️ --------------- Running the models on: {device} --------------- \n")
    print(" *  DOWNLOADING AND CACHING MODELS")
    models.mobilenet_v3_large(weights=False)
    print(" *  DONE DOWNLOADING AND CACHING MODELS")


@asynccontextmanager
async def lifespan(app: FastAPI):
    download_add_cache_models()
    yield


app = FastAPI(
    title="BreastGuard API",
    description="API for breast cancer detection using deep learning.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predictCancerRouter)

@app.get("/")
def root():
    return JSONResponse(
        {
            "title": "BreastGuard API",
            "description": "API for breast cancer detection using deep learning.",
            "version": "1.0.0",
        },
        status_code=200,
    )