import { Image, Text, View } from "react-native";
import taskStyles from "../../../assets/styles/components/taskStyle";
import styles from "../../../assets/styles/styles";

export default function DeadLine({ due }: { due: number }) {

  return (
    <View key="footer">
      <View key="badge-priority" style={taskStyles.badge}>
        <Image
          style={taskStyles.chronoIcon}
          source={require("../../../assets/img/chronometer.png")}
        />
        <Text style={styles.text}>{due ? due : 'No'} days left</Text>
      </View>
    </View>
  );
}
