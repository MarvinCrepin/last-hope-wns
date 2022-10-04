import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./src/screens/HomeScreen";
import SearchScreen from "./src/screens/SearchScreen";
import AccountScreen from "./src/screens/AccountScreen";
import iconForRoute from "./src/components/IconForRoute";
import tw from "./lib/tailwind";

import * as Font from "expo-font";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text } from "react-native";

const Tab = createBottomTabNavigator();

const fetchFonts = () =>
  Font.loadAsync({
    "Baloo Da 2 Medium": require("./src/assets/fonts/BalooDa2-Medium.ttf"),
    "Baloo Da 2 Regular": require("./src/assets/fonts/BalooDa2-Regular.ttf"),
    "Baloo Da 2 SemiBold": require("./src/assets/fonts/BalooDa2-SemiBold.ttf"),
    "Cabin Sketch": require("./src/assets/fonts/CabinSketch-Regular.ttf"),
    "Cabin Sketch Bold": require("./src/assets/fonts/CabinSketch-Bold.ttf"),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    async function getFonts() {
      await fetchFonts();
      setFontsLoaded(true);
    }
    getFonts();
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            color = focused
              ? tw.color("tertiary") || color
              : tw.color("primary") || color;
            let icon = iconForRoute(route, size);
            return <Ionicons name={icon.name} size={icon.size} color={color} />;
          },
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
