import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { TaskInList } from "../../../global";
import Task from "./Task";

interface IProps {
  data: TaskInList[];
}

export default function TasksList({ data }: IProps) {
  const [tickets, setTickets] = useState<TaskInList[]>([]);

  useEffect(() => {
    if (data) setTickets(data);
  }, [data]);

  return tickets.length > 0 ? (
    <FlatList
      style={{ width: "100%" }}
      data={tickets}
      keyExtractor={(ticket) => ticket.id}
      renderItem={(ticketData) => {
        return <Task ticketData={ticketData.item} />;
      }}
    />
  ) : null;
}
