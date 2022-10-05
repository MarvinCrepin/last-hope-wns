import { StyleSheet } from "react-native";
import tw from "../../../../lib/tailwind";

const taskStyles = StyleSheet.create({
  card: tw.style("bg-secondary", "w-full", "rounded-lg", "my-3", "p-3"),
  header: tw.style("flex-row", "justify-between", { width: "100%" }),
  badge: tw.style("bg-whiteOpacity", "px-2", "py-1", "rounded", "flex-row"),
  body: tw.style("py-3"),
  title: tw.style("text-2xl", "font-textBold", "text-white"),
  subTitle: tw.style("text-xl", "font-text", "text-white"),
  progress:tw.style("flex-row", "justify-between"),
  progressText: tw.style("text-xl", "font-textBold", "text-primary"),
});
export default taskStyles;
