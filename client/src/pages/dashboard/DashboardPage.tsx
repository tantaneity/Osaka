import AnalyticsDashboardLayout from '@/components/layout/dashboard/analytics/AnalyticsLayout';
import SidebarNav from '@/components/nav/SidebarNav/SidebarNav';
import useUserStore from '@/store/UserStore';
import { Spinner } from '@material-tailwind/react';
import React, { useState } from 'react';
import { useParams } from 'react-router';



const DashboardPage: React.FC = () => {
    const { navigate } = useParams<{ navigate: string }>();
    const {isLoading} = useUserStore()
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
    }
    const renderLayout = () => {
        switch (navigate) {
            case 'dashboard':
                return <AnalyticsDashboardLayout />
        
            default:
                return <AnalyticsDashboardLayout />

        }
      };
    return (
        <div className='dashboard'>
            <div className='lg:p-2 lg:pl-6'>
                <SidebarNav/>
                {renderLayout()}
            </div>
            
        </div>
    );
};

export default DashboardPage;
