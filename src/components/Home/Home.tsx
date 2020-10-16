import React from "react";

import { User } from "oidc-client";

import { TenantViewModel } from "chabloom-payments-typescript";

import { AdminHome } from "./Admin";
import { CustomerHome } from "./Customer";
import { ManagerHome } from "./Manager";

interface Props {
  user: User | undefined;
  allTenants: Array<TenantViewModel>;
  admin: boolean;
  manager: boolean;
}

export const Home: React.FC<Props> = (props) => {
  if (props.admin) {
    return <AdminHome {...props} />;
  } else if (props.manager) {
    return <ManagerHome {...props} />;
  }
  return <CustomerHome {...props} />;
};
