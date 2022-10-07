import { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useQuery } from "@apollo/client";
import GetAllTickets from "../graphql/queries/Ticket/GetAllTickets";
import tw from "../../lib/tailwind";
import styles from "../assets/styles/styles";
import TasksList from "../components/task/TasksList";

import { TaskInList } from "../../global";

export default function HomeScreen({ route }: { route: any; navigation: any }) {
  const { appIsReady } = route.params;
  const [allTickets, setAllTickets] = useState<TaskInList[]>([]);

  const { data } = useQuery(GetAllTickets, {
    onError(error) {
      console.log(error);
    },
  });

  return (
    <View style={tw.style("p-5")}>
      <View key="title">
        <Text style={styles.mainTitle}>
          Hi{" "}
          <Text style={tw.style("font-title", "text-tertiary")}>Jean Mi</Text>
        </Text>
        <View>
          <Text style={styles.mainTitle}>No release on friday !</Text>
        </View>
      </View>
      <View
        key="tasksAndProjects"
        style={tw.style("items-center", "py-3", "my-3")}
      >
        <View key="header" style={styles.homeHeader}>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.subTitle}>TASKS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.subTitle}>PROJECTS</Text>
          </TouchableOpacity>
        </View>
        <TasksList data={data.GetAllTickets} />
        
      </View>
    </View>
  );
}
