import React from "react";
import StatisticsChart from "@/components/charts/StatisticsChart";
import { StatisticsChartData } from "@/types/statistics";
import { Card, Typography } from "@material-tailwind/react";

interface StatisticsChartsProps {
  data: StatisticsChartData[];
}

const StatisticsCharts: React.FC<StatisticsChartsProps> = ({ data }) => {
  return (
    <div className="mb-6 grid grid-cols-3 gap-y-12 gap-x-6">
      {data.map((props) => (
        <Card key={props.title}>
          <StatisticsChart
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                {props.footer}
              </Typography>
            }
          />
        </Card>
      ))}
    </div>
  );
};

export default StatisticsCharts;
