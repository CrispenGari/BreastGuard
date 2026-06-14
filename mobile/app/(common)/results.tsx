import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { THistory } from "@/src/types";
import {
  IMAGES,
  COLORS,
  relativeTimeObject,
  FONTS,
  PLOT_COLORS,
  APP_NAME,
} from "@/src/constants";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";
import Animated, { SlideInLeft, SlideInRight } from "react-native-reanimated";
import Card from "@/src/components/Card/Card";
import { BarChart, CurveType } from "react-native-gifted-charts";
import LegendItem from "@/src/components/LegendItem/LegendItem";
import Button from "@/src/components/Button/Button";
import { MaterialIcons } from "@expo/vector-icons";

import { onImpact } from "@/src/utils";
import { useSettingsStore } from "@/src/store/settingsStore";
dayjs.extend(relativeTime);
dayjs.extend(updateLocal);
dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});

const Page = () => {
  const { result } = useLocalSearchParams<{ result: string }>();
  const data = React.useMemo<THistory>(() => JSON.parse(result), [result]);
  const { settings } = useSettingsStore();
  const router = useRouter();

  const plotsData = React.useMemo(() => {
    const { prediction } = data.prediction;
    return ["benign", "malignant"].map((item, index) => {
      const isMatch = item === prediction.class_label;
      const probability = isMatch
        ? prediction.probability * 100
        : (1 - prediction.probability) * 100;
      return {
        value: probability,
        color: PLOT_COLORS[index],
        frontColor: PLOT_COLORS[index],
        prediction: `${item} (${
          isMatch ? prediction.label : prediction.label === 1 ? 0 : 1
        }) • ${probability.toFixed(0)}%`,
        label: "",
      };
    });
  }, [data]);

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
          paddingHorizontal: 10,
          gap: 5,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={SlideInRight.duration(200).delay(200)}>
          <Card style={[styles.card, { marginTop: 30 }]}>
            <View
              style={{
                backgroundColor: COLORS.secondary,
                position: "absolute",
                top: 0,
                right: 0,
                width: 80,
                padding: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  color: COLORS.white,
                }}
              >
                {dayjs(new Date(data.date)).fromNow()} ago
              </Text>
            </View>
            <View style={[styles.badge, {}]}>
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  color: COLORS.white,
                }}
              >
                Image
              </Text>
            </View>

            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 20,
              }}
            >
              Leaf Image
            </Text>
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: 14,
                color: COLORS.black,
              }}
            >
              The image that was used for the predictions response.
            </Text>

            <TouchableOpacity
              onPress={async () => {
                if (settings.haptics) {
                  await onImpact();
                }

                router.navigate({
                  pathname: "/(common)/image-viewer",
                  params: {
                    uri: data.uri,
                    title: `${APP_NAME}: ${data.prediction.prediction.class_label}`,
                  },
                });
              }}
            >
              <Animated.Image
                source={{
                  uri: data.uri,
                }}
                style={{
                  width: 200,
                  height: 200,
                  alignSelf: "center",
                  marginVertical: 20,
                }}
              />
            </TouchableOpacity>

            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: 16,
                textAlign: "center",
                color: COLORS.red,
              }}
            >
              {data.prediction.model} • {data.prediction.time.toFixed(2)}s
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInLeft.duration(200).delay(200)}>
          <Card style={[styles.card]}>
            <View
              style={{
                backgroundColor: COLORS.secondary,
                position: "absolute",
                top: 0,
                right: 0,
                width: 80,
                padding: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  color: COLORS.white,
                }}
              >
                {dayjs(new Date(data.date)).fromNow()} ago
              </Text>
            </View>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 20,
              }}
            >
              Breast Image Prediction
            </Text>
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: 14,
                color: COLORS.black,
              }}
            >
              Based on the provided image, {APP_NAME} classifies this breast
              image as "{data.prediction.prediction.class_label}".
            </Text>

            <View
              style={{
                paddingBottom: 30,
                marginTop: 20,
              }}
            >
              <BarChart
                barWidth={50}
                noOfSections={3}
                barBorderRadius={4}
                minHeight={5}
                frontColor={COLORS.gray}
                data={plotsData}
                yAxisThickness={0}
                xAxisThickness={0}
                width={300}
                isAnimated
                animationDuration={300}
                gradientColor={COLORS.red}
                xAxisLabelTextStyle={{
                  fontFamily: FONTS.bold,
                  color: COLORS.black,
                }}
                yAxisTextStyle={{
                  fontFamily: FONTS.bold,
                  color: COLORS.black,
                }}
                yAxisLabelSuffix="%"
                showLine
                rotateLabel
                roundToDigits={1}
                lineConfig={{
                  curved: true,
                  color: COLORS.secondary,
                  curveType: CurveType.QUADRATIC,
                  isAnimated: true,
                  dataPointsColor: COLORS.red,
                  animationDuration: 300,
                  thickness: 2,
                }}
              />
            </View>
            <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
              {plotsData.map((data, index) => (
                <LegendItem
                  label={data.prediction}
                  key={index}
                  color={data.color}
                />
              ))}
            </View>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(200).delay(200)}>
          <Card style={[styles.card]}>
            <View
              style={{
                backgroundColor: COLORS.secondary,
                position: "absolute",
                top: 0,
                right: 0,
                width: 80,
                padding: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  color: COLORS.white,
                }}
              >
                {dayjs(new Date(data.date)).fromNow()} ago
              </Text>
            </View>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 20,
              }}
            >
              Prediction Summary
            </Text>

            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: 14,
                color: COLORS.black,
                marginBottom: 30,
              }}
            >
              {`Based on the provided image, ${APP_NAME} classifies this breast image as "${data.prediction.prediction.class_label}" with ${(data.prediction.prediction.probability * 100).toFixed(0)}% confidence.`}
            </Text>
          </Card>
        </Animated.View>

        <Card
          style={{
            backgroundColor: COLORS.white,
            width: "100%",
            maxWidth: 500,
            alignSelf: "center",
            shadowOffset: { width: 2, height: 2 },
            elevation: 1,
            shadowColor: COLORS.tertiary,
            shadowOpacity: 0.35,
            shadowRadius: 2,
            padding: 20,
            gap: 20,
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 20,
              }}
            >
              Want to try another breast image?
            </Text>
            <Text
              style={{
                fontFamily: FONTS.regular,
                color: COLORS.black,
                fontSize: 14,
              }}
            >
              Try another clear breast image to get a new classification result.
            </Text>
          </View>
          <Button
            title="Analyze Another Image"
            Icon={
              <MaterialIcons
                name="online-prediction"
                size={26}
                color={COLORS.white}
              />
            }
            style={{
              width: "100%",
              backgroundColor: COLORS.tertiary,
              marginVertical: 10,
              borderColor: COLORS.tertiary,
              height: 60,
            }}
            titleStyle={{ marginLeft: 5 }}
            onPress={() => {
              if (router.canGoBack()) router.back();
              router.navigate({
                pathname: "/(common)/predict",
              });
            }}
          />
        </Card>
      </ScrollView>
    </ImageBackground>
  );
};

export default Page;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.main,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    shadowOffset: { width: 2, height: 2 },
    elevation: 1,
    shadowColor: COLORS.tertiary,
    shadowOpacity: 0.35,
    shadowRadius: 2,
    padding: 20,
    overflow: "hidden",
  },
  badge: {
    alignSelf: "center",
    position: "absolute",
    backgroundColor: COLORS.tertiary,
    borderRadius: 999,
    shadowOffset: { width: 2, height: 2 },
    elevation: 1,
    shadowColor: COLORS.tertiary,
    shadowOpacity: 0.35,
    shadowRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    top: -10,
    paddingHorizontal: 30,
  },
});
