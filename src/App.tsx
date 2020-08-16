import React from 'react';
import './App.css';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Accounts from "./components/manager/Accounts";
import Nav from "./components/Nav";
import AuthCallback from "./components/auth/AuthCallback";
import AuthLogout from "./components/auth/AuthLogout";
import AuthSilentRenew from "./components/auth/AuthSilentRenew";
import AuthLogoutCallback from "./components/auth/AuthLogoutCallback";
import AuthRoute from "./components/auth/AuthRoute";
import {AuthProvider} from "./components/auth/AuthService";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Nav>
                    <Switch>
                        <Route exact={true} path="/signin-oidc" component={AuthCallback}/>
                        <Route exact={true} path="/logout" component={AuthLogout}/>
                        <Route exact={true} path="/logout/callback" component={AuthLogoutCallback}/>
                        <Route exact={true} path="/silentrenew" component={AuthSilentRenew}/>
                        <AuthRoute path="/accounts" component={Accounts}/>
                        <AuthRoute path="/" component={Accounts}/>
                    </Switch>
                </Nav>
            </Router>
        </AuthProvider>
    );
}

export default App;
