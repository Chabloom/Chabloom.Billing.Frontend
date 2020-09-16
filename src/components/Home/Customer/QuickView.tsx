import React from "react";

import {User} from "oidc-client";

import {
    createStyles,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Theme,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

import {BillsApi} from "../../../api";
import {BillViewModel, TenantViewModel} from "../../../models";

interface Props {
    user: User | undefined;
    tenant: TenantViewModel | undefined;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(2),
        },
        mt1: {
            marginTop: theme.spacing(1),
        }
    }),
);

const QuickBillView: React.FC<{ bills: Array<BillViewModel> }> = (props) => {
    return (
        <TableBody>
            {props.bills.map((bill) => {
                if (new Date(bill.dueDate) < new Date()) {
                    return null;
                }
                return (
                    <TableRow hover key={bill.id}>
                        <TableCell>
                            {bill.name}
                        </TableCell>
                        <TableCell>
                            {`$${bill.amount.toFixed(2)}`}
                        </TableCell>
                        <TableCell>
                            {(new Date(bill.dueDate)).toLocaleDateString()}
                        </TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
    );
}

export const QuickView: React.FC<Props> = (props) => {
    const [bills, setBills] = React.useState([] as Array<BillViewModel>);

    const classes = useStyles();

    React.useEffect(() => {
        if (props.user && !props.user.expired) {
            const api = new BillsApi(null, props.tenant?.id);
            api.readItems(props.user.access_token).then(ret => {
                if (typeof ret !== "string") {
                    setBills(ret);
                }
            });
        }
    }, [props.user, props.tenant]);

    return (
        <Grid item xs={6}>
            <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6">Quick View</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Name
                            </TableCell>
                            <TableCell>
                                Amount
                            </TableCell>
                            <TableCell>
                                Due Date
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <QuickBillView bills={bills}/>
                </Table>
            </Paper>
        </Grid>
    );
}
