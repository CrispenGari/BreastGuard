import { COLORS, FONTS } from "@/src/constants";
import { useSettingsStore } from "@/src/store/settingsStore";
import { onImpact } from "@/src/utils";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

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
      <BottomSheetView
        style={{
          flex: 1,
          padding: 10,
          paddingBottom: 100,
        }}
      >
        <View
          style={{
            alignSelf: "flex-end",
            paddingHorizontal: 20,
            paddingTop: 10,
          }}
        >
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

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 20,
            paddingBottom: 60,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: FONTS.bold,
              marginBottom: 10,
            }}
          >
            {settings.language === "en"
              ? "Privacy Policy"
              : "Umgaqo-nkqubo woBucala"}
          </Text>

          <Text
            style={{
              fontFamily: FONTS.regular,
              fontSize: 18,
              lineHeight: 26,
            }}
          >
            Your privacy matters to us. iLifaCode is designed to support
            inclusive Computer Science learning in English and isiXhosa while
            respecting and protecting your personal information.
            {"\n\n"}
            iLifaCode may collect limited information needed for core app
            functionality, such as your selected language, saved terms, lesson
            progress, quiz activity, and basic usage information used to improve
            the learning experience.
            {"\n\n"}
            The app may allow learners, educators, translators, and reviewers to
            contribute or suggest computing terms, definitions, examples, and
            learning resources. Any submitted content may be reviewed before it
            is published to help maintain accuracy, quality, and cultural
            relevance.
            {"\n\n"}
            iLifaCode does not sell, rent, or trade your personal information.
            Information is only used to support app functionality, improve
            learning resources, manage contributions, protect the platform, and
            provide a better user experience.
            {"\n\n"}
            Some learning content may be stored offline on your device so that
            you can access glossary terms, lessons, flashcards, or quizzes in
            low-connectivity environments.
            {"\n\n"}
            If authentication is enabled, sign-in may be handled securely
            through trusted providers or institutional accounts. iLifaCode does
            not store your external account password or login credentials.
            {"\n\n"}
            We aim to protect stored data using reasonable security measures.
            You remain in control of your information and may request access to,
            correction of, or deletion of your personal data where applicable.
            {"\n\n"}
            By using iLifaCode, you agree to this Privacy Policy. This policy
            may be updated from time to time to reflect improvements to the app,
            changes in services, or legal requirements.
          </Text>
        </ScrollView>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default PPBottomSheet;
