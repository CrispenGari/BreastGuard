import { APP_NAME, COLORS, FONTS, IMAGES } from "@/src/constants";
import { useSettingsStore } from "@/src/store/settingsStore";

import { useRouter } from "expo-router";
import React from "react";
import { Animated, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Page = () => {
  const scale = React.useRef(new Animated.Value(0.5)).current;
  const opacity = React.useRef(new Animated.Value(0.5)).current;
  const { settings } = useSettingsStore();

  const router = useRouter();

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 3.4,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();

    const timeoutInterVal = setTimeout(async () => {
      if (!!!settings.new) {
        router.replace({
          pathname: "/(tabs)/home",
        });
      } else {
        router.replace({
          pathname: "/(auth)/landing",
        });
      }
    }, 3000);
    return () => {
      clearTimeout(timeoutInterVal);
    };
  }, [settings]);
  return (
    <ImageBackground
      style={{
        flex: 1,
      }}
      source={IMAGES.background}
      blurRadius={80}
    >
      <SafeAreaView
        style={{
          flex: 1,
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.View
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            padding: 10,
            transform: [{ scale }],
          }}
        >
          <Animated.Image
            source={IMAGES.logo}
            style={{
              width: 200,
              height: 150,
              borderRadius: 10,
              objectFit: "contain",
            }}
          />
          <Animated.Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: 25,
              color: COLORS.white,
              transform: [{ scale }],
            }}
          >
            {APP_NAME}
          </Animated.Text>
        </Animated.View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Page;
