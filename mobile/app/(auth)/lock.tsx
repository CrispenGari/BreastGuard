import {
  Animated,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSettingsStore } from "@/src/store/settingsStore";
import { onImpact } from "@/src/utils";
import { APP_NAME, COLORS, FONTS, IMAGES } from "@/src/constants";
import { LinearGradient } from "expo-linear-gradient";

const Page = () => {
  const { settings } = useSettingsStore();
  const scale = React.useRef(new Animated.Value(0.5)).current;
  const opacity = React.useRef(new Animated.Value(0.5)).current;
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

    if (!settings.lock) {
      router.replace({
        pathname: "/(tabs)/home",
      });
    }
  }, [settings]);

  const unlockApp = async () => {
    if (settings.haptics) {
      await onImpact();
    }
    const { success } = await LocalAuthentication.authenticateAsync({
      disableDeviceFallback: true,
      biometricsSecurityLevel: "strong",
      cancelLabel: "CANCEL",
      promptMessage: `Please unlock your phone to use ${APP_NAME}.`,
      requireConfirmation: true,
    });
    if (success) {
      router.replace({ pathname: "/(tabs)/home" });
    }
  };

  return (
    <ImageBackground
      source={IMAGES.background}
      style={{
        flex: 1,
        backgroundColor: COLORS.main,
      }}
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
            backgroundColor: COLORS.white,
            borderRadius: 10,
            padding: 10,
            transform: [{ scale }],
          }}
        >
          <Animated.Image
            source={require("@/assets/images/icon.png")}
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
              color: COLORS.black,
              transform: [{ scale }],
            }}
          >
            {APP_NAME}
          </Animated.Text>
        </Animated.View>

        <TouchableOpacity
          style={{
            width: "100%",
            maxWidth: 300,
            marginTop: 200,
            height: 45,
          }}
          onPress={unlockApp}
        >
          <LinearGradient
            colors={[COLORS.secondary, COLORS.tertiary]}
            style={{
              padding: 10,
              backgroundColor: COLORS.secondary,
              borderRadius: 999,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              flex: 1,
              gap: 20,
            }}
            start={{ x: 0, y: 0 }}
          >
            <MaterialCommunityIcons
              name="fingerprint"
              size={24}
              color={COLORS.white}
            />
            <Text
              style={{
                color: COLORS.white,
                fontFamily: FONTS.bold,
                fontSize: 18,
              }}
            >
              Unlock {APP_NAME}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Page;
