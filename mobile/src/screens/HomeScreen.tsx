import React, { useCallback } from "react";
import { View, Text } from "react-native";
import * as SplashScreen from "expo-splash-screen";

import tw from "../../lib/tailwind";

export default function HomeScreen({ route }: { route: any; navigation: any }) {
  const { appIsReady } = route.params;

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);
  return (
    <View style={tw.style("bg-primary")} onLayout={onLayoutRootView}>
      <Text style={tw.style("font-textMedium", "text-secondary")}>Home</Text>
    </View>
  );
}
