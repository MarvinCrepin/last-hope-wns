import { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import taskStyles from "../../assets/styles/components/taskStyle";
import styles from "../../assets/styles/styles";
import { Comment, Priority } from "../../../global";

interface IPropsHeader {
  due: number;
  comments: Comment[];
}

export default function Header({ due, comments }: IPropsHeader) {
  const [priority, setPriority] = useState<Priority>({
    priority: "Overdue",
    icon: require("../../assets/img/danger.png"),
  });

  useEffect(() => {
    if (due) {
      if (due <= 0) {
        setPriority({
          priority: "Overdue",
          icon: require("../../assets/img/danger.png"),
        });
      } else if (due <= 3) {
        setPriority({
          priority: "Urgent",
          icon: require("../../assets/img/fire.png"),
        });
      } else if (due <= 7) {
        setPriority({
          priority: "High priority",
          icon: require("../../assets/img/sun.png"),
        });
      } else {
        setPriority({
          priority: "Low priority",
          icon: require("../../assets/img/cool.png"),
        });
      }
    }
  }, [due]);
  return (
    <View key="header" style={taskStyles.header}>
      <View key="badge-priority" style={taskStyles.badge}>
        <Image style={taskStyles.flameIcon} source={priority.icon} />
        <Text style={styles.text}>{priority.priority}</Text>
      </View>
      <View key="comment">
        <Image
          style={taskStyles.messageIcon}
          source={require("../../assets/img/comment.png")}
        />
        <Text style={taskStyles.textIcon}>{comments ? comments.length : 0}</Text>
      </View>
    </View>
  );
}
