import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "@/src/constants";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import HelpBottomSheet from "../BottomSheets/HelpBottomSheet";
import { useSettingsStore } from "@/src/store/settingsStore";
import { onImpact } from "@/src/utils";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const PredictHeader = () => {
  const helpBottomSheetRef = React.useRef<BottomSheetModal>(null);
  const { settings } = useSettingsStore();
  const router = useRouter();
  return (
    <>
      <HelpBottomSheet ref={helpBottomSheetRef} />
      <SafeAreaView
        style={{
          backgroundColor: COLORS.tertiary,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 90,
            flexDirection: "row",
            paddingHorizontal: 20,
            paddingVertical: 30,
            gap: 20,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            hitSlop={20}
            style={{
              borderRadius: 40,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: COLORS.primary,
              width: 45,
              height: 45,
            }}
            onPressIn={async () => {
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
            <Ionicons name="chevron-back" size={20} color={COLORS.white} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: FONTS.bold,
                color: COLORS.white,
                fontSize: 20,
              }}
            >
              Predict Breast Cancer Status
            </Text>
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: 12,
                color: COLORS.white,
              }}
            >
              What is the breast image result?
            </Text>
          </View>
          <TouchableOpacity
            hitSlop={30}
            style={{
              backgroundColor: COLORS.primary,
              justifyContent: "center",
              alignItems: "center",
              width: 45,
              height: 45,
              borderRadius: 45,
            }}
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              helpBottomSheetRef.current?.present();
            }}
          >
            <Ionicons name="help" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default PredictHeader;
