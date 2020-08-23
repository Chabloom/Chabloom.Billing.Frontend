import {UserManager} from "oidc-client";

import {BaseApiType} from "../../api";

import {ChabloomTableColumn} from "./TableColumn";

export interface ChabloomTableProps {
    columns: Array<ChabloomTableColumn>,
    userManager: UserManager,
    api: BaseApiType<any>,
}
