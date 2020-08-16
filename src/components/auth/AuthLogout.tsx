import React from "react";

import {AuthConsumer} from "./AuthService";

const AuthLogout: React.FC = () => (
    <AuthConsumer>
        {({logout}) => {
            logout();
            return <span>loading</span>;
        }}
    </AuthConsumer>
);

export default AuthLogout;
