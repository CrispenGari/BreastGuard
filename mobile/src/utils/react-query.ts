import { ReactNativeFile } from "apollo-upload-client";
import { SERVER_BASE_URL } from "../constants";
import { TInferenceResponse } from "../types";

export const predictCancerMutation = async ({
  image,
}: {
  image: ReactNativeFile;
}) => {
  const formData = new FormData();
  formData.append("image", image);
  const res = await fetch(`${SERVER_BASE_URL}/predict`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  return data as TInferenceResponse;
};
