import React from "react";
import {NavLink} from "react-router-dom";

import {ButtonGroup, IconButton, lighten, LinearProgress, Toolbar, Tooltip, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Cancel, Delete, Edit, FilterList, Payment, Receipt, Save, Schedule} from "@material-ui/icons";
import {Alert, AlertTitle} from "@material-ui/lab";

import {BaseApiType} from "../../api";
import {AccountViewModel, BaseViewModel, TenantViewModel} from "../../models";

import {ChabloomTableColumn} from "./Column";

interface Props {
    title: string,
    tenant: TenantViewModel | undefined,
    api: BaseApiType<BaseViewModel>,
    token: string,
    columns: Array<ChabloomTableColumn>,
    methods: Array<"add" | "edit" | "delete" | "bill" | "schedule" | "transaction">,
    data: Array<BaseViewModel>,
    setData: CallableFunction,
    adding: boolean,
    setAdding: CallableFunction,
    selectedIndex: number,
    setSelectedIndex: CallableFunction,
    editIndex: number,
    setEditIndex: CallableFunction,
    editItem: BaseViewModel,
    setEditItem: CallableFunction,
    deleteIndex: number,
    setDeleteIndex: CallableFunction,
    processing: boolean,
    setProcessing: CallableFunction,
    error: string,
    setError: CallableFunction,
}

const useStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const ChabloomTableActionButtons: React.FC<Props> = props => {
    if (props.selectedIndex !== -1) {
        if (props.editIndex === props.selectedIndex) {
            return (
                <ButtonGroup>
                    <IconButton onClick={() => {
                        props.setProcessing(true);
                        if (props.adding) {
                            props.api.addItem(props.token, props.editItem).then(err => {
                                if (!err) {
                                    props.setData([
                                        ...props.data.slice(0, props.selectedIndex),
                                        {...props.editItem},
                                        ...props.data.slice(props.selectedIndex + 1)
                                    ]);
                                    props.setSelectedIndex(-1);
                                    props.setEditIndex(-1);
                                    props.setAdding(false);
                                    props.setError("");
                                } else {
                                    props.setError(err);
                                }
                            });
                        } else {
                            props.api.editItem(props.token, props.editItem).then(err => {
                                if (!err) {
                                    props.setData([
                                        ...props.data.slice(0, props.selectedIndex),
                                        {...props.editItem},
                                        ...props.data.slice(props.selectedIndex + 1)
                                    ]);
                                    props.setSelectedIndex(-1);
                                    props.setEditIndex(-1);
                                    props.setError("");
                                } else {
                                    props.setError(err);
                                }
                            });
                        }
                        props.setProcessing(false);
                    }}>
                        <Save/>
                    </IconButton>
                    <IconButton onClick={() => {
                        props.setProcessing(true);
                        if (props.adding) {
                            props.setData([
                                ...props.data.slice(0, props.selectedIndex),
                                ...props.data.slice(props.selectedIndex + 1)
                            ]);
                        } else {
                            props.setData([...props.data]);
                        }
                        props.setSelectedIndex(-1);
                        props.setEditIndex(-1);
                        props.setAdding(false);
                        props.setProcessing(false);
                        props.setError("");
                    }}>
                        <Cancel/>
                    </IconButton>
                </ButtonGroup>
            );
        } else if (props.deleteIndex === props.selectedIndex) {
            return (
                <ButtonGroup>
                    <IconButton onClick={() => {
                        props.setProcessing(true);
                        props.api.deleteItem(props.token, props.editItem).then(err => {
                            if (!err) {
                                props.setData([
                                    ...props.data.slice(0, props.selectedIndex),
                                    ...props.data.slice(props.selectedIndex + 1)
                                ]);
                                props.setSelectedIndex(-1);
                                props.setDeleteIndex(-1);
                            } else {
                                props.setError(err);
                            }
                        });
                        props.setProcessing(false);
                    }}><Delete/></IconButton>
                    <IconButton onClick={() => {
                        props.setSelectedIndex(-1);
                        props.setDeleteIndex(-1);
                        props.setError("");
                    }}><Cancel/></IconButton>
                </ButtonGroup>
            );
        } else {
            const account = props.data[props.selectedIndex] as AccountViewModel;
            return (
                <ButtonGroup>
                    {props.methods.includes("bill") &&
                    <Tooltip title="Manage account bills">
                        <IconButton component={NavLink} to={`/bills?account=${account.id}`}>
                            <Receipt/>
                        </IconButton>
                    </Tooltip>
                    }
                    {props.methods.includes("schedule") &&
                    <Tooltip title="Manage account schedules">
                        <IconButton component={NavLink} to={`/schedules?account=${account.id}`}>
                            <Schedule/>
                        </IconButton>
                    </Tooltip>
                    }
                    {props.methods.includes("transaction") &&
                    <Tooltip title="Manage account transactions">
                        <IconButton component={NavLink} to={`/transactions?account=${account.id}`}>
                            <Payment/>
                        </IconButton>
                    </Tooltip>
                    }
                    {props.methods.includes("edit") &&
                    <Tooltip title="Edit account">
                        <IconButton onClick={() => {
                            props.setEditItem({...props.data[props.selectedIndex]});
                            props.setEditIndex(props.selectedIndex);
                        }}>
                            <Edit/>
                        </IconButton>
                    </Tooltip>
                    }
                    {props.methods.includes("delete") &&
                    <Tooltip title="Delete account">
                        <IconButton onClick={() => props.setDeleteIndex(props.selectedIndex)}>
                            <Delete/>
                        </IconButton>
                    </Tooltip>
                    }
                </ButtonGroup>
            );
        }
    }
    return (
        <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
                <FilterList/>
            </IconButton>
        </Tooltip>
    );
}

export const ChabloomTableHeading: React.FC<Props> = props => {
    const classes = useStyles();

    return <div>
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
            <ChabloomTableActionButtons {...props}/>
        </Toolbar>
        {props.processing && <LinearProgress/>}
        {props.error &&
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {props.error}
        </Alert>
        }
    </div>
}
