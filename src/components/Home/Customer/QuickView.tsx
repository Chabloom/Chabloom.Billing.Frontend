import React from "react";

import { User } from "oidc-client";

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
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import {
    AccountsApi,
    AccountViewModel,
    BillsApi,
    BillViewModel,
} from "chabloom-payments-typescript";

import { ApplicationConfig } from "../../../settings/config";

interface Props {
    user: User | undefined;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(2),
        },
        mt1: {
            marginTop: theme.spacing(1),
        },
    })
);

const QuickViewTableHead: React.FC = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Due Date</TableCell>
            </TableRow>
        </TableHead>
    );
};

const QuickViewTableBody: React.FC<{ bills: Array<BillViewModel> }> = (
    props
) => {
    return (
        <TableBody>
            {props.bills.map((bill) => {
                if (new Date(bill.dueDate) < new Date()) {
                    return null;
                }
                return (
                    <TableRow hover key={bill.id}>
                        <TableCell>{bill.name}</TableCell>
                        <TableCell>{`$${bill.amount.toFixed(2)}`}</TableCell>
                        <TableCell>
                            {new Date(bill.dueDate).toLocaleDateString()}
                        </TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
    );
};

export const QuickView: React.FC<Props> = (props) => {
    const [accounts, setAccounts] = React.useState(
        [] as Array<AccountViewModel>
    );
    const [bills, setBills] = React.useState([] as Array<BillViewModel>);

    const classes = useStyles();

    React.useEffect(() => {
        if (props.user && !props.user.expired) {
            const api = new AccountsApi(ApplicationConfig);
            api.readItems(props.user.access_token).then((ret) => {
                if (typeof ret !== "string") {
                    setAccounts(ret);
                    ret.forEach((account) => {
                        const api = new BillsApi(ApplicationConfig, account.id);
                        api.readItems(props.user?.access_token).then((ret) => {
                            if (typeof ret !== "string") {
                                setBills((b) => [...b, ...ret]);
                            }
                        });
                    });
                }
            });
        }
    }, [props.user]);

    return (
        <Grid item md={6} xs={12}>
            <Grid container spacing={2}>
                {accounts.map((account) => {
                    const accountBills = bills
                        .filter((x) => x.account === account.id)
                        .filter((x) => new Date(x.dueDate) > new Date());
                    if (accountBills.length !== 0) {
                        return (
                            <Grid item xs={12}>
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography variant="subtitle2">
                                        {account.name}
                                    </Typography>
                                    <Table>
                                        <QuickViewTableHead />
                                        <QuickViewTableBody
                                            bills={accountBills}
                                        />
                                    </Table>
                                </Paper>
                            </Grid>
                        );
                    }
                    return null;
                })}
            </Grid>
        </Grid>
    );
};
