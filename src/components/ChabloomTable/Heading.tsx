import * as React from "react";
import { NavLink } from "react-router-dom";

import {
  Alert,
  AlertTitle,
  ButtonGroup,
  IconButton,
  lighten,
  LinearProgress,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Cancel, Delete, Edit, FilterList, Receipt, Save, Schedule } from "@material-ui/icons";

import { BaseViewModel, FullAPIType } from "../../api";

import { ChabloomTableColumn } from "./Column";
import { useAppContext } from "../../AppContext";

interface Props {
  api: FullAPIType<BaseViewModel> | undefined;
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
    theme.palette.mode === "light"
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
  const {
    api,
    methods,
    data,
    setData,
    adding,
    setAdding,
    selectedIndex,
    setSelectedIndex,
    editIndex,
    setEditIndex,
    editItem,
    setEditItem,
    deleteIndex,
    setDeleteIndex,
    setProcessing,
    setError,
  } = props;
  const { userToken } = useAppContext();

  const addItem = async () => {
    setProcessing(true);
    if (api) {
      const success = await api.create(editItem, userToken);
      if (success) {
        const ret = api.data();
        setData([...data.slice(0, selectedIndex), { ...ret }, ...data.slice(selectedIndex + 1)]);
        setSelectedIndex(-1);
        setEditIndex(-1);
        setEditItem({} as BaseViewModel);
        setAdding(false);
        setError("");
      } else {
        setError(api.lastError());
      }
    }
    setProcessing(false);
  };
  const updateItem = async () => {
    setProcessing(true);
    if (api) {
      const success = await api.updateViewModel(editItem, userToken);
      if (success) {
        const ret = api.data();
        setData([...data.slice(0, selectedIndex), { ...ret }, ...data.slice(selectedIndex + 1)]);
        setSelectedIndex(-1);
        setEditIndex(-1);
        setEditItem({} as BaseViewModel);
        setError("");
      } else {
        setError(api.lastError());
      }
    }
    setProcessing(false);
  };
  const deleteItem = async () => {
    setProcessing(true);
    if (api) {
      const success = await api.deleteViewModel(editItem, userToken);
      if (success) {
        setData([...data.slice(0, selectedIndex), ...data.slice(selectedIndex + 1)]);
        setSelectedIndex(-1);
        setDeleteIndex(-1);
      } else {
        setError(api.lastError());
      }
    }
    setProcessing(false);
  };

  if (selectedIndex !== -1) {
    if (editIndex === selectedIndex) {
      return (
        <ButtonGroup>
          <IconButton
            onClick={() => {
              if (adding) {
                addItem().then();
              } else {
                updateItem().then();
              }
            }}
          >
            <Save />
          </IconButton>
          <IconButton
            onClick={() => {
              setProcessing(true);
              if (adding) {
                setData([...data.slice(0, selectedIndex), ...data.slice(selectedIndex + 1)]);
              } else {
                setData([...data]);
              }
              setSelectedIndex(-1);
              setEditIndex(-1);
              setAdding(false);
              setProcessing(false);
              setError("");
            }}
          >
            <Cancel />
          </IconButton>
        </ButtonGroup>
      );
    } else if (deleteIndex === selectedIndex) {
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
              setSelectedIndex(-1);
              setDeleteIndex(-1);
              setError("");
            }}
          >
            <Cancel />
          </IconButton>
        </ButtonGroup>
      );
    } else {
      return (
        <ButtonGroup>
          {methods.includes("payment") && (
            <Tooltip title="Manage account payments">
              <IconButton component={NavLink} to="/payments">
                <Receipt />
              </IconButton>
            </Tooltip>
          )}
          {methods.includes("paymentSchedule") && (
            <Tooltip title="Manage account payment schedules">
              <IconButton component={NavLink} to="/paymentSchedules">
                <Schedule />
              </IconButton>
            </Tooltip>
          )}
          {methods.includes("edit") && (
            <Tooltip title="Edit account">
              <IconButton
                onClick={() => {
                  setEditItem({
                    ...data[selectedIndex],
                  });
                  setEditIndex(selectedIndex);
                }}
              >
                <Edit />
              </IconButton>
            </Tooltip>
          )}
          {methods.includes("delete") && (
            <Tooltip title="Delete account">
              <IconButton onClick={() => setDeleteIndex(selectedIndex)}>
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
  const { title, selectedIndex, processing, error } = props;

  return (
    <div>
      <Toolbar className={selectedIndex === -1 ? classes.root : classes.highlight}>
        {selectedIndex === -1 ? (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            {title}
          </Typography>
        ) : (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            1 selected
          </Typography>
        )}
        <ChabloomTableActionButtons {...props} />
      </Toolbar>
      {processing && <LinearProgress />}
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
    </div>
  );
};
