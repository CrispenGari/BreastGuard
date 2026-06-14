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
            Terms & Conditions
          </Text>

          <Text
            style={{
              fontFamily: FONTS.regular,
              fontSize: 18,
              lineHeight: 26,
            }}
          >
            iLifaCode is a bilingual Computer Science learning application
            designed to support access to computing concepts, digital literacy
            resources, and isiXhosa terminology development.
            {"\n\n"}
            By using iLifaCode, you agree to use the app responsibly,
            respectfully, and for educational purposes. The app is intended to
            support learning and should not be used to share harmful,
            misleading, offensive, or unlawful content.
            {"\n\n"}
            iLifaCode provides glossary terms, short lessons, flashcards,
            quizzes, and open educational resources to help learners understand
            computing concepts in English and isiXhosa. While we aim to provide
            accurate and useful content, some terminology, translations, and
            explanations may still require review by language experts,
            educators, or Computer Science specialists.
            {"\n\n"}
            Users who contribute terms, definitions, examples, translations, or
            learning resources are responsible for ensuring that their
            submissions are accurate, respectful, original, and suitable for
            educational use.
            {"\n\n"}
            Submitted content may be reviewed, edited, approved, rejected, or
            removed to maintain quality, technical accuracy, linguistic
            correctness, cultural relevance, and platform safety.
            {"\n\n"}
            You may not use iLifaCode to upload or distribute content that
            infringes copyright, violates privacy, promotes discrimination,
            contains harmful material, or disrupts the operation of the
            platform.
            {"\n\n"}
            Some learning materials may be made available offline to support
            access in low-connectivity environments. Offline access is provided
            for learning convenience and does not grant ownership of the app,
            platform, or protected content.
            {"\n\n"}
            Open educational resources shared through iLifaCode may be subject
            to specific licences, such as Creative Commons licences. Users are
            responsible for respecting the licence terms attached to each
            resource, including attribution and reuse conditions where
            applicable.
            {"\n\n"}
            iLifaCode does not guarantee that all content will be error-free,
            complete, or suitable for every learning context. Learners and
            educators should use the app as a support tool alongside formal
            teaching, institutional guidance, and expert-reviewed materials.
            {"\n\n"}
            We reserve the right to suspend, restrict, or terminate access to
            the app if these Terms & Conditions are violated or if use of the
            platform creates risk for other users, contributors, institutions,
            or the service.
            {"\n\n"}
            By continuing to use iLifaCode, you agree to these Terms &
            Conditions. These terms may be updated from time to time to reflect
            improvements to the app, changes in services, legal requirements, or
            platform policies.
          </Text>
        </ScrollView>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default TCBottomSheet;
