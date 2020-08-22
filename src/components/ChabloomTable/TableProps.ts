import {UserManager} from "oidc-client";

import {ChabloomTableColumn} from "./TableColumn";

export interface ChabloomTableProps {
    columns: Array<ChabloomTableColumn>,
    baseUrl: string,
    userManager: UserManager,
}
