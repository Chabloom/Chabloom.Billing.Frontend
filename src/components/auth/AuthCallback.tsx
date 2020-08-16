import React from "react";

import {AuthConsumer} from "./AuthService";

const AuthCallback: React.FC = () => (
    <AuthConsumer>
        {({signinRedirectCallback}) => {
            signinRedirectCallback();
            return <span>loading</span>;
        }}
    </AuthConsumer>
);

export default AuthCallback;
