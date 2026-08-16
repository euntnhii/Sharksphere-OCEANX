from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import __main__
from model_package import IFDiffiPackage, load_package
import math

__main__.IFDiffiPackage = IFDiffiPackage

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://euntnhii.github.io"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = load_package("sharksphere_if_diffi.joblib")

@app.post("/predict")
def predict(data: dict):

    result = model.predict_one(data)

    score = result["anomaly_score"]

    percentage = 100 / (1 + math.exp(3 * (score + 1.0))) # anchor at baseline

    result["anomaly_percentage"] = percentage

    return result