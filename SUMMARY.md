### Results Summary and Deployment Recommendation

### 1. Overview

This report summarizes the experimental results obtained from the breast cancer detection notebook. The notebook implements a binary image classification pipeline for distinguishing between **benign** and **malignant** breast cancer images. Three deep learning models were trained and evaluated:

- MobileNetV3 Large
- EfficientNetV2-S
- Modified AlexNet

The analysis focuses on dataset preparation, model performance, numerical results, confusion matrix outcomes, inference behaviour, and the final model selected for deployment.

### 2. Dataset Summary

The final merged dataset contains **17,783 breast cancer images** belonging to two classes: benign and malignant.

| Class     | Number of Images | Percentage |
| --------- | ---------------: | ---------: |
| Benign    |            7,479 |      42.1% |
| Malignant |           10,304 |      57.9% |
| **Total** |       **17,783** |   **100%** |

The dataset shows a moderate class imbalance, with malignant images forming the majority class.

### 3. Data Splitting

The dataset was divided into training, validation, and testing subsets.

| Split      | Number of Images | Percentage |
| ---------- | ---------------: | ---------: |
| Training   |           11,382 |      64.0% |
| Validation |            2,845 |      16.0% |
| Testing    |            3,556 |      20.0% |
| **Total**  |       **17,783** |   **100%** |

The training set was used for model learning, the validation set was used for checkpoint selection, and the test set was used for final evaluation.

### 4. Preprocessing and Augmentation

All images were resized to **224 × 224 pixels**. Training images were augmented to improve generalization and reduce overfitting. The augmentation strategy included:

- Random rotation of **5 degrees**
- Random horizontal flipping with probability **0.5**
- Random crop with padding of **2**
- Normalization using dataset-specific channel statistics

The computed normalization values were:

| Statistic          | Red Channel | Green Channel | Blue Channel |
| ------------------ | ----------: | ------------: | -----------: |
| Mean               |      0.7659 |        0.6125 |       0.7472 |
| Standard Deviation |      0.1083 |        0.1436 |       0.0901 |

### 5. Training Configuration

The models were trained using the following setup:

| Configuration      | Value                 |
| ------------------ | --------------------- |
| Task               | Binary classification |
| Classes            | Benign and malignant  |
| Image size         | 224 × 224             |
| Batch size         | 128                   |
| Number of epochs   | 30                    |
| Optimizer          | Adam                  |
| Learning rate      | 0.001                 |
| Loss function      | BCEWithLogitsLoss     |
| Output activation  | Sigmoid               |
| Decision threshold | 0.5                   |
| Device             | CUDA GPU              |

MobileNetV3 and EfficientNetV2 were trained using pretrained weights, while the modified AlexNet model was trained from scratch.

### 6. Model Complexity and Training Summary

| Model            | Parameters |  FLOPs/MACs | Training Time | Last Saved Epoch | Checkpoint Size |
| ---------------- | ---------: | ----------: | ------------: | ---------------: | --------------: |
| MobileNetV3      |      4.20M | 230.04 MMac |    7:31:35.29 |               21 |         16.2 MB |
| EfficientNetV2   |     20.18M |   2.89 GMac |   29:36:56.26 |               26 |         77.8 MB |
| Modified AlexNet |     21.77M |   2.13 GMac |    3:20:17.38 |               30 |         83.0 MB |

MobileNetV3 is the most lightweight model, with the lowest number of parameters, lowest computational cost, and smallest checkpoint size. EfficientNetV2 is the most computationally expensive model, while AlexNet has the largest checkpoint size despite having weaker predictive performance.

### 7. Test Performance Summary

The notebook reports the following best checkpointed model performance on the test set.

| Model          | Test Loss | Accuracy | Test Samples | Inference Time |
| -------------- | --------: | -------: | -----------: | -------------: |
| AlexNet        |      0.11 |   96.73% |        3,556 |     0:01:41.60 |
| MobileNetV3    |      0.03 |   99.33% |        3,556 |     0:01:36.78 |
| EfficientNetV2 |      0.01 |   99.78% |        3,556 |     0:01:40.15 |

EfficientNetV2 achieved the highest reported test accuracy and lowest test loss. MobileNetV3 achieved nearly similar performance while requiring substantially fewer computational resources. AlexNet produced the weakest performance among the three models.

### 8. Confusion Matrix-Based Performance

The confusion matrices provide direct sample-level classification counts. These results are important because they show the actual number of correct and incorrect predictions.

| Model            | Correct Predictions | Errors | Sample-Level Accuracy |
| ---------------- | ------------------: | -----: | --------------------: |
| MobileNetV3      |       3,537 / 3,556 |     19 |                99.47% |
| EfficientNetV2   |       3,543 / 3,556 |     13 |                99.63% |
| Modified AlexNet |       3,428 / 3,556 |    128 |                96.40% |

Although the evaluation table reports slightly different accuracy values, the confusion matrix results are more useful for direct error analysis because they are calculated from actual sample counts.

### 9. Class-Level Error Analysis

Assuming malignant is the positive class, the confusion matrix values can be interpreted as follows.

| Model            | Benign Correctly Classified | Benign Predicted as Malignant | Malignant Predicted as Benign | Malignant Correctly Classified |
| ---------------- | --------------------------: | ----------------------------: | ----------------------------: | -----------------------------: |
| MobileNetV3      |                       1,497 |                            14 |                             5 |                          2,040 |
| EfficientNetV2   |                       1,504 |                             7 |                             6 |                          2,039 |
| Modified AlexNet |                       1,438 |                            73 |                            55 |                          1,990 |

The most important error in this medical classification context is the **false negative**, where a malignant image is incorrectly predicted as benign. MobileNetV3 produced the fewest false negatives, with only **5 malignant cases missed**. EfficientNetV2 missed **6 malignant cases**, while AlexNet missed **55 malignant cases**.

### 10. Medical Classification Metrics

| Model            | Sensitivity / Malignant Recall | Specificity / Benign Recall | False Negatives |
| ---------------- | -----------------------------: | --------------------------: | --------------: |
| MobileNetV3      |                         99.76% |                      99.07% |               5 |
| EfficientNetV2   |                         99.71% |                      99.54% |               6 |
| Modified AlexNet |                         97.31% |                      95.17% |              55 |

EfficientNetV2 achieved the best overall sample-level accuracy and specificity. However, MobileNetV3 achieved the best malignant recall and the lowest number of false negatives. This is especially important for breast cancer screening support, where missing malignant cases is more critical than incorrectly flagging benign images.

### 11. Training Behaviour

The training and validation curves show that MobileNetV3 and EfficientNetV2 converged strongly and achieved high validation performance. EfficientNetV2 reached the lowest validation loss, while MobileNetV3 achieved very competitive validation and test results with a much smaller architecture.

AlexNet improved during training but remained less competitive than the pretrained models. Its validation loss stayed higher, and it only reached its best checkpoint at epoch 30. This suggests weaker convergence and lower generalization ability compared with MobileNetV3 and EfficientNetV2.

### 12. Final Inference Examples

The notebook also tested one benign and one malignant image using the trained models.

| Model            | Benign Sample Prediction                        | Malignant Sample Prediction                                             |
| ---------------- | ----------------------------------------------- | ----------------------------------------------------------------------- |
| MobileNetV3      | Correctly predicted benign with confidence 1.00 | Correctly predicted malignant with confidence 1.00                      |
| EfficientNetV2   | Correctly predicted benign with confidence 1.00 | Correctly predicted malignant with confidence 1.00                      |
| Modified AlexNet | Correctly predicted benign with confidence 0.89 | Incorrectly predicted benign for a malignant image with confidence 0.70 |

The final inference examples further confirm that AlexNet is not suitable for deployment, since it incorrectly classified the malignant sample as benign.

### 13. Deployment Recommendation

#### Selected Model: MobileNetV3

MobileNetV3 is selected as the most suitable model for deployment in the BreastGuard application.

Although EfficientNetV2 achieved the highest overall test accuracy, the improvement over MobileNetV3 was small. EfficientNetV2 correctly classified **3,543** out of **3,556** test images, while MobileNetV3 correctly classified **3,537** out of **3,556** test images. This means EfficientNetV2 made only **6 fewer errors** than MobileNetV3.

However, EfficientNetV2 is significantly more expensive to deploy. It has **20.18M parameters**, **2.89 GMac**, and a checkpoint size of **77.8 MB**. In comparison, MobileNetV3 has only **4.20M parameters**, **230.04 MMac**, and a checkpoint size of **16.2 MB**. This makes MobileNetV3 more suitable for mobile, edge, or resource-constrained deployment.

MobileNetV3 also produced the lowest number of false negatives, missing only **5 malignant cases**, compared with **6** for EfficientNetV2 and **55** for AlexNet. Since false negatives are highly critical in breast cancer screening, this gives MobileNetV3 an important practical advantage.

### 14. Final Deployment Statement

MobileNetV3 is the best model for deployment because it provides the strongest balance between diagnostic performance and computational efficiency. It achieved excellent test performance with **99.47% sample-level accuracy**, only **19 total errors**, and the lowest number of malignant false negatives among the evaluated models. At the same time, it is much smaller and more computationally efficient than EfficientNetV2, with only **4.20M parameters**, **230.04 MMac**, and a **16.2 MB** checkpoint size.

Therefore, MobileNetV3 is recommended for the BreastGuard deployment scenario because it maintains high classification reliability while remaining practical for mobile and resource-constrained environments.

### 15. Conclusion

The notebook demonstrates that pretrained convolutional neural networks perform strongly for breast cancer image classification. EfficientNetV2 achieved the highest overall accuracy, but its high computational cost makes it less practical for deployment. AlexNet performed the weakest and produced the highest number of false negatives, making it unsuitable for a medical screening support system.

MobileNetV3 offers the best trade-off between accuracy, sensitivity, model size, inference practicality, and deployment efficiency. It is therefore the most appropriate model for real-world deployment in the BreastGuard breast cancer detection application.
