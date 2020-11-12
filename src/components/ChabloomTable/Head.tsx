import React from "react";

import {
  Fab,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";

import { BaseViewModel } from "../../types";

import { ChabloomTableColumn } from "./Column";

interface Props {
  columns: Array<ChabloomTableColumn>;
  methods: Array<"add" | "edit" | "delete" | "payment" | "paymentSchedule">;
  data: Array<BaseViewModel>;
  setData: CallableFunction;
  adding: boolean;
  setAdding: CallableFunction;
  selectedIndex: number;
  setSelectedIndex: CallableFunction;
  editIndex: number;
  setEditIndex: CallableFunction;
  deleteIndex: number;
  setDeleteIndex: CallableFunction;
  processing: boolean;
  setProcessing: CallableFunction;
}

const useStyles = makeStyles(() => ({
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export const ChabloomTableHead: React.FC<Props> = (props) => {
  const classes = useStyles();

  const [orderBy, setOrderBy] = React.useState("name");
  const [direction, setDirection] = React.useState<"asc" | "desc">("desc");

  const handleRequestSort = (accessor: string) => {
    setOrderBy(accessor);
    setDirection(direction === "asc" ? "desc" : "asc");
    if (direction === "desc") {
      const sortedData = props.data
        .sort((a, b) => a[accessor].localeCompare(b[accessor]))
        .reverse();
      props.setData([...sortedData]);
    } else {
      const sortedData = props.data.sort((a, b) =>
        a[accessor].localeCompare(b[accessor])
      );
      props.setData([...sortedData]);
    }
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell>
          {props.methods.includes("add") && (
            <Fab
              color="primary"
              disabled={
                props.adding ||
                props.processing ||
                props.selectedIndex !== -1 ||
                props.editIndex !== -1 ||
                props.deleteIndex !== -1
              }
              onClick={() => {
                props.setProcessing(true);
                props.setData([{} as BaseViewModel, ...props.data]);
                props.setSelectedIndex(0);
                props.setEditIndex(0);
                props.setDeleteIndex(-1);
                props.setAdding(true);
                props.setProcessing(false);
              }}
            >
              <Add />
            </Fab>
          )}
        </TableCell>
        {props.columns.map((column) => (
          <TableCell key={column.title} align="left">
            <TableSortLabel
              active={orderBy === column.accessor}
              direction={direction}
              onClick={() => handleRequestSort(column.accessor)}
            >
              {column.title}
              {orderBy === column.accessor ? (
                <span className={classes.visuallyHidden}>
                  {direction === "desc"
                    ? "sorted descending"
                    : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
