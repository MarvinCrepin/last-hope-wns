import React, { useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import tw from "../../lib/tailwind";
import styles from "../assets/styles/styles";
import TasksList from "../components/task/TasksList";

export default function HomeScreen({ route }: { route: any; navigation: any }) {
  const { appIsReady } = route.params;

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);
  return (
    <View style={tw.style("p-5")} onLayout={onLayoutRootView}>
      <View key="title">
        <Text style={styles.mainTitle}>
          Hi{" "}
          <Text style={tw.style("font-title", "text-tertiary")}>Jean Mi</Text>
        </Text>
        <View>
          <Text style={styles.mainTitle}>No release on friday !</Text>
        </View>
      </View>
      <View key="tasksAndProjects" style={tw.style("items-center", 'py-3', 'my-3')}>
        <View key="header" style={styles.homeHeader}>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.subTitle}>TASKS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.subTitle}>PROJECTS</Text>
          </TouchableOpacity>
        </View>
        <TasksList />
      </View>
    </View>
  );
}
