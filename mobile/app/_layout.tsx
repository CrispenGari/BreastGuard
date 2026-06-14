import "react-native-reanimated";
///

import { Fonts } from "@/src/constants";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { loadAsync } from "expo-font";
import * as Notifications from "expo-notifications";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReactQueryProvider from "@/src/providers/ReactQueryProvider/ReactQueryProvider";
LogBox.ignoreLogs;
LogBox.ignoreAllLogs();
SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Layout = () => {
  const [appIsReady, setAppIsReady] = React.useState(false);

  React.useEffect(() => {
    async function prepare() {
      try {
        await loadAsync(Fonts);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(() => {
    if (appIsReady) {
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar style="light" />

      <ReactQueryProvider>
        <GestureHandlerRootView
          style={{
            flex: 1,
          }}
        >
          <BottomSheetModalProvider>
            <RootLayout />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </ReactQueryProvider>
    </View>
  );
};

export default Layout;

const RootLayout = () => {
  React.useEffect(() => {
    const notificationListener = Notifications.addNotificationReceivedListener(
      (_notification) => {},
    );
    const responseListener =
      Notifications.addNotificationResponseReceivedListener((_response) => {});
    return () => {
      responseListener.remove();
      notificationListener.remove();
    };
  }, []);
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(common)" options={{ headerShown: false }} />
    </Stack>
  );
};
