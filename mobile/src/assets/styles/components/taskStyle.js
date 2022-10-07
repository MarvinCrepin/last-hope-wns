import { StyleSheet } from "react-native";
import tw from "../../../../lib/tailwind";

const taskStyles = StyleSheet.create({
  card: tw.style("bg-secondary", "w-full", "rounded-2xl", "my-3", "p-3"),
  header: tw.style("flex-row", "justify-between", { width: "100%" }),
  badge: tw.style("bg-whiteOpacity", "px-2", "py-1", "rounded-md", "flex-row", "self-start"),
  body: tw.style("py-3"),
  title: tw.style("text-2xl", "font-textBold", "text-white"),
  subTitle: tw.style("text-xl", "font-text", "text-white"),
  progress:tw.style("flex-row", "justify-between"),
  progressText: tw.style("text-xl", "font-textBold", "text-primary"),
  flameIcon: tw.style("w-6", "h-6", "mr-2"),
  chronoIcon: tw.style("w-7", "h-7", "mr-2"),
  messageIcon: tw.style("w-7", "h-7"),
  textIcon: tw.style("font-textBold","text-white", {position:"absolute", top:2, left:10}),
});
export default taskStyles;
