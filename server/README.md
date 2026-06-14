### Using cURL

The following commands can be used to test the BreastGuard API using `cURL`.

```shell
# benign case
curl -X POST -F image=@benign.jpg http://127.0.0.1:8000/api/v1/cancer/predict

# malignant case
curl -X POST -F image=@malignant.jpg http://127.0.0.1:8000/api/v1/cancer/predict
```

### Expected Response

The following is an example of the expected API response.

```json
{
  "time": 0.3037984371185303,
  "ok": true,
  "status": "ok",
  "prediction": {
    "label": 1,
    "class_label": "malignant",
    "probability": 0.9876
  },
  "model": "mobilenetv3",
  "id": "123e4567-e89b-12d3-a456-426614174000"
}
```

### Testing the API

To run unit tests for the API, use the following command:

```shell
pytest
```

### Starting the Server Using `uvicorn`

The FastAPI server can be started using the following command:

```shell
uvicorn app:app --host 0.0.0.0 --port 8000
```

After starting the server, the API will be available locally at:

```shell
http://127.0.0.1:8000
```

To access the API from another device on the same network, first get your machine’s IPv4 address:

```shell
ifconfig   # macOS and Linux

ipconfig   # Windows
```

The network server URL will look similar to:

```shell
http://192.168.1.50:8000
```

The interactive API documentation can be accessed at:

```shell
http://127.0.0.1:8000/docs
```
