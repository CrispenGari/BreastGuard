import { COLORS, FONTS } from "@/src/constants";
import React from "react";
import {
  Platform,
  StyleProp,
  Switch,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";

import { useSettingsStore } from "@/src/store/settingsStore";

interface SettingItemProps {
  Icon: React.ReactNode;
  title: string;
  onPress: (value?: boolean) => void;
  labelStyle?: StyleProp<TextStyle>;
  subTitle?: string;
  hasSwitch?: boolean;
  value?: boolean;
  subTitleStyle?: StyleProp<TextStyle>;
}
const SettingItem = ({
  labelStyle,
  Icon,
  title,
  onPress,
  subTitle,
  hasSwitch,
  subTitleStyle,
  value,
}: SettingItemProps) => {
  return (
    <TouchableOpacity
      disabled={hasSwitch}
      onPress={() => {
        onPress();
      }}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        gap: 10,
        paddingHorizontal: 20,
        marginBottom: 2,
      }}
    >
      {Icon}
      <View style={{ flex: 1 }}>
        <Text
          style={[
            {
              color: COLORS.black,
              fontFamily: FONTS.bold,
              fontSize: 16,
            },
            labelStyle,
          ]}
        >
          {title}
        </Text>

        <Text
          style={[
            {
              fontFamily: FONTS.regular,
              fontSize: 10,
              color: COLORS.black,
            },
            subTitleStyle,
          ]}
        >
          {subTitle}
        </Text>
      </View>
      {hasSwitch ? (
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
            onPress(value);
          }}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default SettingItem;
