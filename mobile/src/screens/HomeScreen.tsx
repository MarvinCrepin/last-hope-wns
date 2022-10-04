import React from "react";
import { View, Text } from "react-native";

import tw from "../../lib/tailwind";

export default function HomeScreen() {
  return (
    <View style={tw.style("bg-primary")}>
      <Text style={tw.style( "font-text")}>Title</Text>
    </View>
  );
}
