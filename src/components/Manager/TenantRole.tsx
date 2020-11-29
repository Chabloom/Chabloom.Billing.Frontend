import * as React from "react";

import { TenantRolesApi, TenantViewModel, UserService } from "../../types";

import { ChabloomTable, ChabloomTableColumn } from "../ChabloomTable";

interface Props {
  userService: UserService;
  tenant: TenantViewModel;
}

const columns: Array<ChabloomTableColumn> = [
  {
    title: "Name",
    accessor: "name",
    type: "text",
  },
];

export const TenantRole: React.FC<Props> = (props) => {
  // Initialize state variables
  const [api, setApi] = React.useState<TenantRolesApi>();
  const [title, setTitle] = React.useState("Tenant Roles");

  // Update the API
  React.useEffect(() => {
    if (props.tenant.id) {
      setApi(new TenantRolesApi(props.userService, props.tenant.id));
    }
  }, [props.userService, props.tenant]);

  // Update the title
  React.useEffect(() => {
    setTitle(`Tenant Roles for ${props.tenant.name}`);
  }, [props.tenant]);

  return (
    <ChabloomTable
      {...props}
      api={api}
      title={title}
      columns={columns}
      methods={["add", "edit", "delete"]}
      setAccount={() => {}}
    />
  );
};
