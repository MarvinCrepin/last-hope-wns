import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { useEffect, useRef, useState } from "react";

import { Line } from "react-chartjs-2";

export const options = {
  hourPerDay: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Hours passed per day (by member)",
      },
      legend: {
        display: true,
        position: "bottom" as const,
      },
    },
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type Props = {
  data: any;
};

export default function HoursPerDayPerUser({ data }: Props) {
  const chartRef = useRef<ChartJS<"line", number[], string>>(null);

  const [dataChart, setDataChart] = useState<any>({
    datasets: [],
  });

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    if (data) {
      let labels: string[] = [];

      data.StatHourPerDayByProjectAndUser.datas.forEach((item: any) => {
        item.label.forEach((label: any) => {
          if (!labels.includes(label)) {
            labels.push(label);
          }
        });
      });

      setDataChart({
        labels: labels,
        datasets: data.StatHourPerDayByProjectAndUser.datas.map((data: any) => {
          const randomNum = () =>
            Math.floor(Math.random() * (235 - 52 + 1) + 52);

          const randomRGB = () =>
            `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;

          const resultColor = randomRGB();

          return {
            label: data.user.firstname + " " + data.user.lastname,
            data: data.data,
            backgroundColor: resultColor,
            borderColor: resultColor,
            tension: 0.5,
          };
        }),
      });
    }
  }, [data]);

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    chart.update();
  }, [dataChart]);

  return (
    <div className="h-56">
      <Line data={dataChart} options={options.hourPerDay} ref={chartRef} />
    </div>
  );
}
