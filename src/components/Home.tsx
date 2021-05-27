import * as React from "react";

import { Dashboard as CustomerDashboard } from "./Customer";
import { Dashboard as ManagerDashboard } from "./Manager";

import { useAppContext } from "../AppContext";

export const Home: React.FC = () => {
  const { selectedRole } = useAppContext();

  if (selectedRole === "Admin" || selectedRole === "Manager") {
    return <ManagerDashboard />;
  } else {
    return <CustomerDashboard />;
  }
};
