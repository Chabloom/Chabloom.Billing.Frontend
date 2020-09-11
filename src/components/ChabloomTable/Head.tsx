import React from "react";

import {Fab, TableCell, TableHead, TableRow} from "@material-ui/core";
import {Add} from "@material-ui/icons";

import {BaseViewModel} from "../../models";

import {ChabloomTableColumn} from "./Column";

interface Props {
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
}

export const ChabloomTableHead: React.FC<Props> = props =>
    <TableHead>
        <TableRow>
            {!props.adding &&
            <TableCell>
                <Fab
                    color="primary"
                    disabled={props.processing || props.editIndex !== -1 || props.deleteIndex !== -1}
                    onClick={() => {
                        props.setProcessing(true);
                        props.setData([{} as BaseViewModel, ...props.data]);
                        props.setEditIndex(0);
                        props.setDeleteIndex(-1);
                        props.setAdding(true);
                        props.setProcessing(false);
                    }}>
                    <Add/>
                </Fab>
            </TableCell>
            }
            {props.adding &&
            <TableCell/>
            }
            {props.columns.map(column => (
                <TableCell key={column.title} align="left">{column.title}</TableCell>
            ))}
        </TableRow>
    </TableHead>
