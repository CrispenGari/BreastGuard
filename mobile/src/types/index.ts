export type THistory = {
  prediction: TInferenceResponse;
} & {
  id: string;
  date: Date;
  uri: string;
};

export interface TPrediction {
  label: number;
  class_label: string;
  probability: number;
}
export interface TInferenceResponse {
  time: number;
  ok: boolean;
  status: string;
  prediction: TPrediction;
  model: string;
  id: string;
}
