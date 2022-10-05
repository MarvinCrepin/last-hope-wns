import { nonNull } from "nexus";
import React from "react";
import { View, Text, Image } from "react-native";
import * as Progress from "react-native-progress";
import tw from "../../../lib/tailwind";

import taskStyles from "../../assets/styles/components/taskStyle";
import styles from "../../assets/styles/styles";

export default function Task() {
  return (
    <View key="card" style={taskStyles.card}>
      <View key="header" style={taskStyles.header}>
        <View key="badge-priority" style={taskStyles.badge}>
          <Image
            style={styles.flameIcon}
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
        <Text key="title" style={taskStyles.title}>
          Titre de la tâche
        </Text>
        <Text key="sub-title" style={taskStyles.subTitle}>
          Sous-titre
        </Text>
        <View key="progress" style={tw.style("my-3")}>
          <View style={taskStyles.progress}>
            <Text style={taskStyles.progressText}>Progress</Text>
            <Text style={taskStyles.progressText}>30 %</Text>
          </View>

          <Progress.Bar
            progress={0.3}
            width={null}
            color={tw.color("primary")}
            unfilledColor={tw.color("white")}
            borderWidth={0}
            height={15}
            borderRadius={10}
          />
        </View>
      </View>
      <View key="footer">
        <View key="badge-priority" style={taskStyles.badge}>
          <Image
            style={styles.chronoIcon}
            source={require("../../assets/img/chronometer.png")}
          />
          <Text style={styles.text}>5 days left</Text>
        </View>
      </View>
    </View>
  );
}
