import React from "react";

import {AuthConsumer} from "./AuthService";

const AuthSilentRenew: React.FC = () => (
    <AuthConsumer>
        {({ signinSilentCallback }) => {
            signinSilentCallback();
            return <span>loading</span>;
        }}
    </AuthConsumer>
);

export default AuthSilentRenew;
