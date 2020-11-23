import * as React from "react";

import {
  Checkbox,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@material-ui/core";

import { AccountViewModel, BaseViewModel } from "../../types";

import { ChabloomTableColumn } from "./Column";

interface Props {
  columns: Array<ChabloomTableColumn>;
  data: Array<BaseViewModel>;
  selectedIndex: number;
  setSelectedIndex: CallableFunction;
  editIndex: number;
  editItem: BaseViewModel;
  setEditItem: CallableFunction;
  deleteIndex: number;
  processing: boolean;
  setAccount: CallableFunction;
}

export const ChabloomTableBody: React.FC<Props> = (props) => {
  if (props.data === undefined || props.data.length === 0) {
    return null;
  }
  return (
    <TableBody>
      {props.data.map((row, index) => {
        return (
          <TableRow
            hover
            key={row["id"]}
            onClick={() => {
              if (props.selectedIndex === index) {
                if (props.editIndex !== index && props.deleteIndex !== index) {
                  props.setSelectedIndex(-1);
                }
                props.setAccount(undefined);
              } else {
                props.setSelectedIndex(index);
                const account = row as AccountViewModel;
                if (account) {
                  props.setAccount(account);
                }
              }
            }}
            selected={props.selectedIndex === index}
          >
            <TableCell padding="checkbox">
              <Checkbox checked={props.selectedIndex === index} />
            </TableCell>
            {props.columns.map((column) => {
              if (props.editIndex === index) {
                return (
                  <TableCell key={column.accessor}>
                    <TextField
                      variant="outlined"
                      name={column.accessor}
                      defaultValue={props.editItem[column.accessor]}
                      disabled={props.processing}
                      type={column.type}
                      onChange={(e) => {
                        let newItem = props.editItem;
                        if (column.type === "number") {
                          newItem[column.accessor] = parseFloat(e.target.value);
                        } else {
                          newItem[column.accessor] = e.target.value;
                        }
                        props.setEditItem({
                          ...newItem,
                        });
                      }}
                    />
                  </TableCell>
                );
              } else {
                return (
                  <TableCell key={column.accessor} align="left">
                    {column.type === "date"
                      ? new Date(row[column.accessor]).toLocaleDateString()
                      : row[column.accessor]}
                  </TableCell>
                );
              }
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
};
