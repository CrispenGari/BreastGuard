import GettingStartedBottomSheet from "@/src/components/BottomSheets/GettingStartedBottomSheet";
import Button from "@/src/components/Button/Button";
import Footer from "@/src/components/Footer/Footer";
import { COLORS, FONTS, IMAGES, LANDING_MESSAGES } from "@/src/constants";
import { useSettingsStore } from "@/src/store/settingsStore";
import { onImpact } from "@/src/utils";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
const { width } = Dimensions.get("window");
const Page = () => {
  const [isLastSlide, setIsLastSlide] = React.useState(false);
  const router = useRouter();
  const swiperRef = React.useRef<Swiper>(null);
  const { settings, update } = useSettingsStore();
  const [user] = React.useState<any>(null);
  const authBottomSheetRef = React.useRef<BottomSheetModal>(null);

  React.useEffect(() => {
    if (!!user) {
      router.replace({
        pathname: "/(tabs)/home",
      });
    }
  }, [settings]);

  return (
    <ImageBackground
      style={{
        flex: 1,
      }}
      source={IMAGES.background}
      blurRadius={100}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            authBottomSheetRef.current?.present();
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.bold,
              color: COLORS.secondary,
              alignSelf: "flex-end",
              fontSize: 16,
              margin: 20,
            }}
          >
            Skip
          </Text>
        </TouchableOpacity>
        <View style={{ flex: 1, width }}>
          <GettingStartedBottomSheet ref={authBottomSheetRef} />
          <Swiper
            ref={swiperRef}
            renderPagination={(index, _total, _context) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 20,
                    gap: 4,
                    maxWidth: 150,
                    alignSelf: "center",
                  }}
                >
                  {LANDING_MESSAGES.map((_, i) => (
                    <TouchableOpacity
                      hitSlop={5}
                      key={i}
                      onPress={() => {
                        const offset = i - index;
                        swiperRef.current?.scrollBy(offset, true);
                      }}
                      style={{
                        width: 40,
                        height: 5,
                        backgroundColor:
                          i === index ? COLORS.tertiary : COLORS.gray,
                        borderRadius: 5,
                      }}
                    />
                  ))}
                </View>
              );
            }}
            loop={false}
            removeClippedSubviews={false}
            scrollEnabled={true}
            horizontal={true}
            showsPagination={true}
            onIndexChanged={(index) => {
              setIsLastSlide(index + 1 === LANDING_MESSAGES.length);
            }}
          >
            {LANDING_MESSAGES.map((message, i) => (
              <View
                key={i}
                style={{
                  width,
                  justifyContent: "center",
                  paddingHorizontal: 20,
                  flex: 1,
                }}
              >
                <Image
                  source={message.image}
                  style={{ width: "100%", height: 300, resizeMode: "contain" }}
                />
                <Text
                  style={{
                    fontFamily: FONTS.bold,
                    fontSize: 24,
                  }}
                >
                  {message.title}
                </Text>
                <Text
                  style={[
                    {
                      color: COLORS.black,
                      fontFamily: FONTS.regular,
                      fontSize: 18,
                    },
                  ]}
                >
                  {message.message}
                </Text>
              </View>
            ))}
          </Swiper>
        </View>

        <Button
          title={"Getting Started"}
          style={{ width: "100%", marginVertical: 20 }}
          onPress={() => {
            if (isLastSlide) {
              authBottomSheetRef.current?.present();
            } else {
              swiperRef.current?.scrollBy(1);
            }
          }}
        />
        <Footer />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Page;
