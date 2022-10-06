import React from "react";
import { View } from "react-native";
import { TaskInList } from "../../../global";
import Task from "./Task";

interface IProps {
  data: TaskInList[];
}

export default function TasksList({ data }: IProps) {
  console.log(data);

  return (
    <View style={{ width: "100%" }}>
      data.map()
      <Task />
    </View>
  );
}
