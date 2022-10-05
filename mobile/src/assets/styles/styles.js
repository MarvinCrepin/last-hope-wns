import { StyleSheet } from "react-native";
import tw from "../../../lib/tailwind";

const styles = StyleSheet.create({
  mainTitle: tw.style("font-title", "text-primary", "text-4xl", "text-center"),
  homeHeader: tw.style("flex-row"),
  tab: tw.style("border-b-4", "border-primary", "mx-2"),
  subTitle: tw.style("font-textBold", "text-primary", "text-xl"),
  tinyIcon: tw.style("w-5", "h-5", "mr-2"),
  messageIcon: tw.style("w-7", "h-7", "mr-2"),
  text: tw.style("font-text", "text-md", "text-white"),
});

export default styles;
