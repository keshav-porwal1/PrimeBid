import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

const BiddersAuctioneersGraph = () => {
  const { totalAuctioneers, totalBidders } = useSelector(
    (state) => state.superAdmin
  );

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Number of Bidders",
        data: totalBidders,
        borderColor: "#D6482B",
        fill: false,
      },
      {
        label: "Number of Auctioneers",
        data: totalAuctioneers,
        borderColor: "#fdba88",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: isDark ? "#e5e7eb" : "#374151", // gray-200 or gray-700
        },
        grid: {
          color: isDark ? "#374151" : "#e5e7eb", // gray-700 or gray-200
        },
      },
      y: {
        beginAtZero: true,
        max: 50,
        ticks: {
          color: isDark ? "#e5e7eb" : "#374151",
          callback: function (value) {
            return value.toLocaleString();
          },
        },
        grid: {
          color: isDark ? "#374151" : "#e5e7eb",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: isDark ? "#e5e7eb" : "#374151",
        },
      },
      title: {
        display: true,
        text: "Number of Bidders And Auctioneers Registered",
        color: isDark ? "#e5e7eb" : "#111827", // white or gray-900
      },
    },
  };

  return (
    <div className="relative h-[400px] w-full bg-white dark:bg-gray-900 rounded-md shadow-md p-4">
      <Line data={data} options={options} />
    </div>
  );
};

export default BiddersAuctioneersGraph;
