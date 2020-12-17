import * as React from "react";

import { Dashboard as CustomerDashboard } from "./Customer";
import { Dashboard as ManagerDashboard } from "./Manager";

import { useAppContext, UserLevel } from "../AppContext";

export const Home: React.FC = () => {
  const context = useAppContext();

  if (context.selectedUserLevel === UserLevel.Admin || context.selectedUserLevel === UserLevel.Manager) {
    return <ManagerDashboard />;
  } else {
    return <CustomerDashboard />;
  }
};
