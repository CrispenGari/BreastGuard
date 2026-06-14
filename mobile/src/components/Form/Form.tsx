import { View, Text } from "react-native";
import React from "react";
import Button from "../Button/Button";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, FONTS } from "@/src/constants";
import Card from "../Card/Card";
import { useRouter } from "expo-router";

const Form = () => {
  const router = useRouter();
  return (
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
            fontSize: 25,
          }}
        >
          Check Breast Cancer Image
        </Text>
        <Text
          style={{
            fontFamily: FONTS.regular,
            color: COLORS.black,
          }}
        >
          Snap or upload a breast cancer image, and BreastGuard will classify it
          as benign or malignant using AI. Get fast predictions and confidence
          scores to support breast cancer screening research and
          decision-support use.
        </Text>
      </View>
      <Button
        title="Analyze Image"
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
          marginVertical: 25,
          borderColor: COLORS.tertiary,
          gap: 10,
          height: 60,
        }}
        titleStyle={{
          color: COLORS.white,
          marginLeft: 10,
        }}
        onPress={() => {
          router.navigate({
            pathname: "/(common)/predict",
          });
        }}
      />
    </Card>
  );
};

export default Form;
