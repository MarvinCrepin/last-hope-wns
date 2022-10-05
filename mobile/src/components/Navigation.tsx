import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import AccountScreen from "../screens/AccountScreen";
import iconForRoute from "../components/IconForRoute";
import tw from "../../lib/tailwind";

import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();
export default function navigation({ appIsReady }: { appIsReady: boolean }) {
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
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{ appIsReady: appIsReady }}
        />
        <Tab.Screen name="Account" component={AccountScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
