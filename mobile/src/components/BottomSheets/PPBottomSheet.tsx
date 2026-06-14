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
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as Constants from "expo-constants";

const PPBottomSheet = React.forwardRef<BottomSheetModal, {}>(({}, ref) => {
  const snapPoints = React.useMemo(() => ["60%"], []);
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
              Privacy Policy
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
            color: COLORS.transparent,
          }}
        >
          Privacy Policy
        </Text>

        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: 18,
            lineHeight: 26,
          }}
        >
          Your privacy matters to us. BreastGuard is designed to support
          mobile-based breast cancer image classification while respecting and
          protecting your information.
          {"\n\n"}
          BreastGuard may process images that you capture or upload in order to
          classify them as benign or malignant. These images are used only to
          generate AI-powered predictions and confidence scores within the app.
          {"\n\n"}
          The app may collect limited information needed for core functionality,
          such as uploaded image details, prediction results, confidence scores,
          and basic usage information used to improve the app experience.
          {"\n\n"}
          BreastGuard does not sell, rent, or trade your personal information.
          Any information processed by the app is used only to support
          prediction services, improve system performance, protect the platform,
          and provide a better user experience.
          {"\n\n"}
          BreastGuard does not require user authentication. The app does not
          collect or store passwords, login credentials, or external account
          details.
          {"\n\n"}
          We aim to protect stored and processed data using reasonable security
          measures. You remain in control of the images you choose to upload and
          should avoid uploading images that contain private, identifiable, or
          unrelated personal information.
          {"\n\n"}
          BreastGuard is intended to support breast cancer screening research
          and educational decision-support use. It does not replace professional
          medical advice, clinical diagnosis, biopsy, laboratory testing, or
          consultation with qualified healthcare professionals.
          {"\n\n"}
          By using BreastGuard, you agree to this Privacy Policy. This policy
          may be updated from time to time to reflect improvements to the app,
          changes in services, or legal requirements.
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

export default PPBottomSheet;
