import { View, Text } from "react-native";
import React from "react";
import Card from "../Card/Card";
import { APP_NAME, COLORS, FONTS } from "@/src/constants";
import { Ionicons } from "@expo/vector-icons";

const Tip = () => {
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
        marginVertical: 10,
      }}
    >
      <View
        style={{
          alignSelf: "center",
          position: "absolute",
          backgroundColor: COLORS.tertiary,
          borderRadius: 999,
          shadowOffset: { width: 2, height: 2 },
          elevation: 1,
          shadowColor: COLORS.tertiary,
          shadowOpacity: 0.35,
          shadowRadius: 2,
          width: 220,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 5,
          top: -10,
          gap: 10,
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.bold,
            color: COLORS.white,
          }}
        >
          <Ionicons
            name="warning-outline"
            color={COLORS.red}
            size={16}
            style={{}}
          />{" "}
          {APP_NAME}
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontFamily: FONTS.italic,
            color: COLORS.red,
            fontSize: 16,
            marginTop: 20,
          }}
        >
          BreastGuard is an AI decision-support tool and does not provide a
          medical diagnosis. Please consult a qualified healthcare professional
          for proper clinical advice, testing, and treatment.
        </Text>
      </View>
    </Card>
  );
};

export default Tip;
