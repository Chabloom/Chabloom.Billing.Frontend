import React from "react";

import { TablePagination } from "@material-ui/core";

import { BaseViewModel } from "chabloom-payments-typescript";

interface Props {
    data: Array<BaseViewModel>;
}

export const ChabloomTablePagination: React.FC<Props> = (props) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    return (
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={props.data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={(event, newPage) => {
                setPage(newPage);
            }}
            onChangeRowsPerPage={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
            }}
        />
    );
};
