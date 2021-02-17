import * as React from "react";

import { Checkbox, TableBody, TableCell, TableRow } from "@material-ui/core";

import { AccountViewModel, BaseViewModel } from "../../types";

import { ChabloomTableCell } from "./Cell";
import { ChabloomTableColumn } from "./Column";
import { useAppContext } from "../../AppContext";

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
  allowSetAccount: boolean;
}

export const ChabloomTableBody: React.FC<Props> = (props) => {
  const context = useAppContext();

  if (props.data === undefined || props.data.length === 0) {
    return null;
  }

  return (
    <TableBody>
      {props.data.map((row, index) => {
        return (
          <TableRow
            hover
            key={`item-${row["id"]}`}
            onClick={() => {
              if (props.selectedIndex === index) {
                if (props.editIndex !== index && props.deleteIndex !== index) {
                  props.setSelectedIndex(-1);
                }
                if (props.allowSetAccount) {
                  context.setSelectedAccount(undefined);
                }
              } else {
                props.setSelectedIndex(index);
                if (props.allowSetAccount) {
                  const account = row as AccountViewModel;
                  if (account) {
                    context.setSelectedAccount(account);
                  }
                }
              }
            }}
            selected={props.selectedIndex === index}
          >
            <TableCell padding="checkbox">
              <Checkbox checked={props.selectedIndex === index} />
            </TableCell>
            {props.columns.map((column) => (
              <ChabloomTableCell
                {...props}
                column={column}
                row={row}
                editing={props.editIndex === index}
                key={`cell-${column.accessor}`}
              />
            ))}
          </TableRow>
        );
      })}
    </TableBody>
  );
};
