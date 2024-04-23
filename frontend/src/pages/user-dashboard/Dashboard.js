import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Total des tickets créés durant les derniers 30 jours",
    },
  },
  scales: {
    y: {
      ticks: {
        stepSize: 1 // Display ticks and labels in whole numbers
      }
    }
  }
};

export default function Dashboard() {
  const [chartData, setChartData] = useState([]);
  const [totalTicketsCount, setTotalTicketsCount] = useState(0);
  const [pendingTicketsCount, setPendingTicketsCount] = useState(0);
  const [inProgressTicketsCount, setInProgressTicketsCount] = useState(0);
  const [resolvedTicketsCount, setResolvedTicketsCount] = useState(0);

  const generateLabels = () => {
    const labels = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      labels.push(
        date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })
      );
    }
    return labels;
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/tickets/stats"),
      axios.get("/api/tickets/total"),
      axios.get("/api/tickets/pending"),
      axios.get("/api/tickets/inprogress"),
      axios.get("/api/tickets/resolved")
  ]).then(response => {
        const counts = Array(30).fill(0);

        response[0].data.result.forEach((entry) => {
          const date = new Date(entry.date);
          const dayOfMonth = date.getDate();
          const index = 29 - (new Date().getDate() - dayOfMonth); // Calculate index based on current day
          counts[index] = entry.count;
        });
        
        setChartData(counts);
        setTotalTicketsCount(response[1].data.numberOfTickets)
        setPendingTicketsCount(response[2].data.numberOfTickets)
        setInProgressTicketsCount(response[3].data.numberOfTickets)
        setResolvedTicketsCount(response[4].data.numberOfTickets)
    }).catch((error) => {
      console.log(error);
    })
  }, []);

  const data = {
    labels: generateLabels(),
    datasets: [
      {
        label: "Total des tickets créés",
        data: chartData,
        borderColor: "#10b981",
        backgroundColor: "#10b981",
      },
    ],
  };

  return (
    <div className="w-full h-full py-14 px-5 bg-gray-200 text-gray-900 flex flex-col items-center gap-10    ">
      <section class="w-full text-gray-600 body-font">
        <div class="container px-5 lg:px-10 mx-auto">
          <div class="flex flex-wrap justify-between -m-4 text-center gap-5">
            <div class="px-4 py-8 sm:w-[22%]  w-1/2 bg-white rounded-md">
              <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                {totalTicketsCount}
              </h2>
              <p class="leading-relaxed">Total tickets received</p>
            </div>
            <div class="px-4 py-8 sm:w-[23%]  w-1/2 bg-white rounded-md">
              <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                {pendingTicketsCount}
              </h2>
              <p class="leading-relaxed">Total pending tickets</p>
            </div>
            <div class="px-4 py-8 sm:w-[23%]  w-1/2 bg-white rounded-md">
              <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                {inProgressTicketsCount}
              </h2>
              <p class="leading-relaxed">Total tickets in progress</p>
            </div>
            <div class="px-4 py-8 sm:w-[23%]  w-1/2 bg-white rounded-md">
              <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                {resolvedTicketsCount}
              </h2>
              <p class="leading-relaxed">Total resolved tickets</p>
            </div>
          </div>
        </div>
      </section>
        <div className=" lg:min-w-[505px] max-w-full lg:max-w-[700px] aspect-[6/3] lg:aspect-video flex-grow flex-1 shadow bg-white rounded-2xl h-fit lg:min-h-[400px] md:p-4 hidden sm:flex items-center justify-center ">
          <Line options={options} data={data} />
        </div>
    </div>
  );
}
