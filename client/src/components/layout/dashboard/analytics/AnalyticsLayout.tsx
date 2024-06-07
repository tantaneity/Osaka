import React from 'react';
import { Typography } from '@material-tailwind/react';
import DashboardLayout from '../DashboardLayout';
import StatisticsDashboard from './AnalyticsCharts';

const AnalyticsDashboardLayout: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center">
        <Typography variant='h1' className='text-2xl mt-5 mb-8'>Analytics</Typography>
        <StatisticsDashboard />
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsDashboardLayout;
