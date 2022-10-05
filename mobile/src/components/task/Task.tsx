import React from "react";
import { View, Text, Image } from "react-native";

import taskStyles from "../../assets/styles/components/taskStyle";
import styles from "../../assets/styles/styles";

import tw from "../../../lib/tailwind";

export default function Task() {
  return (
    <View key="card" style={taskStyles.card}>
      <View key="header" style={taskStyles.header}>
        <View key="badge-priority" style={taskStyles.badge}>
          <Image
            style={styles.tinyIcon}
            source={require("../../assets/img/fire.png")}
          />
          <Text style={styles.text}>Priority</Text>
        </View>
        <View key="comment">
          <Image
            style={styles.messageIcon}
            source={require("../../assets/img/comment.png")}
          />
        </View>
      </View>
      <View key="body" style={taskStyles.body}>
        <Text key="title" style={taskStyles.title}>Titre de la tâche</Text>
        <Text key="sub-title" style={taskStyles.subTitle}>Sous-titre</Text>
      </View>
    </View>
  );
}
