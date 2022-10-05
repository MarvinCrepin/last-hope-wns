import React, { useCallback } from "react";
import { View, Text } from "react-native";
import * as SplashScreen from "expo-splash-screen";

import tw from "../../lib/tailwind";
import styles from "../assets/styles/styles";

export default function HomeScreen({ route }: { route: any; navigation: any }) {
  const { appIsReady } = route.params;

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);
  return (
    <View style={tw.style('p-5')} onLayout={onLayoutRootView}>
      <Text style={styles.mainTitle}>
        Hi <Text style={tw.style("font-title", "text-tertiary")}>Jean Mi</Text>
      </Text>
      <View>
        <Text style={styles.mainTitle}>
          No release on friday !
        </Text>
      </View>
    </View>
  );
}
