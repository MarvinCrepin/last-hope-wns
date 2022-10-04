import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./src/screens/HomeScreen";
import SearchScreen from "./src/screens/SearchScreen";
import AccountScreen from "./src/screens/AccountScreen";
import tw from "./lib/tailwind";

import * as Font from "expo-font";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const fetchFonts = () =>
  Font.loadAsync({
    "baloo-da-2": require("./src/assets/fonts/BalooDa2-Medium.ttf"),
    "Cabin Sketch": require("./src/assets/fonts/CabinSketch-Regular.ttf"),
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
    return null;
  }

  return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              color = focused ? tw.color("tertiary") || color : tw.color("primary") || color;
              if (route.name === "Home") {
                iconName = "home";
              } else if (route.name === "Account") {
                iconName = "person-circle"
                size += 5;
              } else if (route.name === "Search") {
                iconName = "search-circle";
                size += 8;
              }
              return <Ionicons name={iconName} size={size} color={color} />;
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
