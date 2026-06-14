import { APP_NAME, COLORS, FONTS } from "@/src/constants";
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
import {
  Alert,
  Platform,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Footer from "../Footer/Footer";
import useLocalAuthState from "@/src/hooks/useLocalAuthState";
import * as LocalAuthentication from "expo-local-authentication";
import Button from "../Button/Button";

const GettingStartedBottomSheet = React.forwardRef<BottomSheetModal, {}>(
  ({}, ref) => {
    const snapPoints = React.useMemo(() => ["40%"], []);
    const { dismiss } = useBottomSheetModal();
    const { settings, update } = useSettingsStore();
    const [value, setValue] = React.useState(false);
    const { hasHadWare, isEnrolled } = useLocalAuthState();
    const router = useRouter();

    const lockApp = async () => {
      if (settings.haptics) {
        await onImpact();
      }

      if (!hasHadWare || !isEnrolled)
        return Alert.alert(
          APP_NAME,
          `Make sure that local authentication is enabled for ${APP_NAME}.`,
          [
            {
              text: "SKIP",
              style: "default",
              onPress: async () => {
                if (settings.haptics) {
                  await onImpact();
                }
                update({ ...settings, new: false });
                router.replace({ pathname: "/(tabs)/home" });
              },
            },
            {
              text: "OK",
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

      const { success } = await LocalAuthentication.authenticateAsync({
        disableDeviceFallback: true,
        biometricsSecurityLevel: "strong",
        cancelLabel: "CANCEL",
        promptMessage: `Test your Biometrics or PIN before locking ${APP_NAME}.`,
        requireConfirmation: true,
      });
      if (success) {
        update({ ...settings, lock: !settings.lock, new: false });
        router.replace({ pathname: "/(tabs)/home" });
      } else {
        setValue(false);
        return Alert.alert(
          APP_NAME,
          `Failed to lock ${APP_NAME}.`,
          [
            {
              text: "SKIP",
              style: "default",
              onPress: async () => {
                if (settings.haptics) {
                  await onImpact();
                }
                router.replace({ pathname: "/(tabs)/home" });
              },
            },
            {
              text: "TRY AGAIN",
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
      }
    };

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
              Getting Started
            </Text>

            <View style={{ marginVertical: 20, gap: 20 }}>
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                You can lock your "{APP_NAME}" with biometrics, passcode or PIN.
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS.bold,
                    fontSize: 16,
                    width: 80,
                    textAlign: "center",
                  }}
                >
                  {value ? "Lock" : "Unlock"}
                </Text>

                <Switch
                  style={{
                    width: 60,
                    height: 40,
                    padding: 5,
                    transform: Platform.select({
                      android: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
                      ios: [{ scaleX: 1 }, { scaleY: 1 }],
                    }),
                  }}
                  thumbColor={COLORS.primary}
                  value={value}
                  trackColor={{
                    false: COLORS.main,
                    true: COLORS.secondary,
                  }}
                  onValueChange={async (value) => {
                    setValue(value);
                    if (value) {
                      await lockApp();
                    }
                  }}
                />
              </View>

              <View style={{ marginVertical: 20, gap: 20 }}>
                <Button
                  title={"Not Now"}
                  style={{ width: "100%", borderWidth: 2 }}
                  onPress={() => {
                    update({
                      ...settings,
                      new: false,
                    });
                    router.replace({
                      pathname: "/(tabs)/home",
                    });
                  }}
                />
              </View>
            </View>
          </View>
          <Footer />
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default GettingStartedBottomSheet;
