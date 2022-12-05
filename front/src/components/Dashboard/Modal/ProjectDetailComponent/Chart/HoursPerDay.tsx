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
  ScriptableContext,
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
        text: "Hours passed per day (Global)",
      },
      legend: {
        display: false,
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

export default function HoursPerDay({ data }: Props) {
  const chartRef = useRef<ChartJS<"line", number[], string>>(null);

  const [dataChart, setDataChart] = useState<any>({
    labels: [],
    datasets: [
      {
        data: [],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  });

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    if (data) {
      if (chartRef.current) {
        setDataChart({
          labels: data.StatHourPerDayByProject.labels,
          datasets: [
            {
              fill: true,
              backgroundColor: (context: ScriptableContext<"line">) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(
                  0,
                  0,
                  0,
                  context.chart.height
                );
                gradient.addColorStop(0, "rgba(248,221,156,1)");
                gradient.addColorStop(0.25, "rgba(248,221,156,0.75)");
                gradient.addColorStop(0.5, "rgba(248,221,156,0.5)");
                gradient.addColorStop(0.75, "rgba(248,221,156,0.25)");
                gradient.addColorStop(1, "rgba(248,221,156,0");

                return gradient;
              },

              tension: 0.5,
              data: data.StatHourPerDayByProject.datas,
              borderColor: "#F8DD9C",
            },
          ],
        });
      }
    }
  }, [data, chartRef]);

  return (
    <div className="h-56">
      <Line data={dataChart} options={options.hourPerDay} ref={chartRef} />
    </div>
  );
}
