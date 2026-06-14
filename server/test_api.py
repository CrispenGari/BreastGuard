from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

class TestAPI:
    def test_root(self):
        res = client.get("/")
        assert res.status_code == 200
        assert res.json() == {
            "title": "BreastGuard API",
            "description": "API for breast cancer detection using deep learning.",
            "version": "1.0.0",
        }

    def test_prediction_without_image(self):
        res = client.post("/api/v1/cancer/predict")
        assert res.status_code == 422

    def test_benign_prediction_mobilenetv3(self):
        with open("images/benign.jpg", "rb") as image:
            files = {"image": ("benign.jpg", image, "image/jpg")}
            res = client.post("/api/v1/cancer/predict", files=files)

        data = res.json()

        assert res.status_code == 200
        assert data["ok"] is True
        assert data["status"] == "ok"
        assert data["model"] == "mobilenetv3"
        assert data["prediction"]["label"] == 0
        assert data["prediction"]["class_label"] == "benign"


    def test_malignant_prediction_mobilenetv3(self):
        with open("images/malignant.jpg", "rb") as image:
            files = {"image": ("malignant.jpg", image, "image/jpg")}
            res = client.post("/api/v1/cancer/predict", files=files)

        data = res.json()

        assert res.status_code == 200
        assert data["ok"] is True
        assert data["status"] == "ok"
        assert data["model"] == "mobilenetv3"
        assert data["prediction"]["label"] == 1
        assert data["prediction"]["class_label"] == "malignant"
