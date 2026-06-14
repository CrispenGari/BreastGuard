import { APP_NAME, COLORS, FONTS } from "@/src/constants";
import { useSettingsStore } from "@/src/store/settingsStore";
import { onImpact } from "@/src/utils";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Footer = () => {
  const { settings } = useSettingsStore();
  const tnCBottomSheetRef = React.useRef<BottomSheetModal>(null);
  const ppBottomSheetRef = React.useRef<BottomSheetModal>(null);
  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}
    >
      {settings.language === "en" ? (
        <Text
          style={{
            marginBottom: 20,
            fontSize: 16,
            textAlign: "center",
            fontFamily: FONTS.bold,
            color: COLORS.black,
          }}
        >
          By using {APP_NAME} you are automatically accepting{" "}
          <Text
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              tnCBottomSheetRef.current?.present();
            }}
            style={styles.clickable_text}
          >
            Terms and Conditions
          </Text>{" "}
          and{" "}
          <Text
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              ppBottomSheetRef.current?.present();
            }}
            style={styles.clickable_text}
          >
            Privacy Policy
          </Text>{" "}
          of this app.
        </Text>
      ) : (
        <Text
          style={{
            marginBottom: 20,
            fontSize: 16,
            textAlign: "center",
            fontFamily: FONTS.bold,
            color: COLORS.black,
          }}
        >
          Ngokusebenzisa {APP_NAME}, uyavuma ngokuzenzekelayo{" "}
          <Text
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              tnCBottomSheetRef.current?.present();
            }}
            style={styles.clickable_text}
          >
            Imigaqo neMiqathango
          </Text>{" "}
          kunye{" "}
          <Text
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              ppBottomSheetRef.current?.present();
            }}
            style={styles.clickable_text}
          >
            Umgaqo-nkqubo woBucala
          </Text>{" "}
          yale app.
        </Text>
      )}
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  clickable_text: {
    color: COLORS.secondary,
    fontFamily: FONTS.bold,
    textDecorationLine: "underline",
  },
});
