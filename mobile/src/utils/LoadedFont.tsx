import * as Font from "expo-font";

const LoadedFont = async () => {
  return Font.loadAsync({
    "Baloo Da 2 Medium": require("../assets/fonts/BalooDa2-Medium.ttf"),
    "Baloo Da 2 Regular": require("../assets/fonts/BalooDa2-Regular.ttf"),
    "Baloo Da 2 SemiBold": require("../assets/fonts/BalooDa2-SemiBold.ttf"),
    "Cabin Sketch": require("../assets/fonts/CabinSketch-Regular.ttf"),
    "Cabin Sketch Bold": require("../assets/fonts/CabinSketch-Bold.ttf"),
  });
};

export default LoadedFont;
