import React from "react";

import { Dashboard as CustomerDashboard } from "./Customer";
import { Dashboard as ManagerDashboard } from "./Manager";

import { UserService } from "../types";

interface Props {
  userService: UserService;
  admin: boolean;
  manager: boolean;
}

export const Home: React.FC<Props> = (props) => {
  if (props.admin || props.manager) {
    return <ManagerDashboard {...props} />;
  }
  return <CustomerDashboard {...props} />;
};
