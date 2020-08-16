import React from "react";
import {Route, RouteProps} from "react-router-dom";

import {AuthConsumer} from "./AuthService";

interface PrivateRouteProps extends RouteProps {
    component: any,
}

const AuthRoute: React.FC<PrivateRouteProps> = ({component, ...rest}) => {
    const renderFn = (Component: React.FC) => (props: Readonly<RouteProps>) => (
        <AuthConsumer>
            {({isAuthenticated, signinRedirect}) => {
                if (!!Component && isAuthenticated()) {
                    return <Component {...props} />;
                } else {
                    signinRedirect();
                    return <span>loading</span>;
                }
            }}
        </AuthConsumer>
    );

    return <Route {...rest} render={renderFn(component)}/>;
};

export default AuthRoute;
