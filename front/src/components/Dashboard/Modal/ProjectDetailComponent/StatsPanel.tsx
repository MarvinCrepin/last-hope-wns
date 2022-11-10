import { useLazyQuery, useQuery } from "@apollo/client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import GetTotalTicketDurationUserByProject from "../../../../graphql/queries/TicketDurationUser/GetTotalTicketDurationByProjet7DayAgo";
import { classNames } from "../../../common/Utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  hourPerDay: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Dataset 2",
      data: ["0", "10", "5", "2", "20", "30", "45"],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const tabs = [{ label: "Hours Per Day", value: 1 }];

type Props = {};

export default function StatsPanel({}: Props) {
  const [selectedTab, setSelectedTab] = useState(tabs[0].value);

  const { loading, error, data } = useQuery(
    GetTotalTicketDurationUserByProject
  );

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  //   if (loading)

  return <p>Loading...</p>;

  return (
    <div>
      <nav className="flex flex-col sm:flex-row mb-4 justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSelectedTab(tab.value)}
            className={classNames(
              selectedTab === tab.value
                ? " py-4 px-6 block hover:text-lh-primary focus:outline-none text-lh-primary border-b-2 font-medium border-lh-primary"
                : " py-4 px-6 block hover:text-lh-primary focus:outline-none"
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* {selectedTab === 1 && 
      <Line options={options.hourPerDay} data={data} />
      } */}
    </div>
  );
}
