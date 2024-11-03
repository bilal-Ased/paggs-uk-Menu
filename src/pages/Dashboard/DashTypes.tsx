export type DashboardStats = {
  customers: number;
  tickets: number;
};

export type DashboardProps = {
  stats: DashboardStats;
};
