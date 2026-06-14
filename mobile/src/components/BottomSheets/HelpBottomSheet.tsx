import { COLORS, FONTS } from "@/src/constants";
import { useSettingsStore } from "@/src/store/settingsStore";
import { onImpact } from "@/src/utils";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as Constants from "expo-constants";

const HelpBottomSheet = React.forwardRef<BottomSheetModal, {}>(({}, ref) => {
  const snapPoints = React.useMemo(() => ["50%"], []);
  const { dismiss } = useBottomSheetModal();
  const { settings } = useSettingsStore();

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      index={0}
      enablePanDownToClose={false}
      enableOverDrag={false}
      handleComponent={null}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
    >
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 100,
        }}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        StickyHeaderComponent={(props) => (
          <View
            style={{
              paddingTop: 50,
              paddingBottom: 10,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: FONTS.bold,
                marginBottom: 10,
              }}
            >
              Help
            </Text>
            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                backgroundColor: COLORS.main,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 30,
              }}
              hitSlop={20}
              onPress={async () => {
                if (settings.haptics) {
                  await onImpact();
                }
                dismiss();
              }}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: FONTS.bold,
            marginBottom: 10,
          }}
        >
          Help
        </Text>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: 18,
          }}
        >
          BreastGuard is a mobile-based AI decision-support app created to help
          users classify breast cancer images as benign or malignant using deep
          learning.
          {"\n\n"}The app allows you to capture or upload a breast cancer image
          and receive an AI-powered prediction. It uses a trained breast cancer
          classification model to analyze the image and provide a predicted
          class, indicating whether the image is likely benign or malignant.
          {"\n\n"}BreastGuard also provides prediction confidence scores to help
          users understand how certain the model is about its result.
          {"\n\n"}The system is designed to support students, researchers,
          healthcare learners, and medical decision-support experiments by
          making breast cancer image classification faster, more accessible, and
          easier to use through a mobile device.
          {"\n\n"}BreastGuard is intended to support breast cancer screening
          research and educational decision-making, but it does not replace
          professional medical advice, clinical diagnosis, biopsy, laboratory
          testing, or consultation with qualified healthcare professionals.
        </Text>
        <Text
          style={{
            color: COLORS.secondary,
            fontFamily: FONTS.regular,
            marginTop: 50,
            textAlign: "center",
          }}
        >
          {Constants.default.expoConfig?.name} • Version:{" "}
          {Constants.default.expoConfig?.version}
        </Text>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

export default HelpBottomSheet;
