import * as React from "react";

import { TableCell, TextField } from "@material-ui/core";

import { BaseViewModel } from "../../common";

import { ChabloomTableColumn } from "./Column";

interface Props {
  column: ChabloomTableColumn;
  row: BaseViewModel;
  editing: boolean;
  editItem: BaseViewModel;
  setEditItem: CallableFunction;
  processing: boolean;
}

const ChabloomTableCellDefault: React.FC<Props> = (props) => {
  return <TableCell align="left">{props.row[props.column.accessor]}</TableCell>;
};

const ChabloomTableCellDate: React.FC<Props> = (props) => {
  const data = props.row[props.column.accessor] as string;
  if (data) {
    return <TableCell align="left">{new Date(data).toLocaleDateString()}</TableCell>;
  } else {
    return <ChabloomTableCellDefault {...props} />;
  }
};

const ChabloomTableCellCurrency: React.FC<Props> = (props) => {
  const data = props.row[props.column.accessor] as string;
  if (data) {
    return <TableCell align="left">{`$${parseFloat(data).toFixed(2)}`}</TableCell>;
  } else {
    return <ChabloomTableCellDefault {...props} />;
  }
};

export const ChabloomTableCell: React.FC<Props> = (props) => {
  if (props.editing) {
    return (
      <TableCell>
        <TextField
          variant="standard"
          name={props.column.accessor}
          defaultValue={props.editItem[props.column.accessor]}
          disabled={props.processing}
          type={props.column.type}
          onChange={(e) => {
            const newItem = props.editItem;
            if (props.column.type === "number") {
              newItem[props.column.accessor] = parseFloat(e.target.value);
            } else {
              newItem[props.column.accessor] = e.target.value;
            }
            props.setEditItem({
              ...newItem,
            });
          }}
        />
      </TableCell>
    );
  } else {
    if (props.column.type === "date") {
      return <ChabloomTableCellDate {...props} />;
    } else if (props.column.type === "currency") {
      return <ChabloomTableCellCurrency {...props} />;
    } else {
      return <ChabloomTableCellDefault {...props} />;
    }
  }
};
