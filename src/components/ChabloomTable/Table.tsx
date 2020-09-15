import React from "react";

import {User} from "oidc-client";

import {Paper, Table, TableContainer} from "@material-ui/core";

import {BaseApiType} from "../../api";
import {BaseViewModel, TenantViewModel} from "../../models";

import {ChabloomTableBody} from "./Body";
import {ChabloomTableHead} from "./Head";
import {ChabloomTableColumn} from "./Column";
import {ChabloomTablePagination} from "./Pagination";
import {ChabloomTableHeading} from "./Heading";

interface Props {
    user: User | undefined;
    tenant: TenantViewModel | undefined;
    api: BaseApiType<BaseViewModel>,
    title: string,
    columns: Array<ChabloomTableColumn>,
    methods: Array<"add" | "edit" | "delete" | "bill" | "schedule" | "transaction">,
}

export const ChabloomTable: React.FC<Props> = (props) => {
    const [data, setData] = React.useState([] as Array<BaseViewModel>);
    const [adding, setAdding] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const [editIndex, setEditIndex] = React.useState(-1);
    const [editItem, setEditItem] = React.useState<BaseViewModel>({} as BaseViewModel);
    const [deleteIndex, setDeleteIndex] = React.useState(-1);
    const [processing, setProcessing] = React.useState(false);
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        if (props.user) {
            console.debug("updating table data");
            setProcessing(true);
            props.api.readItems(props.user?.access_token).then(ret => {
                if (typeof ret === "string") {
                    setData([] as Array<BaseViewModel>);
                    setError(ret);
                } else {
                    try {
                        const sortedData = ret.sort((a, b) =>
                            a["name"].localeCompare(b["name"]));
                        setData([...sortedData]);
                        setError("");
                    } catch {
                        setError('item read failed');
                    }
                }
            }).catch(ret => setError(ret)).finally(() => setProcessing(false));
        }
    }, [props.user, props.api, props.title]);

    return (
        <TableContainer component={Paper}>
            <ChabloomTableHeading
                {...props}
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
