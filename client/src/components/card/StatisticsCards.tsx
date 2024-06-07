import React from "react";
import StatisticsCard from "@/components/card/StatisticsCard";
import { StatisticsCardData } from "@/types/statistics";
import { Typography } from "@material-tailwind/react";

interface StatisticsCardsProps {
  data: StatisticsCardData[];
}

const StatisticsCards: React.FC<StatisticsCardsProps> = ({ data }) => {
  return (
    <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
      {data.map(({ icon, title, footer, ...rest }) => (
        <StatisticsCard
          key={title}
          {...rest}
          title={title}
          icon={React.createElement(icon, {
            className: "w-6 h-6 text-black",
          })}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className={footer.color}>{footer.value}</strong>
              &nbsp;{footer.label}
            </Typography>
          }
        />
      ))}
    </div>
  );
};

export default StatisticsCards;
