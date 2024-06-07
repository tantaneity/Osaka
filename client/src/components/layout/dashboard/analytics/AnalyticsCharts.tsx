import React from "react";
import { useAggregatedData } from "@/hooks/useAggregatedData";
import { Spinner } from "@material-tailwind/react";
import { StatisticsCardData, StatisticsChartData } from "@/types/statistics";
import StatisticsCards from "@/components/card/StatisticsCards";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import StatisticsCharts from "@/components/lists/StatisticsCharts";

export const StatisticsDashboard: React.FC = () => {
  const { sellsData, productsData, totalSells, totalUsers, totalProducts, totalRevenue, isLoading } = useAggregatedData();

  if (isLoading) {
    return <Spinner />;
  }

  const statisticsCardsData: StatisticsCardData[] = [
    {
      color: "blue",
      icon: ArrowUpIcon,
      title: "Total Sells",
      value: totalSells,
      footer: {
        color: "text-green-500",
        value: `+${totalSells}`,
        label: "since last month",
      },
    },
    {
      color: "green",
      icon: ArrowUpIcon,
      title: "Total Users",
      value: totalUsers,
      footer: {
        color: "text-green-500",
        value: `+${totalUsers}`,
        label: "since last month",
      },
    },
    {
      color: "purple",
      icon: ArrowUpIcon,
      title: "Total Products",
      value: totalProducts,
      footer: {
        color: "text-green-500",
        value: `+${totalProducts}`,
        label: "since last month",
      },
    },
    {
      color: "orange",
      icon: ArrowUpIcon,
      title: "Total Revenue",
      value: totalRevenue,
      footer: {
        color: "text-green-500",
        value: `+${totalRevenue}`,
        label: "since last month",
      },
    },
  ];

  const statisticsChartsData: StatisticsChartData[] = [
    {
      type: "line",
      title: "Sells Over Time",
      description: "Monthly sells data",
      footer: "Updated just now",
      height: 240,
      chart: {
        background: '#fff',
        toolbar: {
          show: false,
          zoom: {
            enabled: false,
          },
          
        },
        
        series: [
          {
            name: "Sales",
            data: Object.values(sellsData).map((data) => data.quantity),
          },
        ],
        options: {
          title: {
            show: false,
          },
          dataLabels: {
            enabled: false,
          },
          colors: ["#020617"],
          stroke: {
            lineCap: "round",
            curve: "smooth",
          },
          markers: {
            size: 0,
          },
          xaxis: {
            categories: Object.keys(sellsData),
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            labels: {
              style: {
                colors: "#616161",
                fontSize: "12px",
                fontFamily: "inherit",
                fontWeight: 400,
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                colors: "#616161",
                fontSize: "12px",
                fontFamily: "inherit",
                fontWeight: 400,
              },
            },
          },
          grid: {
            show: true,
            borderColor: "#dddddd",
            strokeDashArray: 5,
            xaxis: {
              lines: {
                show: true,
              },
            },
            padding: {
              top: 5,
              right: 20,
            },
          },
          fill: {
            opacity: 0.8,
          },
          tooltip: {
            theme: "dark",
          },
        },
      },
    },
    {
      type: "line",
      title: "Products Over Time",
      description: "Monthly products data",
      footer: "Updated just now",
      height: 240,
      chart: {
        background: '#fff',
        toolbar: {
          show: false,
          zoom: {
            enabled: false,
          },
        },
        series: [
          {
            name: "Products",
            data: Object.values(productsData),
          },
        ],
        options: {
          title: {
            show: false,
          },
          dataLabels: {
            enabled: false,
          },
          colors: ["#8b5cf6"],
          stroke: {
            lineCap: "round",
            curve: "smooth",
          },
          markers: {
            size: 0,
          },
          xaxis: {
            categories: Object.keys(productsData),
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            labels: {
              style: {
                colors: "#616161",
                fontSize: "12px",
                fontFamily: "inherit",
                fontWeight: 400,
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                colors: "#616161",
                fontSize: "12px",
                fontFamily: "inherit",
                fontWeight: 400,
              },
            },
          },
          grid: {
            show: true,
            borderColor: "#dddddd",
            strokeDashArray: 5,
            xaxis: {
              lines: {
                show: true,
              },
            },
            padding: {
              top: 5,
              right: 20,
            },
          },
          fill: {
            opacity: 0.8,
          },
          tooltip: {
            theme: "dark",
          },
        },
      },
    },
    {
      type: "line",
      title: "Revenue Over Time",
      description: "Monthly revenue data",
      footer: "Updated just now",
      height: 240,
      chart: {
        
        background: '#fff',
        toolbar: {
          show: false,
          zoom: {
            enabled: false,
          },
        },
        series: [
          {
            name: "Revenue",
            data: Object.values(sellsData).map((data) => data.revenue),
          },
        ],
        options: {
          title: {
            show: false,
          },
          dataLabels: {
            enabled: false,
          },
          colors: ["#f6ad55"],
          stroke: {
            lineCap: "round",
            curve: "smooth",
          },
          markers: {
            size: 0,
          },
          xaxis: {
            categories: Object.keys(sellsData),
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            labels: {
              style: {
                colors: "#616161",
                fontSize: "12px",
                fontFamily: "inherit",
                fontWeight: 400,
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                colors: "#616161",
                fontSize: "12px",
                fontFamily: "inherit",
                fontWeight: 400,
              },
            },
          },
          grid: {
            show: true,
            borderColor: "#dddddd",
            strokeDashArray: 5,
            xaxis: {
              lines: {
                show: true,
              },
            },
            padding: {
              top: 5,
              right: 20,
            },
          },
          fill: {
            opacity: 0.8,
          },
          tooltip: {
            theme: "dark",
          },
        },
      },
    }
    
  ];

  return (
    <div className="mt-12">
      <StatisticsCards data={statisticsCardsData} />
      <StatisticsCharts data={statisticsChartsData} />
    </div>
  );
};

export default StatisticsDashboard;
