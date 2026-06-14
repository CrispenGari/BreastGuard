import { ImageBackground } from "react-native";
import React from "react";
import { IMAGES } from "@/src/constants";

const Page = () => {
  return (
    <ImageBackground
      style={{
        flex: 1,
      }}
      source={IMAGES.background}
      blurRadius={6}
    ></ImageBackground>
  );
};

export default Page;
