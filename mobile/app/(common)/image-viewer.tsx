import { COLORS, FONTS, IMAGES } from "@/src/constants";
import { useSettingsStore } from "@/src/store/settingsStore";
import { onImpact } from "@/src/utils";
import { Ionicons } from "@expo/vector-icons";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import { BlurView } from "expo-blur";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ImageBackground,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";

const Page = () => {
  const { settings } = useSettingsStore();
  const { uri, title } = useLocalSearchParams<{
    uri: string;
    title: string;
  }>();
  const router = useRouter();
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          presentation: Platform.select({ android: "fullScreenModal" }),
          headerShadowVisible: false,
          headerTitle: title || "Profile Picture",
          headerTransparent: true,
          headerBackground: () => (
            <BlurView
              tint="dark"
              intensity={0}
              style={StyleSheet.absoluteFill}
            />
          ),
          headerTitleStyle: { fontFamily: FONTS.bold, color: COLORS.black },
          headerLeft: () => (
            <TouchableOpacity
              style={{ width: 40 }}
              onPress={async () => {
                if (settings.haptics) {
                  await onImpact();
                }
                if (router.canGoBack()) {
                  router.back();
                } else {
                  router.replace({
                    pathname: "/(tabs)/home",
                  });
                }
              }}
            >
              <Ionicons name="chevron-back" size={20} color={COLORS.black} />
            </TouchableOpacity>
          ),
        }}
      />
      <RootSiblingParent>
        <BlurView intensity={100} tint="extraLight" style={{ flex: 1 }}>
          <ImageBackground
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            source={IMAGES.background}
            blurRadius={80}
          >
            <ImageZoom
              uri={uri}
              minScale={0.7}
              maxScale={5}
              doubleTapScale={2}
              isSingleTapEnabled
              isDoubleTapEnabled
              style={{ width: "80%", height: "80%" }}
              resizeMode="contain"
            />
          </ImageBackground>
        </BlurView>
      </RootSiblingParent>
    </>
  );
};

export default Page;
