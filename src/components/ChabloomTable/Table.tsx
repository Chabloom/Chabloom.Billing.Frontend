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

export interface ChabloomTableProps {
    title: string,
    columns: Array<ChabloomTableColumn>,
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

export const ChabloomTable: React.FC<ChabloomTableProps> = (props) => {
    const [data, setData] = React.useState([] as Array<BaseViewModel>);
    const [token, setToken] = React.useState("");
    const [adding, setAdding] = React.useState(false);
    const [editIndex, setEditIndex] = React.useState(-1);
    const [deleteIndex, setDeleteIndex] = React.useState(-1);
    const [loaded, setLoaded] = React.useState(false);
    const [processing, setProcessing] = React.useState(false);
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        setLoaded(false);
    }, [props.tenant]);

    if (!processing && !loaded) {
        setProcessing(true);
        getToken(props.userManager).then(token => {
            setToken(token);
            props.api.readItems(token).then(result => {
                if (typeof result === "string") {
                    setData([] as Array<BaseViewModel>);
                    setError(result);
                } else {
                    try {
                        setData(result as Array<BaseViewModel>);
                        setLoaded(true);
                        setProcessing(false);
                    } catch {
                        setError('item read failed');
                    }
                }
            }).catch(reason => setError(reason));
        })
    }

    return (
        <TableContainer component={Paper}>
            <ChabloomTableHeading
                title={props.title}
                tenant={props.tenant}
                processing={processing}
                error={error}/>
            <Table>
                <ChabloomTableHead
                    columns={props.columns}
                    data={data}
                    setData={setData}
                    adding={adding}
                    setAdding={setAdding}
                    editIndex={editIndex}
                    setEditIndex={setEditIndex}
                    deleteIndex={deleteIndex}
                    setDeleteIndex={setDeleteIndex}
                    processing={processing}
                    setProcessing={setProcessing}/>
                <ChabloomTableBody
                    api={props.api}
                    token={token}
                    columns={props.columns}
                    data={data}
                    setData={setData}
                    adding={adding}
                    setAdding={setAdding}
                    editIndex={editIndex}
                    setEditIndex={setEditIndex}
                    deleteIndex={deleteIndex}
                    setDeleteIndex={setDeleteIndex}
                    processing={processing}
                    setProcessing={setProcessing}
                    error={error}
                    setError={setError}/>
            </Table>
            <ChabloomTablePagination data={data}/>
        </TableContainer>
    );
}
