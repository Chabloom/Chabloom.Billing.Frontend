import React from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    LinearProgress,
    Switch,
    TextField
} from "@material-ui/core";

import {ApiAccountsIdPutRequest, AccountsApi} from "../../api/apis";
import {AccountViewModel} from "../../api/models";

interface Props {
    open: boolean,
    account: AccountViewModel,
    close: CallableFunction,
}

const AccountDetails: React.FC<Props> = (props) => {
    let [saving, setSaving] = React.useState<boolean>(false);

    return (
        <Dialog open={props.open} onClose={() => props.close()}>
            <DialogTitle>{`Account ${props.account.name}`}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    View and change properties for account {props.account.name}
                </DialogContentText>
                <FormGroup>
                    <TextField label={"Id"} defaultValue={props.account.id} disabled={true}/>
                    <TextField label={"Name"} defaultValue={props.account.name}
                               onChange={(event => props.account.name = event.target.value)}/>
                    <TextField label={"Primary Address"} defaultValue={props.account.primaryAddress}
                               onChange={(event => props.account.primaryAddress = event.target.value)}/>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={props.account.enabled}
                                color="primary"
                                onChange={(event => props.account.enabled = event.target.checked)}/>
                        }
                        label="Enabled"/>
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button color="primary" disabled={saving} onClick={() => props.close()}>
                    Cancel
                </Button>
                <Button color="primary" disabled={saving} onClick={() => {
                    const accountsApi = new AccountsApi();
                    const request = {
                        id: props.account.id,
                        accountViewModel: props.account,
                    } as ApiAccountsIdPutRequest;
                    setSaving(true);
                    accountsApi.apiAccountsIdPut(request)
                        .subscribe({
                            error(err) {
                                console.log(err);
                                setSaving(false);
                            },
                            complete() {
                                props.close();
                                setSaving(false);
                            },
                        });
                }} autoFocus>
                    Save
                </Button>
            </DialogActions>
            {saving && <LinearProgress/>}
        </Dialog>
    );
}

export default AccountDetails;
