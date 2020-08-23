import React from "react";

import {UserManager} from "oidc-client";

import {
    Fab,
    IconButton,
    LinearProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Add, CancelOutlined, DeleteOutlined, EditOutlined, SaveOutlined} from "@material-ui/icons";
import {Alert, AlertTitle} from "@material-ui/lab";

import {BaseApiType} from "../../api";
import {BaseViewModel, TenantViewModel} from "../../models";

import {ChabloomTableBackend} from "./TableBackend";

export interface ChabloomTableColumn {
    title: string,
    accessor: string,
}

export interface ChabloomTableProps {
    title: string,
    columns: Array<ChabloomTableColumn>,
    userManager: UserManager,
    api: BaseApiType<BaseViewModel>,
    tenant: TenantViewModel | undefined,
}

export const ChabloomTable: React.FC<ChabloomTableProps> = (props) => {
    const [data, setData] = React.useState([] as Array<BaseViewModel>);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [adding, setAdding] = React.useState(false);
    const [editIndex, setEditIndex] = React.useState(-1);
    const [deleteIndex, setDeleteIndex] = React.useState(-1);
    const [loaded, setLoaded] = React.useState(false);
    const [processing, setProcessing] = React.useState(false);
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        setLoaded(false);
    }, [props.tenant]);

    const api = new ChabloomTableBackend(props.api, props.userManager);
    if (!processing && !loaded) {
        setProcessing(true);
        api.readItems().then(result => {
            try {
                setData(result as Array<BaseViewModel>);
                setLoaded(true);
                setProcessing(false);
            } catch {
                setError(result as string);
            }
        });
    }

    return (
        <TableContainer component={Paper}>
            <Toolbar>
                <Typography
                    variant="h6">{props.tenant ? `${props.tenant?.name} ${props.title}` : props.title}
                </Typography>
            </Toolbar>
            {processing && <LinearProgress/>}
            {error &&
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error}
            </Alert>
            }
            <Table>
                <TableHead>
                    <TableRow>
                        {!adding &&
                        <TableCell>
                            <Fab
                                color="primary"
                                disabled={editIndex !== -1 || deleteIndex !== -1}
                                onClick={() => {
                                    setProcessing(true);
                                    setData([{} as BaseViewModel, ...data]);
                                    setEditIndex(0);
                                    setDeleteIndex(-1);
                                    setAdding(true);
                                    setProcessing(false);
                                }}>
                                <Add/>
                            </Fab>
                        </TableCell>
                        }
                        {adding &&
                        <TableCell/>
                        }
                        {props.columns.map(column => (
                            <TableCell key={column.title} align="left">{column.title}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.length > 0 && data.map((row, index) => {
                        let mutRow = row as BaseViewModel;
                        return (
                            <TableRow key={row["id"]}>
                                {editIndex === index &&
                                <TableCell>
                                    <IconButton onClick={() => {
                                        setProcessing(true);
                                        if (adding) {
                                            api.addItem(mutRow).then(err => {
                                                if (!err) {
                                                    setEditIndex(-1);
                                                    setAdding(false);
                                                    setError("");
                                                } else {
                                                    setError(err);
                                                }
                                            });
                                        } else {
                                            api.editItem(mutRow).then(err => {
                                                if (!err) {
                                                    setEditIndex(-1);
                                                    setError("");
                                                } else {
                                                    setError(err);
                                                }
                                            });
                                        }
                                        setProcessing(false);
                                    }}>
                                        <SaveOutlined/>
                                    </IconButton>
                                    <IconButton onClick={() => {
                                        setProcessing(true);
                                        if (adding) {
                                            setData([...data.slice(0, index), ...data.slice(index + 1)]);
                                        }
                                        setEditIndex(-1);
                                        setAdding(false);
                                        setProcessing(false);
                                        setError("");
                                    }}>
                                        <CancelOutlined/>
                                    </IconButton>
                                </TableCell>
                                }
                                {deleteIndex === index &&
                                <TableCell>
                                    <IconButton onClick={() => {
                                        setProcessing(true);
                                        api.deleteItem(row).then(err => {
                                            if (!err) {
                                                setData([...data.slice(0, index), ...data.slice(index + 1)]);
                                                setDeleteIndex(-1);
                                            } else {
                                                setError(err);
                                            }
                                        });
                                        setProcessing(false);
                                    }}><DeleteOutlined/></IconButton>
                                    <IconButton onClick={() => {
                                        setDeleteIndex(-1);
                                        setError("");
                                    }}><CancelOutlined/></IconButton>
                                </TableCell>
                                }
                                {editIndex !== index && deleteIndex !== index &&
                                <TableCell>
                                    <IconButton disabled={adding} onClick={() => setEditIndex(index)}>
                                        <EditOutlined/>
                                    </IconButton>
                                    <IconButton disabled={adding} onClick={() => setDeleteIndex(index)}>
                                        <DeleteOutlined/>
                                    </IconButton>
                                </TableCell>
                                }
                                {props.columns.map(column => {
                                    if (editIndex === index) {
                                        return (
                                            <TableCell>
                                                <TextField fullWidth variant="outlined" name={column.accessor}
                                                           value={row[column.accessor]} disabled={processing}
                                                           onChange={e => mutRow[column.accessor] = e.target.value}/>
                                            </TableCell>
                                        );
                                    } else {
                                        return (
                                            <TableCell key={column.title}
                                                       align="left">{row[column.accessor]}</TableCell>
                                        );
                                    }
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={(event, newPage) => {
                    setPage(newPage);
                }}
                onChangeRowsPerPage={(event => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                })}
            />
        </TableContainer>
    );
}
