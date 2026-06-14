export type TModel = "mobilenetv3" | "resnet50" | "densenet201";
export type TStatus = "ok" | "error";

export interface TPrediction {
  label: number;
  class_label: string;
  probability: number;
}

export interface TPredictionResponse {
  time: number;
  ok: boolean;
  status: TStatus;
  prediction: TPrediction;
  model: TModel;
}
export type THistory = {
  id: string;
  date: Date;
  prediction: TPredictionResponse;
  xray: string;
  image: string;
};
