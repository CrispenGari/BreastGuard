import { AUDIOS, COLORS, FONTS, IMAGES } from "@/src/constants";
import { useSettingsStore } from "@/src/store/settingsStore";
import { generateRNFile, onImpact } from "@/src/utils";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  Animated,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@tanstack/react-query";
import { useMediaPermissions } from "@/src/hooks/useMediaPermissions";
import { predictCancerMutation } from "@/src/utils/react-query";
import Card from "@/src/components/Card/Card";
import Button from "@/src/components/Button/Button";
import { router } from "expo-router";
import { useDiagnoseHistoryStore } from "@/src/store/diagnoseHistoryStore";
import { THistory } from "@/src/types";
import ContentLoader from "@/src/components/ContentLoader/ContentLoader";
import { useAudioPlayer } from "expo-audio";

const Page = () => {
  const { settings } = useSettingsStore();
  const { camera, gallery, requestCameraPermission } = useMediaPermissions();
  const { add } = useDiagnoseHistoryStore();
  const player = useAudioPlayer(AUDIOS.diagnosing);
  const player2 = useAudioPlayer(AUDIOS.results);
  const { isPending: predicting, mutateAsync } = useMutation({
    mutationKey: ["image-prediction"],
    mutationFn: predictCancerMutation,
  });

  const [state, setState] = React.useState<{
    uri?: string;
    fileName?: string | null;
    error?: string;
  }>({
    error: "",
    uri: "",
    fileName: "",
  });

  const predictCancer = async () => {
    setState((s) => ({ ...s, error: "" }));
    if (!!!state.uri) {
      setState((s) => ({
        ...s,
        error: "Please select a Image.",
      }));
      return;
    }
    if (settings.sound) {
      player.play();
    }
    const image = generateRNFile({
      name: state.fileName || "image.jpg",
      uri: state.uri,
    });
    await mutateAsync({
      image: image,
    })
      .then((res) => {
        if (settings.sound) {
          player2.play();
        }
        if (res.ok === false) {
          return setState({
            ...state,
            error: "Something went wrong on the server try again.",
          });
        }
        setState((s) => ({
          ...s,
          error: "",
          fileName: "",
          uri: "",
        }));
        const hist = {
          date: new Date(),
          uri: state.uri!,
          id: res.id,
          prediction: res,
        } satisfies THistory;
        if (settings.keepHistory) {
          add(hist);
        }
        router.navigate({
          pathname: "/(common)/results",
          params: {
            result: JSON.stringify(hist),
          },
        });
      })
      .catch((error) => {
        return setState({
          ...state,
          error: "Something went wrong on the server try again.",
        });
      })
      .finally(() => {
        if (settings.sound) {
          player.pause();
          player.remove();
          player2.pause();
          player2.remove();
        }
      });
  };

  const select = async () => {
    if (settings.haptics) {
      await onImpact();
    }
    if (gallery) {
      const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
        quality: 1,
        mediaTypes: ["images"],
        allowsMultipleSelection: false,
        allowsEditing: true,
        presentationStyle:
          ImagePicker.UIImagePickerPresentationStyle.FULL_SCREEN,
      });

      if (!canceled) {
        setState((state) => ({
          ...state,
          uri: assets[0].uri,
          fileName: assets[0].fileName,
        }));
      }
    }
  };
  const take = async () => {
    if (settings.haptics) {
      await onImpact();
    }
    if (camera) {
      const { assets, canceled } = await ImagePicker.launchCameraAsync({
        quality: 1,
        mediaTypes: ["images"],
        allowsMultipleSelection: false,
        allowsEditing: true,
        presentationStyle:
          ImagePicker.UIImagePickerPresentationStyle.FULL_SCREEN,
      });

      if (!canceled) {
        setState((state) => ({
          ...state,
          uri: assets[0].uri,
          fileName: assets[0].fileName,
        }));
      }
    } else {
      await requestCameraPermission();
    }
  };
  const remove = async () => {
    if (settings.haptics) {
      await onImpact();
    }
    setState((state) => ({
      ...state,
      uri: undefined,
    }));
  };

  return (
    <ImageBackground
      style={{
        flex: 1,
      }}
      source={IMAGES.background}
      blurRadius={80}
    >
      <ScrollView
        contentContainerStyle={{
          backgroundColor: COLORS.transparent,
          paddingBottom: 100,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            padding: 20,
            gap: 10,
          }}
        >
          <Card
            style={{
              backgroundColor: COLORS.primary,
              width: "100%",
              maxWidth: 500,
              alignSelf: "center",
              shadowOffset: { width: 2, height: 2 },
              elevation: 1,
              shadowColor: COLORS.tertiary,
              shadowOpacity: 0.35,
              shadowRadius: 2,
              padding: 20,
            }}
          >
            <View style={{ flexDirection: "row", flex: 1 }}>
              <View
                style={{
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS.bold,
                    fontSize: 20,
                    color: COLORS.white,
                  }}
                >
                  Breast Image Selection
                </Text>
                <Text
                  style={{
                    fontFamily: FONTS.regular,
                    color: COLORS.white,
                  }}
                >
                  Select a breast image or take a live photo using the camera.
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.row,
                {
                  width: "100%",
                  paddingVertical: 20,
                  justifyContent: "center",
                  gap: 100,
                },
              ]}
            >
              <TouchableOpacity
                style={styles.iconBtn}
                activeOpacity={0.7}
                onPress={select}
              >
                <AntDesign name="picture" size={24} color={COLORS.white} />
              </TouchableOpacity>

              <TouchableOpacity
                disabled={predicting}
                style={styles.iconBtn}
                activeOpacity={0.7}
                onPress={take}
              >
                <Ionicons name="camera" size={24} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </Card>

          {!!!state?.uri ? null : (
            <Card
              style={{
                backgroundColor: COLORS.primary,
                width: "100%",
                maxWidth: 500,
                alignSelf: "center",
                shadowOffset: { width: 2, height: 2 },
                elevation: 1,
                shadowColor: COLORS.primary,
                shadowOpacity: 0.35,
                shadowRadius: 2,
                padding: 20,
              }}
            >
              {state.uri ? (
                <Animated.Image
                  style={{
                    width: 300,
                    height: 350,
                    backgroundColor: COLORS.gray,
                    borderRadius: 10,
                    marginTop: 20,
                    alignSelf: "center",
                  }}
                  source={{ uri: state.uri }}
                />
              ) : (
                <ContentLoader
                  style={{
                    width: 250,
                    height: 300,
                    backgroundColor: COLORS.main,
                    borderRadius: 10,
                    marginTop: 20,
                    opacity: 0.4,
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <MaterialIcons
                    name="image-not-supported"
                    size={30}
                    color={COLORS.tertiary}
                  />
                </ContentLoader>
              )}

              <Button
                title="Remove"
                style={{
                  width: "100%",
                  marginTop: 20,
                  backgroundColor: COLORS.tertiary,
                  height: 60,
                  borderColor: COLORS.tertiary,
                }}
                disabled={predicting}
                onPress={remove}
              />
            </Card>
          )}
          <Card
            style={{
              backgroundColor: COLORS.primary,
              width: "100%",
              maxWidth: 500,
              alignSelf: "center",
              shadowOffset: { width: 2, height: 2 },
              elevation: 1,
              shadowColor: COLORS.tertiary,
              shadowOpacity: 0.35,
              shadowRadius: 2,
              padding: 20,
            }}
          >
            <View style={{ flexDirection: "row", flex: 1 }}>
              <View
                style={{
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS.bold,
                    fontSize: 20,
                    color: COLORS.white,
                  }}
                >
                  Is this breast image benign or malignant?
                </Text>
                <Text
                  style={{
                    fontFamily: FONTS.regular,
                    color: COLORS.white,
                  }}
                >
                  Let BreastGuard analyze it for you.
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontFamily: FONTS.regular,
                color: COLORS.red,
                fontSize: 16,
              }}
            >
              {state.error}
            </Text>
            <Button
              onPress={predictCancer}
              loading={predicting}
              disabled={predicting}
              Icon={
                <MaterialIcons
                  name="online-prediction"
                  size={26}
                  color={COLORS.white}
                />
              }
              title="Classify Breast Image"
              titleStyle={{ marginLeft: 5 }}
              style={{
                width: "100%",
                backgroundColor: COLORS.tertiary,
                marginVertical: 20,
                height: 60,
                borderColor: COLORS.tertiary,
              }}
            />
          </Card>
        </View>

        <Text
          style={{
            color: COLORS.white,
            fontFamily: FONTS.regular,
            marginTop: 50,
            textAlign: "center",
          }}
        >
          {Constants.default.expoConfig?.name} • Version:{" "}
          {Constants.default.expoConfig?.version}
        </Text>
      </ScrollView>
    </ImageBackground>
  );
};

export default Page;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
  },
  iconBtn: {
    padding: 10,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    alignSelf: "center",
    backgroundColor: COLORS.tertiary,
  },
});
