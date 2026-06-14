import { ImageBackground, ScrollView } from "react-native";
import React from "react";
import { COLORS, IMAGES } from "@/src/constants";
import { useSettingsStore } from "@/src/store/settingsStore";
import Tip from "@/src/components/Tip/Tip";
import Form from "@/src/components/Form/Form";
import RecentPredictions from "@/src/components/RecentPredictions/RecentPredictions";

const Page = () => {
  const { settings } = useSettingsStore();
  return (
    <ImageBackground
      style={{
        flex: 1,
      }}
      source={IMAGES.background}
      blurRadius={80}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: COLORS.transparent,
        }}
        contentContainerStyle={{
          paddingBottom: 300,
          padding: 10,
          gap: 10,
        }}
        showsVerticalScrollIndicator={false}
        bounces
      >
        <Tip />
        <Form />
        <RecentPredictions />
      </ScrollView>
    </ImageBackground>
  );
};

export default Page;
