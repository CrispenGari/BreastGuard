import HelpBottomSheet from "@/src/components/BottomSheets/HelpBottomSheet";

import Card from "@/src/components/Card/Card";
import PPBottomSheet from "@/src/components/BottomSheets/PPBottomSheet";
import TCBottomSheet from "@/src/components/BottomSheets/TnCBottomSheet";
import SettingItem from "@/src/components/SettingItem/SettingItem";
import { APP_NAME, COLORS, FONTS, IMAGES } from "@/src/constants";
import { useSettingsStore } from "@/src/store/settingsStore";

import { onFetchUpdateAsync, onImpact, rateApp } from "@/src/utils";

import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import * as Constants from "expo-constants";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  ImageBackground,
  Linking,
  ScrollView,
  Share,
  StyleSheet,
  Text,
} from "react-native";

const Page = () => {
  const { settings, update, restore } = useSettingsStore();
  const tnCBottomSheetRef = React.useRef<BottomSheetModal>(null);
  const ppBottomSheetRef = React.useRef<BottomSheetModal>(null);
  const helpBottomSheetRef = React.useRef<BottomSheetModal>(null);
  const router = useRouter();

  const clearAllData = () => {
    restore();
  };

  return (
    <ImageBackground
      style={{
        flex: 1,
      }}
      source={IMAGES.background}
      blurRadius={6}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <TCBottomSheet ref={tnCBottomSheetRef} />
        <PPBottomSheet ref={ppBottomSheetRef} />
        <HelpBottomSheet ref={helpBottomSheetRef} />

        <Text style={[styles.headerText, { marginTop: 20 }]}>Misc</Text>
        <Card
          style={{
            marginHorizontal: 10,
            paddingVertical: 10,
            paddingHorizontal: 0,
            maxWidth: "100%",
            backgroundColor: COLORS.primary,
          }}
        >
          <SettingItem
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              update({ ...settings, haptics: !settings.haptics });
            }}
            title={"Haptics"}
            Icon={
              <MaterialCommunityIcons
                name={settings.haptics ? "vibrate" : "vibrate-off"}
                size={24}
                color={COLORS.black}
              />
            }
            subTitle={settings.haptics ? "ON" : "OFF"}
          />

          <SettingItem
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              update({ ...settings, sound: !settings.sound });
            }}
            title={"In-App Sounds"}
            subTitle={settings.sound ? "ON" : "OFF"}
            Icon={
              <MaterialCommunityIcons
                name={settings.sound ? "speaker" : "speaker-off"}
                size={24}
                color={COLORS.black}
              />
            }
          />

          <SettingItem
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              await onFetchUpdateAsync();
            }}
            title={"Check for Updates"}
            Icon={
              <MaterialIcons name="update" size={24} color={COLORS.black} />
            }
          />
        </Card>

        <Text style={[styles.headerText, { marginTop: 20 }]}>
          Privacy, Security & Storage
        </Text>
        <Card
          style={{
            marginHorizontal: 10,
            paddingVertical: 10,
            paddingHorizontal: 0,
            maxWidth: "100%",
            backgroundColor: COLORS.primary,
          }}
        >
          <SettingItem
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              Alert.alert(
                APP_NAME,
                `Are you sure you want to reset ${APP_NAME}?`,
                [
                  {
                    text: "YES",
                    style: "default",
                    onPress: async () => {
                      if (settings.haptics) {
                        await onImpact();
                      }
                      clearAllData();
                      router.dismissAll();
                      router.replace("/");
                    },
                  },
                  {
                    text: "NO",
                    style: "cancel",
                    onPress: async () => {
                      if (settings.haptics) {
                        await onImpact();
                      }
                    },
                  },
                ],
                { cancelable: false },
              );
            }}
            labelStyle={{
              color: COLORS.red,
            }}
            title="Restore Settings"
            Icon={
              <MaterialIcons name="reset-tv" size={24} color={COLORS.red} />
            }
          />
        </Card>
        <Text style={styles.headerText}>Support & Feedback</Text>
        <Card
          style={{
            marginHorizontal: 10,
            paddingVertical: 10,
            paddingHorizontal: 0,
            maxWidth: "100%",
            backgroundColor: COLORS.primary,
          }}
        >
          <SettingItem
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              await Share.share(
                {
                  url: "https://github.com/CrispenGari/iLifaCode",
                  message:
                    "An app for learning Computer Science: Download at https://github.com/CrispenGari/iLifaCode",
                  title: "Share iLifaCode with a Friend",
                },
                { dialogTitle: "Share iLifaCode", tintColor: COLORS.tertiary },
              );
            }}
            title="Share with a Friend"
            Icon={
              <Ionicons name="heart-outline" size={24} color={COLORS.black} />
            }
          />

          <SettingItem
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              await rateApp();
            }}
            title={"Rate iLifaCode"}
            Icon={
              <Ionicons name="star-outline" size={24} color={COLORS.black} />
            }
          />
          <SettingItem
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              helpBottomSheetRef.current?.present();
            }}
            title={"How does iLifaCode work"}
            Icon={<Ionicons name="help" size={24} color={COLORS.black} />}
          />
          <SettingItem
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              const res = await Linking.canOpenURL(
                "https://github.com/CrispenGari/iLifaCode/issues",
              );
              if (res) {
                Linking.openURL(
                  "https://github.com/CrispenGari/iLifaCode/issues",
                );
              }
            }}
            title={"Report an Issue"}
            Icon={
              <Ionicons name="logo-github" size={24} color={COLORS.black} />
            }
          />
        </Card>
        <Text style={styles.headerText}>Legal</Text>
        <Card
          style={{
            marginHorizontal: 10,
            paddingVertical: 10,
            paddingHorizontal: 0,
            maxWidth: "100%",
            backgroundColor: COLORS.primary,
          }}
        >
          <SettingItem
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              tnCBottomSheetRef.current?.present();
            }}
            title={"Terms & Conditions"}
            Icon={
              <Ionicons
                name="document-text-outline"
                size={18}
                color={COLORS.black}
              />
            }
          />
          <SettingItem
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              ppBottomSheetRef.current?.present();
            }}
            title={"Privacy Policy"}
            Icon={
              <Ionicons
                name="document-text-outline"
                size={18}
                color={COLORS.black}
              />
            }
          />
        </Card>
        <Text
          style={{
            fontFamily: FONTS.regular,
            color: COLORS.black,
            padding: 10,
            textAlign: "center",
            marginTop: 30,
          }}
        >
          {Constants.default.expoConfig?.name}
          {" version: "}
          {Constants.default.expoConfig?.version}
        </Text>
      </ScrollView>
    </ImageBackground>
  );
};

export default Page;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    marginLeft: 10,
    marginTop: 20,
    color: COLORS.black,
    marginBottom: 5,
    textTransform: "uppercase",
  },
});
