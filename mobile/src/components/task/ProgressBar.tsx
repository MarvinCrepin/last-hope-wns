import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import * as Progress from "react-native-progress";
import tw from "../../../lib/tailwind";
import taskStyles from "../../assets/styles/components/taskStyle";

interface IProgressProps {
  total: number;
  timePassed: number;
}
export default function ProgressBar({ total, timePassed }: IProgressProps) {
  const [progress, setProgress] = useState<number>(0);
  useEffect(() => {
    if (total && timePassed && total !== null && timePassed !== null)
      setProgress(timePassed / total);
  }, [total, timePassed]);

  return (
    <View key="progress" style={tw.style("my-3")}>
      <View style={taskStyles.progress}>
        <Text style={taskStyles.progressText}>Progress</Text>
        <Text style={taskStyles.progressText}>
          {Math.round(progress * 100)}%
        </Text>
      </View>
      <Progress.Bar
        progress={progress}
        width={null}
        color={tw.color("primary")}
        unfilledColor={tw.color("white")}
        borderWidth={0}
        height={15}
        borderRadius={10}
      />
    </View>
  );
}
