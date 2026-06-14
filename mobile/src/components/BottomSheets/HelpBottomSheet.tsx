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
import { Text, TouchableOpacity, View } from "react-native";

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

        <View style={{ padding: 20 }}>
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
            iLifaCode is a bilingual Computer Science learning app created to
            help learners understand common computing concepts in both English
            and isiXhosa.
            {"\n\n"}The app allows you to explore key digital terms, read simple
            explanations, and learn how words such as computer, internet,
            software, password, database, and network are used in everyday
            computing.
            {"\n\n"}You can study short lessons, practise with flashcards, and
            test your understanding through quizzes designed to support beginner
            learners and digital literacy development.
            {"\n\n"}iLifaCode also supports isiXhosa terminology development by
            making computing knowledge more accessible, culturally relevant, and
            easier to understand for learners, educators, translators, and
            communities.
            {"\n\n"}Some learning content can be made available offline to
            support access in low-connectivity environments. iLifaCode helps you
            learn Computer Science at your own pace, wherever you are.
          </Text>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default HelpBottomSheet;
