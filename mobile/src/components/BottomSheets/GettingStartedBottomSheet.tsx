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
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Button from "../Button/Button";
import Footer from "../Footer/Footer";
const GettingStartedBottomSheet = React.forwardRef<BottomSheetModal, {}>(
  ({}, ref) => {
    const snapPoints = React.useMemo(() => ["40%"], []);
    const { dismiss } = useBottomSheetModal();
    const { settings } = useSettingsStore();
    const router = useRouter();
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
            marginBottom: 30,
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
          <View
            style={{
              padding: 20,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: FONTS.bold,
                marginBottom: 20,
              }}
            >
              {settings.language === "en" ? "Getting Started" : "Ukuqalisa"}
            </Text>

            <View style={{ marginVertical: 20, gap: 20 }}>
              <Button
                title={settings.language === "en" ? "Login" : "Ngena"}
                style={{ width: "100%", borderWidth: 2 }}
                onPress={() =>
                  router.replace({
                    pathname: "/(tabs)/home",
                  })
                }
              />
              <Button
                title={settings.language === "en" ? "Register" : "Bhalisa"}
                style={{ width: "100%", borderWidth: 2 }}
                onPress={() =>
                  router.replace({
                    pathname: "/(tabs)/home",
                  })
                }
                variant="outline"
                titleStyle={{ fontWeight: "600", color: COLORS.black }}
              />
            </View>
          </View>
          <Footer />
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default GettingStartedBottomSheet;
