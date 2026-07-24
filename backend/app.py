from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import __main__
from model_package import IFDiffiPackage, load_package
import math

__main__.IFDiffiPackage = IFDiffiPackage

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = load_package("sharksphere_if_diffi.joblib")

@app.post("/predict")
def predict(data: dict):

    result = model.predict_one(data)

    score = result["anomaly_score"]

    percentage = 100 / (1 + math.exp(25 * (score + 0.60))) #-0.60 threshold for anomaly score, 25 steepness of the curve

    result["anomaly_percentage"] = percentage

    return result