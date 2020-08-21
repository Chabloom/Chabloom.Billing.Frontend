import React, {PropsWithChildren} from "react";

import {CellProps, Column, HeaderProps, TableOptions, useTable} from 'react-table'

import MaUTable from '@material-ui/core/Table'
import {IconButton, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {AddCircleOutlined, CancelOutlined, DeleteOutlined, EditOutlined, SaveOutlined} from "@material-ui/icons";

interface Props<T extends object> {
    columns: Array<Column<T>>,
    data: T[],
}

const ChabloomTable = <T extends object, >(props: PropsWithChildren<Props<T>>) => {
    const [adding, setAdding] = React.useState<boolean>(false);
    const [editId, setEditId] = React.useState<number>(-1);
    const [deleteId, setDeleteId] = React.useState<number>(-1);

    const options = {
        columns: props.columns,
        data: props.data,
    } as TableOptions<T>;

    const table = useTable<T>(options, hooks => {
        hooks.visibleColumns.push(columns => [
            {
                id: 'actions',
                Header: (x: HeaderProps<T>) => {
                    return (
                        <IconButton onClick={() => {
                            setAdding(true);
                            setEditId(-1);
                            setDeleteId(-1);
                        }}><AddCircleOutlined/></IconButton>
                    );
                },
                // The cell can use the individual row's getToggleRowSelectedProps method
                // to the render a checkbox
                Cell: (x: CellProps<T>) => {
                    const rowId = parseInt(x.row.id);
                    if (rowId === editId) {
                        return (
                            <div>
                                <IconButton disabled={adding} onClick={() => setEditId(-1)}>
                                    <SaveOutlined/>
                                </IconButton>
                                <IconButton disabled={adding} onClick={() => setEditId(-1)}>
                                    <CancelOutlined/>
                                </IconButton>
                            </div>
                        );
                    } else if (rowId === deleteId) {
                        return (
                            <div>
                                <IconButton disabled={adding} onClick={() => setDeleteId(-1)}>
                                    <SaveOutlined/>
                                </IconButton>
                                <IconButton disabled={adding} onClick={() => setDeleteId(-1)}>
                                    <CancelOutlined/>
                                </IconButton>
                            </div>
                        );
                    } else {
                        return (
                            <div>
                                <IconButton disabled={adding} onClick={() => setEditId(rowId)}>
                                    <EditOutlined/>
                                </IconButton>
                                <IconButton disabled={adding} onClick={() => setDeleteId(rowId)}>
                                    <DeleteOutlined/>
                                </IconButton>
                            </div>
                        );
                    }
                },
            },
            ...columns,
        ])
    });
    return (
        <MaUTable {...table.getTableProps()}>
            <TableHead>
                {table.headerGroups.map(headerGroup => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <TableCell {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableHead>
            <TableBody>
                {table.rows.map((row, i) => {
                    table.prepareRow(row)
                    return (
                        <TableRow {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <TableCell {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    )
                })}
            </TableBody>
        </MaUTable>
    );
}

export default ChabloomTable;
