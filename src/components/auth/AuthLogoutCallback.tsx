import React from "react";

import {AuthConsumer} from "./AuthService";

const AuthLogoutCallback: React.FC = () => (
    <AuthConsumer>
        {({signoutRedirectCallback}) => {
            signoutRedirectCallback();
            return <span>loading</span>;
        }}
    </AuthConsumer>
);

export default AuthLogoutCallback;
