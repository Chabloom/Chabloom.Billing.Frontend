import * as React from "react";
import { NavLink } from "react-router-dom";

import { ButtonGroup, IconButton, lighten, LinearProgress, Toolbar, Tooltip, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Cancel, Delete, Edit, FilterList, Receipt, Save, Schedule } from "@material-ui/icons";
import { Alert, AlertTitle } from "@material-ui/lab";

import { BaseApiType, BaseViewModel } from "../../types";

import { ChabloomTableColumn } from "./Column";
import { useAppContext } from "../../AppContext";

interface Props {
  api: BaseApiType<BaseViewModel> | undefined;
  title: string;
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
  editItem: BaseViewModel;
  setEditItem: CallableFunction;
  deleteIndex: number;
  setDeleteIndex: CallableFunction;
  processing: boolean;
  setProcessing: CallableFunction;
  error: string;
  setError: CallableFunction;
}

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const ChabloomTableActionButtons: React.FC<Props> = (props) => {
  const { userToken } = useAppContext();

  const addItem = async () => {
    props.setProcessing(true);
    if (props.api) {
      const [newItem, err] = await props.api.addItem(userToken, props.editItem);
      if (!err) {
        props.setData([
          ...props.data.slice(0, props.selectedIndex),
          { ...newItem },
          ...props.data.slice(props.selectedIndex + 1),
        ]);
        props.setSelectedIndex(-1);
        props.setEditIndex(-1);
        props.setEditItem({} as BaseViewModel);
        props.setAdding(false);
        props.setError("");
      } else {
        props.setError(err);
      }
    }
    props.setProcessing(false);
  };
  const editItem = async () => {
    props.setProcessing(true);
    if (props.api) {
      const [newItem, err] = await props.api.editItem(userToken, props.editItem);
      if (!err) {
        props.setData([
          ...props.data.slice(0, props.selectedIndex),
          { ...newItem },
          ...props.data.slice(props.selectedIndex + 1),
        ]);
        props.setSelectedIndex(-1);
        props.setEditIndex(-1);
        props.setEditItem({} as BaseViewModel);
        props.setError("");
      } else {
        props.setError(err);
      }
    }
    props.setProcessing(false);
  };
  const deleteItem = async () => {
    props.setProcessing(true);
    if (props.api) {
      const err = await props.api.deleteItem(userToken, props.editItem);
      if (!err) {
        props.setData([...props.data.slice(0, props.selectedIndex), ...props.data.slice(props.selectedIndex + 1)]);
        props.setSelectedIndex(-1);
        props.setDeleteIndex(-1);
      } else {
        props.setError(err);
      }
    }
    props.setProcessing(false);
  };

  if (props.selectedIndex !== -1) {
    if (props.editIndex === props.selectedIndex) {
      return (
        <ButtonGroup>
          <IconButton
            onClick={() => {
              if (props.adding) {
                addItem().then();
              } else {
                editItem().then();
              }
            }}
          >
            <Save />
          </IconButton>
          <IconButton
            onClick={() => {
              props.setProcessing(true);
              if (props.adding) {
                props.setData([
                  ...props.data.slice(0, props.selectedIndex),
                  ...props.data.slice(props.selectedIndex + 1),
                ]);
              } else {
                props.setData([...props.data]);
              }
              props.setSelectedIndex(-1);
              props.setEditIndex(-1);
              props.setAdding(false);
              props.setProcessing(false);
              props.setError("");
            }}
          >
            <Cancel />
          </IconButton>
        </ButtonGroup>
      );
    } else if (props.deleteIndex === props.selectedIndex) {
      return (
        <ButtonGroup>
          <IconButton
            onClick={() => {
              deleteItem().then();
            }}
          >
            <Delete />
          </IconButton>
          <IconButton
            onClick={() => {
              props.setSelectedIndex(-1);
              props.setDeleteIndex(-1);
              props.setError("");
            }}
          >
            <Cancel />
          </IconButton>
        </ButtonGroup>
      );
    } else {
      return (
        <ButtonGroup>
          {props.methods.includes("payment") && (
            <Tooltip title="Manage account payments">
              <IconButton component={NavLink} to="/payments">
                <Receipt />
              </IconButton>
            </Tooltip>
          )}
          {props.methods.includes("paymentSchedule") && (
            <Tooltip title="Manage account payment schedules">
              <IconButton component={NavLink} to="/paymentSchedules">
                <Schedule />
              </IconButton>
            </Tooltip>
          )}
          {props.methods.includes("edit") && (
            <Tooltip title="Edit account">
              <IconButton
                onClick={() => {
                  props.setEditItem({
                    ...props.data[props.selectedIndex],
                  });
                  props.setEditIndex(props.selectedIndex);
                }}
              >
                <Edit />
              </IconButton>
            </Tooltip>
          )}
          {props.methods.includes("delete") && (
            <Tooltip title="Delete account">
              <IconButton onClick={() => props.setDeleteIndex(props.selectedIndex)}>
                <Delete />
              </IconButton>
            </Tooltip>
          )}
        </ButtonGroup>
      );
    }
  }
  return (
    <Tooltip title="Filter list">
      <IconButton aria-label="filter list">
        <FilterList />
      </IconButton>
    </Tooltip>
  );
};

export const ChabloomTableHeading: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Toolbar className={props.selectedIndex === -1 ? classes.root : classes.highlight}>
        {props.selectedIndex === -1 ? (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            {props.title}
          </Typography>
        ) : (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            1 selected
          </Typography>
        )}
        <ChabloomTableActionButtons {...props} />
      </Toolbar>
      {props.processing && <LinearProgress />}
      {props.error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {props.error}
        </Alert>
      )}
    </div>
  );
};
