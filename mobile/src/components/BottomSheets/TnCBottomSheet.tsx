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

const TCBottomSheet = React.forwardRef<BottomSheetModal, {}>(({}, ref) => {
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
              Terms & Conditions
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
          Terms & Conditions
        </Text>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: 18,
            lineHeight: 26,
          }}
        >
          BreastGuard is a mobile-based AI decision-support application designed
          to support breast cancer image classification using AI-powered image
          analysis.
          {"\n\n"}
          By using BreastGuard, you agree to use the app responsibly and only
          for educational, research, screening-support, or decision-support
          purposes. The app should not be used to upload harmful, misleading,
          offensive, unlawful, or unrelated content.
          {"\n\n"}
          BreastGuard allows users to capture or upload breast cancer images for
          classification. The system analyzes the uploaded image and predicts
          whether the image is likely benign or malignant.
          {"\n\n"}
          The predictions and confidence scores provided by BreastGuard are
          intended to support decision-making and learning. They should not be
          treated as final medical diagnosis or professional clinical advice.
          {"\n\n"}
          Users remain responsible for how they interpret and use the results
          provided by the app. If there are any medical concerns, symptoms,
          abnormal findings, or uncertainty, users should consult qualified
          healthcare professionals for proper clinical assessment, diagnosis,
          and treatment.
          {"\n\n"}
          BreastGuard does not guarantee that all predictions will be correct,
          complete, or suitable for every clinical situation. Model performance
          may be affected by image quality, lighting, resolution, image
          artifacts, dataset limitations, and visual similarity between benign
          and malignant cases.
          {"\n\n"}
          You may not use BreastGuard to upload images that infringe copyright,
          violate privacy, contain harmful material, expose personal or
          identifiable information, or disrupt the operation of the platform or
          backend service.
          {"\n\n"}
          BreastGuard does not require user authentication. However, users are
          expected to use the app in a lawful and respectful manner and avoid
          uploading private, personal, identifiable, or unrelated images.
          {"\n\n"}
          We reserve the right to restrict, suspend, or modify access to the app
          or its services if misuse, abuse, technical risk, or violation of
          these Terms & Conditions is identified.
          {"\n\n"}
          By continuing to use BreastGuard, you agree to these Terms &
          Conditions. These terms may be updated from time to time to reflect
          improvements to the app, changes in services, legal requirements, or
          platform policies.
        </Text>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

export default TCBottomSheet;
