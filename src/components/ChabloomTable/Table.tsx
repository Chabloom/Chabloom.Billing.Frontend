import React from "react";

import {UserManager} from "oidc-client";

import {Paper, Table, TableContainer} from "@material-ui/core";

import {BaseApiType} from "../../api";
import {BaseViewModel, TenantViewModel} from "../../models";

import {ChabloomTableBody} from "./Body";
import {ChabloomTableHead} from "./Head";
import {ChabloomTableColumn} from "./Column";
import {ChabloomTablePagination} from "./Pagination";
import {ChabloomTableHeading} from "./Heading";

interface Props {
    title: string,
    columns: Array<ChabloomTableColumn>,
    methods: Array<"add" | "edit" | "delete" | "bill" | "schedule" | "transaction">,
    userManager: UserManager,
    api: BaseApiType<BaseViewModel>,
    tenant: TenantViewModel | undefined,
}

const getToken = async (userManager: UserManager) => {
    let token = "";
    const user = await userManager.getUser();
    if (user && !user.expired) {
        token = user.access_token;
    } else {
        localStorage.setItem("redirectUri", window.location.pathname);
        userManager.signinRedirect({}).then().catch(() => {
        });
    }
    return token;
}

export const ChabloomTable: React.FC<Props> = (props) => {
    const [data, setData] = React.useState([] as Array<BaseViewModel>);
    const [token, setToken] = React.useState("");
    const [adding, setAdding] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const [editIndex, setEditIndex] = React.useState(-1);
    const [editItem, setEditItem] = React.useState<BaseViewModel>({} as BaseViewModel);
    const [deleteIndex, setDeleteIndex] = React.useState(-1);
    const [processing, setProcessing] = React.useState(false);
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        console.debug("updating table data");
        setProcessing(true);
        getToken(props.userManager).then(token => {
            setToken(token);
            props.api.readItems(token).then(result => {
                if (typeof result === "string") {
                    setData([] as Array<BaseViewModel>);
                    setError(result);
                } else {
                    try {
                        const sortedData = result.sort((a, b) =>
                            a["name"].localeCompare(b["name"]));
                        setData([...sortedData]);
                    } catch {
                        setError('item read failed');
                    }
                }
            }).catch(reason => setError(reason)).finally(() => setProcessing(false));
        });
    }, [props.api, props.tenant, props.userManager]);

    return (
        <TableContainer component={Paper}>
            <ChabloomTableHeading
                {...props}
                token={token}
                data={data}
                setData={setData}
                adding={adding}
                setAdding={setAdding}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                editIndex={editIndex}
                setEditIndex={setEditIndex}
                editItem={editItem}
                setEditItem={setEditItem}
                deleteIndex={deleteIndex}
                setDeleteIndex={setDeleteIndex}
                processing={processing}
                setProcessing={setProcessing}
                error={error}
                setError={setError}/>
            <Table>
                <ChabloomTableHead
                    {...props}
                    data={data}
                    setData={setData}
                    adding={adding}
                    setAdding={setAdding}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                    editIndex={editIndex}
                    setEditIndex={setEditIndex}
                    deleteIndex={deleteIndex}
                    setDeleteIndex={setDeleteIndex}
                    processing={processing}
                    setProcessing={setProcessing}/>
                <ChabloomTableBody
                    {...props}
                    data={data}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                    editIndex={editIndex}
                    editItem={editItem}
                    setEditItem={setEditItem}
                    deleteIndex={deleteIndex}
                    processing={processing}/>
            </Table>
            <ChabloomTablePagination data={data}/>
        </TableContainer>
    );
}
