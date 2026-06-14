import { COLORS, FONTS, IMAGES } from "@/src/constants";
import { useSettingsStore } from "@/src/store/settingsStore";
import { onImpact } from "@/src/utils";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as Constants from "expo-constants";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated from "react-native-reanimated";

const HomeHeader = () => {
  const { settings } = useSettingsStore();

  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor: COLORS.tertiary,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 100,
            flexDirection: "row",
            paddingHorizontal: 20,
            paddingVertical: 30,
            gap: 20,
            paddingBottom: 0,
          }}
        >
          <View
            style={{
              flex: 1,
              gap: 15,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Animated.Image
              source={IMAGES.logo}
              style={{ width: 40, height: 40 }}
            />
            <View>
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  color: COLORS.white,
                  fontSize: 20,
                }}
              >
                {Constants.default.expoConfig?.name}
              </Text>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 14,
                  fontFamily: FONTS.regular,
                }}
              >
                Version: {Constants.default.expoConfig?.version}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            hitSlop={30}
            style={{
              borderRadius: 45,
            }}
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
            }}
          >
            <AntDesign name="dashboard" size={30} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomeHeader;
