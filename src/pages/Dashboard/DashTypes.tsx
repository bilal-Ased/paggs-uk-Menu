export type DashboardStats = {
  customers: number;
  bookings: number;
  bookings_today: number;
  users: number;
};

export type DashboardProps = {
  stats: DashboardStats;
};
