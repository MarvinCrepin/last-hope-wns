import { StyleSheet } from "react-native";
import tw from "../../../lib/tailwind";

const styles = StyleSheet.create({
  mainTitle: tw.style("font-title", "text-primary", "text-4xl", "text-center"),
  homeHeader: tw.style("flex-row"),
  tab: tw.style("border-b-4", "border-primary", "mx-2"),
  subTitle: tw.style("font-textBold", "text-primary", "text-xl"),
  flameIcon: tw.style("w-6", "h-6", "mr-2"),
  chronoIcon:tw.style("w-7", "h-7", "mr-2"),
  messageIcon: tw.style("w-7", "h-7"),
  text: tw.style("font-text", "text-lg", "text-white"),
});

export default styles;
