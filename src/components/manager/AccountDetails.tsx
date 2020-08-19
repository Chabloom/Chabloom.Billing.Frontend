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
import {Configuration} from "../../api/runtime";
import {UserManager} from "oidc-client";
import {AuthSettings} from "../auth/AuthService";

interface Props {
    open: boolean,
    account: AccountViewModel,
    close: CallableFunction,
    userManager: UserManager,
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
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button color="primary" disabled={saving} onClick={() => props.close()}>
                    Cancel
                </Button>
                <Button color="primary" disabled={saving} onClick={() => {
                    props.userManager.getUser()
                        .then(value => {
                                // Get an instance of accounts API
                                const headers = {
                                    'Authorization': `Bearer ${value?.access_token}`
                                }
                                const accountsApi = new AccountsApi(new Configuration({headers: headers}));
                                const request = {
                                    id: props.account.id,
                                    accountViewModel: props.account,
                                } as ApiAccountsIdPutRequest;
                                setSaving(true);
                                accountsApi.apiAccountsIdPut(request)
                                    .catch(reason => {
                                        console.log(reason);
                                        setSaving(false);
                                    })
                                    .then(value => props.close())
                                    .finally(() => setSaving(false));
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
