import { useEffect, useState } from 'react';
import CardFour from '../../components/CardFour.tsx';
import CardOne from '../../components/CardOne.tsx';
import CardThree from '../../components/CardThree.tsx';
import CardTwo from '../../components/CardTwo.tsx';
import ChartOne from '../../components/ChartOne.tsx';
import ChartTwo from '../../components/ChartTwo.tsx';
import { DashboardStats } from './DashTypes.tsx';
import { useAuth } from '../../context/AuthContext.tsx';

const ECommerce = () => {
  const [stats, setStats] = useState<DashboardStats>({
    customers: 0,
    bookings: 0,
    bookings_today: 0,
    users: 0,
  });

  useEffect(() => {
    fetch('https://coral-app-fvdip.ondigitalocean.app/api/dashboard/stats')
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setStats(data);
        }
      })
      .catch((error) => {
        console.log(`error loading stats: ${error}`);
      });
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne stats={stats} />
        <CardTwo stats={stats} />
        <CardThree stats={stats} />
        <CardFour stats={stats} />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
      </div>
    </>
  );
};

export default ECommerce;
