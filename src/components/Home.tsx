import * as React from "react";

import { User } from "oidc-client";

import { Dashboard as CustomerDashboard } from "./Customer";
import { Dashboard as ManagerDashboard } from "./Manager";

interface Props {
  user: User | undefined;
  admin: boolean;
  manager: boolean;
}

export const Home: React.FC<Props> = (props) => {
  if (props.admin || props.manager) {
    return <ManagerDashboard {...props} />;
  }
  return <CustomerDashboard {...props} />;
};
