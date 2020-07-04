import React from "react";
import {AccountsApi} from "../../api/apis";
import {AccountViewModel} from "../../api/models";

export const Profile: React.FC = () => {
    const accountId = '16b64388-730d-442c-a516-08d81f94f8b7';

    let [account, setAccount] = React.useState<AccountViewModel>();
    if (account === undefined) {
        // Get the current account information
        const accountsApi = new AccountsApi();
        const req = accountsApi.apiAccountsIdGet({id: accountId});
        req.subscribe({
            next(value) {
                setAccount(value);
            }
        });
    }

    return (
        <div>
            {account?.id}
            {account?.name}
        </div>
    );
}

export default Profile;
