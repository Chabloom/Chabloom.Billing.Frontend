import React from "react";

import {IconButton, TableBody, TableCell, TableRow, TextField} from "@material-ui/core";
import {CancelOutlined, DeleteOutlined, EditOutlined, SaveOutlined} from "@material-ui/icons";

import {BaseApiType} from "../../api";
import {BaseViewModel} from "../../models";

import {ChabloomTableColumn} from "./Column";

interface Props {
    api: BaseApiType<BaseViewModel>,
    token: string,
    columns: Array<ChabloomTableColumn>,
    data: Array<BaseViewModel>,
    setData: CallableFunction,
    adding: boolean,
    setAdding: CallableFunction,
    editIndex: number,
    setEditIndex: CallableFunction,
    deleteIndex: number,
    setDeleteIndex: CallableFunction,
    processing: boolean,
    setProcessing: CallableFunction,
    error: string,
    setError: CallableFunction,
}

export const ChabloomTableBody: React.FC<Props> = props => {
    if (props.data === undefined || props.data.length === 0) {
        return null;
    }
    return <TableBody>
        {props.data.map((row, index) => {
            let mutRow = row as BaseViewModel;
            return (
                <TableRow key={row["id"]}>
                    {props.editIndex === index &&
                    <TableCell>
                        <IconButton onClick={() => {
                            props.setProcessing(true);
                            if (props.adding) {
                                props.api.addItem(props.token, mutRow).then(err => {
                                    if (!err) {
                                        props.setEditIndex(-1);
                                        props.setAdding(false);
                                        props.setError("");
                                    } else {
                                        props.setError(err);
                                    }
                                });
                            } else {
                                props.api.editItem(props.token, mutRow).then(err => {
                                    if (!err) {
                                        props.setEditIndex(-1);
                                        props.setError("");
                                    } else {
                                        props.setError(err);
                                    }
                                });
                            }
                            props.setProcessing(false);
                        }}>
                            <SaveOutlined/>
                        </IconButton>
                        <IconButton onClick={() => {
                            props.setProcessing(true);
                            if (props.adding) {
                                props.setData([...props.data.slice(0, index), ...props.data.slice(index + 1)]);
                            }
                            props.setEditIndex(-1);
                            props.setAdding(false);
                            props.setProcessing(false);
                            props.setError("");
                        }}>
                            <CancelOutlined/>
                        </IconButton>
                    </TableCell>
                    }
                    {props.deleteIndex === index &&
                    <TableCell>
                        <IconButton onClick={() => {
                            props.setProcessing(true);
                            props.api.deleteItem(props.token, mutRow).then(err => {
                                if (!err) {
                                    props.setData([...props.data.slice(0, index), ...props.data.slice(index + 1)]);
                                    props.setDeleteIndex(-1);
                                } else {
                                    props.setError(err);
                                }
                            });
                            props.setProcessing(false);
                        }}><DeleteOutlined/></IconButton>
                        <IconButton onClick={() => {
                            props.setDeleteIndex(-1);
                            props.setError("");
                        }}><CancelOutlined/></IconButton>
                    </TableCell>
                    }
                    {props.editIndex !== index && props.deleteIndex !== index &&
                    <TableCell>
                        <IconButton disabled={props.adding} onClick={() => props.setEditIndex(index)}>
                            <EditOutlined/>
                        </IconButton>
                        <IconButton disabled={props.adding} onClick={() => props.setDeleteIndex(index)}>
                            <DeleteOutlined/>
                        </IconButton>
                    </TableCell>
                    }
                    {props.columns.map(column => {
                        if (props.editIndex === index) {
                            return (
                                <TableCell>
                                    <TextField fullWidth variant="outlined" name={column.accessor}
                                               value={row[column.accessor]} disabled={props.processing}
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
}
