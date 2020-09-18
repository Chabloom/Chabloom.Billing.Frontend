import React from "react";

import {User} from "oidc-client";

import {ApplicationUsersApi} from "../api";

import {ChabloomTable, ChabloomTableColumn} from "./ChabloomTable";

interface Props {
    user: User;
}

const columns: Array<ChabloomTableColumn> = [
    {
        title: 'User Id',
        accessor: "userId",
        type: "text",
    },
    {
        title: 'Role',
        accessor: "roleName",
        type: "text",
    },
]

// The API to use
let api: ApplicationUsersApi = new ApplicationUsersApi();

export const ApplicationUsers: React.FC<Props> = (props) => {
    const title = "Application Users";

    return <ChabloomTable
        {...props}
        api={api}
        title={title}
        columns={columns}
        methods={["add", "edit", "delete"]}
        tenant={undefined}/>;
}
