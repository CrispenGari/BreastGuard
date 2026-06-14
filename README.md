### BreastGuard: Breast Cancer Detection Using MobileNetV3, EfficientNetV2, and Modified AlexNet

### Overview

**BreastGuard** is an honours research project focused on developing a lightweight, explainable, and deployment-oriented deep learning system for **breast cancer image classification**. The project aims to support early breast cancer screening by classifying breast histopathology images as either **benign** or **malignant**.

The study compares three convolutional neural network architectures:

- **MobileNetV3**
- **EfficientNetV2**
- **Modified AlexNet**

The best-performing model is intended for integration into a mobile health (**mHealth**) application through a **FastAPI backend**, supporting AI-assisted breast cancer detection in resource-constrained healthcare environments.

- [BreastGuard: Breast Cancer Detection Using MobileNetV3, EfficientNetV2, and Modified AlexNet](#breastguard-breast-cancer-detection-using-mobilenetv3-efficientnetv2-and-modified-alexnet)
- [Overview](#overview)
- [Project Motivation](#project-motivation)
- [Research Aim](#research-aim)
- [Objectives](#objectives)
- [Datasets](#datasets)
- [Dataset Classes](#dataset-classes)
- [Methodology](#methodology)
- [Data Pipeline](#data-pipeline)
- [Data Splitting](#data-splitting)
- [Class Imbalance Handling](#class-imbalance-handling)
- [Models](#models)
  - [MobileNetV3](#mobilenetv3)
  - [EfficientNetV2](#efficientnetv2)
  - [Modified AlexNet](#modified-alexnet)
- [Model Output](#model-output)
- [Training Configuration](#training-configuration)
- [Hardware Used](#hardware-used)
- [Evaluation Metrics](#evaluation-metrics)
- [Wilson Score Confidence Intervals](#wilson-score-confidence-intervals)
- [Explainability with Grad-CAM](#explainability-with-grad-cam)
- [Model Inference](#model-inference)
- [FastAPI Backend](#fastapi-backend)
- [Installation](#installation)
- [Running the Notebook](#running-the-notebook)
- [Technologies Used](#technologies-used)
- [Limitations](#limitations)
- [Future Work](#future-work)
- [Summary](#summary)
- [Notebooks](#notebooks)
- [References](#references)
- [Author](#author)

### Project Motivation

Breast cancer remains one of the most significant health challenges worldwide, particularly in rural and underserved communities where access to diagnostic infrastructure, early screening services, and specialist interpretation may be limited.

This project is motivated by the need for an accessible and efficient AI-assisted screening tool that can support healthcare workers by providing fast and consistent decision-support. BreastGuard is designed to explore whether lightweight and explainable deep learning models can be used effectively for breast cancer image classification and future mobile-based deployment.

### Research Aim

The main aim of this project is to develop and evaluate a lightweight deep learning-based breast cancer detection system that can classify breast histopathology images into **benign** and **malignant** classes and support future integration into an mHealth application.

### Objectives

The project is guided by the following objectives:

1. To merge and preprocess publicly available breast cancer image datasets for binary classification.
2. To train and compare MobileNetV3, EfficientNetV2, and modified AlexNet models for breast cancer detection.
3. To evaluate model performance using classification metrics, confidence intervals, inference time, and computational complexity.
4. To apply Grad-CAM explainability for qualitative interpretation of model predictions and misclassifications.
5. To prepare the best-performing model for deployment through a FastAPI backend for the BreastGuard mobile application.

### Datasets

This project uses two publicly available breast cancer datasets from Kaggle:

1. **Breast Cancer Dataset by AAbo**
   - Source: https://www.kaggle.com/datasets/anaselmasry/breast-cancer-dataset

2. **Breast Cancer Dataset by Walid**
   - Source: https://www.kaggle.com/datasets/djaidwalid/breast-cancer-dataset/data

The two datasets are merged into one unified dataset containing two class folders:

```text
dataset/
├── benign/
└── malignant/
```

The task is treated as a **binary image classification** problem.

### Dataset Classes

| Class       | Description                        |
| ----------- | ---------------------------------- |
| `benign`    | Non-cancerous breast tissue images |
| `malignant` | Cancerous breast tissue images     |

### Methodology

The project follows the **CRISP-DM** methodology, which provides a structured workflow for data mining and machine learning projects.

| CRISP-DM Phase         | Project Application                                                                                            |
| ---------------------- | -------------------------------------------------------------------------------------------------------------- |
| Business Understanding | Defines the breast cancer detection problem and motivation for BreastGuard                                     |
| Data Understanding     | Explores dataset structure, class distribution, and image samples                                              |
| Data Preparation       | Merges datasets, applies preprocessing, normalization, augmentation, and splitting                             |
| Modelling              | Trains MobileNetV3, EfficientNetV2, and modified AlexNet                                                       |
| Evaluation             | Evaluates accuracy, loss, inference time, confidence intervals, confusion matrices, and classification reports |
| Deployment             | Prepares the selected model for FastAPI and mobile application integration                                     |

### Data Pipeline

A shared preprocessing pipeline is used across all three models to ensure a fair comparison.

| Dataset Split | Transformations Applied                                                                                                  | Purpose                                         |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| Training      | Resize to 224 × 224, random rotation, random horizontal flip, random crop with padding, tensor conversion, normalization | Improves generalization and reduces overfitting |
| Validation    | Resize to 224 × 224, tensor conversion, normalization                                                                    | Supports consistent validation                  |
| Testing       | Resize to 224 × 224, tensor conversion, normalization                                                                    | Supports unbiased final evaluation              |

Channel-wise mean and standard deviation are computed from the training dataset and cached in a `stats.txt` file to avoid unnecessary recomputation.

### Data Splitting

The merged dataset is divided into training, validation, and testing subsets.

| Dataset Split | Final Proportion | Purpose                                                          |
| ------------- | ---------------: | ---------------------------------------------------------------- |
| Training      |              64% | Used to learn model parameters                                   |
| Validation    |              16% | Used to monitor model performance and select the best checkpoint |
| Testing       |              20% | Used for final unbiased model evaluation                         |

### Class Imbalance Handling

Because the merged dataset may be imbalanced, class weighting is applied during training. Since the models perform binary classification using one output node, **BCEWithLogitsLoss** is used with the `pos_weight` argument.

The positive class weight is computed as:

```py
pos_weight = number of negative samples / number of positive samples
```

This helps reduce bias toward the majority class and improves learning for the underrepresented class.

### Models

#### MobileNetV3

MobileNetV3 is a lightweight convolutional neural network designed for efficient inference on mobile and resource-constrained devices. It is included to evaluate deployment suitability for the BreastGuard mHealth application.

#### EfficientNetV2

EfficientNetV2 is a modern convolutional neural network designed for improved training efficiency and strong classification performance. It is included to evaluate high-performance feature learning for breast cancer classification.

#### Modified AlexNet

The modified AlexNet model is used as a classical CNN baseline. It is adapted for binary breast cancer classification and compared against the modern transfer learning architectures.

### Model Output

Since this project is a binary classification task, each model produces **one output score**.

| Model            | Output Dimension | Final Activation During Inference | Task                               |
| ---------------- | ---------------: | --------------------------------- | ---------------------------------- |
| MobileNetV3      |                1 | Sigmoid                           | Benign vs malignant classification |
| EfficientNetV2   |                1 | Sigmoid                           | Benign vs malignant classification |
| Modified AlexNet |                1 | Sigmoid                           | Benign vs malignant classification |

During inference, the sigmoid probability is converted into a class prediction using a threshold of `0.5`.

### Training Configuration

| Component     | Setting                                         |
| ------------- | ----------------------------------------------- |
| Framework     | PyTorch                                         |
| Image Size    | 224 × 224                                       |
| Batch Size    | 128                                             |
| Epochs        | 30                                              |
| Optimizer     | Adam                                            |
| Loss Function | BCEWithLogitsLoss                               |
| Checkpointing | Best model saved when validation loss decreases |
| Device        | CUDA GPU if available                           |

### Hardware Used

Training is performed on a laptop equipped with an NVIDIA GPU.

| Component            | Specification                             |
| -------------------- | ----------------------------------------- |
| GPU                  | NVIDIA RTX 3000 Ada Generation Laptop GPU |
| Driver Version       | 32.0.15.9186                              |
| Driver Date          | 2026/01/20                                |
| DirectX Version      | 12 (FL 12.2)                              |
| Dedicated GPU Memory | 8.0 GB                                    |
| Shared GPU Memory    | 15.8 GB                                   |
| Total GPU Memory     | 23.8 GB                                   |

### Evaluation Metrics

The trained models are evaluated on the held-out test dataset using the following metrics:

| Metric           | Description                                                                |
| ---------------- | -------------------------------------------------------------------------- |
| Test Loss        | Measures model error on unseen data                                        |
| Accuracy         | Measures the proportion of correctly classified samples                    |
| Precision        | Measures how many predicted positive samples are correct                   |
| Recall           | Measures how many actual positive samples are correctly identified         |
| F1-score         | Harmonic mean of precision and recall                                      |
| Support          | Number of true samples in each class                                       |
| Confusion Matrix | Shows true positives, true negatives, false positives, and false negatives |
| Inference Time   | Measures prediction speed                                                  |
| Model Size       | Measures disk storage requirement                                          |
| FLOPs/MACs       | Estimates computational complexity                                         |

### Wilson Score Confidence Intervals

To provide a more reliable estimate of model accuracy, the Wilson Score Confidence Interval is computed at three confidence levels:

| Confidence Level | Z-score |
| ---------------- | ------: |
| 90%              |   1.645 |
| 95%              |   1.960 |
| 99%              |   2.576 |

This helps estimate the range within which the true model accuracy is expected to fall.

### Explainability with Grad-CAM

Gradient-weighted Class Activation Mapping (**Grad-CAM**) is used to provide qualitative explanations of model predictions.

Grad-CAM visualizations include:

- Original input image
- Grad-CAM heatmap
- Overlay visualization
- Grad-CAM-based bounding box

This helps determine whether the models focus on meaningful histopathology regions when classifying images as benign or malignant. Grad-CAM is especially useful for analyzing misclassified samples and understanding possible sources of model error.

### Model Inference

The trained models are tested on individual sample images using a prediction function. Images are loaded using the **PIL Image** library, preprocessed using the same test transformations, and passed through each model.

The inference workflow supports:

- Benign case prediction
- Malignant case prediction
- Confidence score reporting
- Practical demonstration of model use before deployment

### FastAPI Backend

The project includes a FastAPI backend for serving the trained model.

Example API configuration:

```python
app = FastAPI(
    title="BreastGuard API",
    description="API for breast cancer detection using deep learning.",
    version="1.0.0",
    lifespan=lifespan,
)
```

The backend is intended to receive breast cancer image inputs, preprocess them, run model inference, and return the predicted class with confidence.

### Installation

Clone the repository:

```bash
git clone https://github.com/crispengari/BreastGuard.git
cd BreastGuard/server
```

Create and activate a virtual environment:

```bash
python -m venv venv
```

Activate the environment on `Windows`:

```bash
venv\Scripts\activate
```

Activate the environment on `macOS/Linux`:

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

### Running the Notebook

Open the notebook:

```bash
jupyter notebook notebooks/00_BREASTGUARD_BREAST_CANCER_DETECTION.ipynb
```

### Technologies Used

| Technology   | Purpose                                                                                   |
| ------------ | ----------------------------------------------------------------------------------------- |
| Python       | Main programming language for model training, evaluation, and backend development         |
| PyTorch      | Deep learning framework used to train and fine-tune the CNN models                        |
| TorchVision  | Provides pretrained model architectures and image transformation utilities                |
| PIL          | Image loading and preprocessing                                                           |
| NumPy        | Numerical operations and array manipulation                                               |
| Matplotlib   | Visualization of training curves, class distributions, and evaluation results             |
| Scikit-learn | Evaluation metrics such as confusion matrix, classification report, and accuracy analysis |
| FastAPI      | Backend API for serving the trained breast cancer detection models                        |
| Uvicorn      | ASGI server used to run the FastAPI application                                           |
| React Native | Cross-platform mobile application development framework for BreastGuard                   |
| Expo         | Development platform for building, testing, and deploying the React Native mobile app     |
| Kaggle API   | Programmatic dataset access and download                                                  |

### Limitations

This project is intended as an academic honours project and should not be used as a standalone clinical diagnostic system. The model predictions are designed for research and decision-support purposes only. Clinical validation, expert review, and testing on diverse real-world medical datasets would be required before any practical healthcare deployment.

### Future Work

Future improvements may include:

- Testing the models on additional breast cancer datasets
- Performing external validation using data from different institutions
- Improving model calibration and uncertainty estimation
- Deploying the best model into the full BreastGuard mobile application
- Adding user authentication and secure image handling
- Optimizing the model for mobile or edge-device inference
- Comparing additional lightweight architectures
- Conducting usability testing with healthcare workers

### Summary

You can read the summary of findings in the [`SUMMARY.md`](/SUMMARY.md)

### Notebooks

The notebook for training and running experiments can be found in the [`notebooks`](/notebooks/)

### References

AAbo, A. (2021). _Breast Cancer Dataset_. Kaggle.  
https://www.kaggle.com/datasets/anaselmasry/breast-cancer-dataset

Walid, D. (2026). _Breast Cancer Dataset_. Kaggle.  
https://www.kaggle.com/datasets/djaidwalid/breast-cancer-dataset/data

### Author

**Tinashe Crispen Garidzira**  
Honours Research Project  
Project: **BreastGuard**
