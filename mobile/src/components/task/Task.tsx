import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import tw from "../../../lib/tailwind";

import taskStyles from "../../assets/styles/components/taskStyle";
import styles from "../../assets/styles/styles";
import { TaskInList } from "../../../global";
import ProgressBar from "./ProgressBar";
import DeadLine from "./DeadLine";
import Header from "./Header";

export default function Task({ ticketData }: any) {
  const [ticket, setTicket] = useState<TaskInList | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    if (ticketData) {
      setTicket(ticketData);
      if (ticketData.due_at && ticketData.due_at !== null)
        setTimeLeft(
          new Date(ticketData.due_at).getDate() - new Date().getDate()
        );
    }
  }, [ticketData]);

  return ticket ? (
    <View key="card" style={taskStyles.card}>
      <Header due={timeLeft} />
      <View key="body" style={taskStyles.body}>
        <Text key="title" style={taskStyles.title}>
          {ticket.title ? ticket.title : "Untitled"}
        </Text>
        <Text key="sub-title" style={taskStyles.subTitle}>
          {ticket.project ? ticket.project.title : "Untitled"}
        </Text>

        <ProgressBar
          total={ticket.estimated_time}
          timePassed={ticket.advancement}
        />
      </View>
      <DeadLine due={timeLeft} />
    </View>
  ) : null;
}
