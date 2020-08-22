import React from "react";

import {
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
    TextField
} from "@material-ui/core";
import {AddCircleOutlined, CancelOutlined, DeleteOutlined, EditOutlined, SaveOutlined} from "@material-ui/icons";
import {Alert, AlertTitle} from "@material-ui/lab";

import {ChabloomTableBackend} from "./TableBackend";
import {ChabloomTableDataType} from "./TableDataType";
import {ChabloomTableProps} from "./TableProps";

export const ChabloomTable: React.FC<ChabloomTableProps> = (props) => {
    const [data, setData] = React.useState([] as Array<ChabloomTableDataType>);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [adding, setAdding] = React.useState(false);
    const [editIndex, setEditIndex] = React.useState(-1);
    const [deleteIndex, setDeleteIndex] = React.useState(-1);
    const [loaded, setLoaded] = React.useState(false);
    const [processing, setProcessing] = React.useState(false);
    const [error, setError] = React.useState("");

    const api = new ChabloomTableBackend(props.baseUrl);
    if (!processing && !loaded) {
        setProcessing(true);
        api.readAll().then(([err, data]) => {
            if (err) {
                setError(err);
            } else {
                setData(data);
                setLoaded(true);
                setProcessing(false);
            }
        });
    }

    return (
        <TableContainer component={Paper}>
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
                            <IconButton
                                disabled={editIndex !== -1 || deleteIndex !== -1}
                                onClick={() => {
                                    setProcessing(true);
                                    setData([{} as ChabloomTableDataType, ...data]);
                                    setEditIndex(0);
                                    setDeleteIndex(-1);
                                    setAdding(true);
                                    setProcessing(false);
                                }}>
                                <AddCircleOutlined/>
                            </IconButton>
                        </TableCell>
                        }
                        {adding &&
                        <TableCell/>
                        }
                        {props.columns.map(column => (
                            <TableCell align="left">{column.title}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => {
                        let mutRow = row as ChabloomTableDataType;
                        return (
                            <TableRow key={row["id"]}>
                                {editIndex === index &&
                                <TableCell>
                                    <IconButton onClick={() => {
                                        setProcessing(true);
                                        if (adding) {
                                            api.add(mutRow).then(err => {
                                                if (err === "") {
                                                    setEditIndex(-1);
                                                    setAdding(false);
                                                    setError("");
                                                } else {
                                                    setError(err);
                                                }
                                            });
                                        } else {
                                            api.edit(mutRow["id"], mutRow).then(err => {
                                                if (err === "") {
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
                                        api.delete(row["id"]).then(err => {
                                            if (err === "") {
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
                                            <TableCell align="left">{row[column.accessor]}</TableCell>
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
