import { ImageBackground, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTS, IMAGES } from "@/src/constants";
import Card from "@/src/components/Card/Card";
import HistoryItem from "@/src/components/HistoryItem/HistoryItem";
import { FlatList } from "react-native-gesture-handler";
import { useDiagnoseHistoryStore } from "@/src/store/diagnoseHistoryStore";

const Page = () => {
  const { history } = useDiagnoseHistoryStore();
  return (
    <ImageBackground
      style={{
        flex: 1,
      }}
      source={IMAGES.background}
      blurRadius={80}
    >
      {history.length === 0 ? (
        <View
          style={{
            flex: 1,
            padding: 10,
          }}
        >
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
              height: 200,
              justifyContent: "center",
              alignItems: "center",
              margin: 10,
              marginHorizontal: 20,
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: 18,
                color: COLORS.black,
                textAlign: "center",
              }}
            >
              You don't have any prediction history on this device. Make sure
              that history is turned "ONN" in your settings.
            </Text>
          </Card>
        </View>
      ) : (
        <FlatList
          keyExtractor={({ id }) => id}
          bounces
          data={history}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 300,
            padding: 10,
            gap: 5,
          }}
          renderItem={({ item }) => <HistoryItem item={item} />}
          style={{
            flex: 1,
          }}
        />
      )}
    </ImageBackground>
  );
};

export default Page;
