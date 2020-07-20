import React from "react";

import {Paper, TextField} from "@material-ui/core";

import {BillsApi} from "../../api/apis";
import {BillViewModel} from "../../api/models";

interface Props {
    billId: string,
}

const Bill: React.FC<Props> = (props) => {
    const [bill, setBill] = React.useState<BillViewModel>();

    // Attempt to load bill until successful
    if (bill === undefined) {
        // Get an instance of bills API
        const billsApi = new BillsApi();
        // Get the customer bill information
        billsApi.apiBillsIdGet({id: props.billId})
            .subscribe({
                next(value) {
                    setBill(value)
                }
            })
    }

    return (
        <Paper>
            <form>
                <TextField disabled label="Amount" value={bill?.amount}/>
                <TextField disabled label="Due Date" value={bill?.dueDate}/>
            </form>
        </Paper>
    );
};

export default Bill;
