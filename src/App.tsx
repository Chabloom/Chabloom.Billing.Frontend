import React from 'react';
import './App.scss';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {UserManager} from "oidc-client";
import {OidcSettings} from "./settings/OidcSettings";

import Nav from "./components/Nav";
import Accounts from "./components/manager/Accounts";
import OidcSignInCallback from "./components/oidc/OidcSignInCallback";
import OidcSignOutCallback from "./components/oidc/OidcSignOutCallback";

const userManager = new UserManager(OidcSettings);

const App: React.FC = () => {
    return (
        <Router>
            <Nav>
                <Switch>
                    <Route exact={true} path="/signin-oidc">
                        <OidcSignInCallback userManager={userManager}/>
                    </Route>
                    <Route exact={true} path="/signout-oidc">
                        <OidcSignOutCallback userManager={userManager}/>
                    </Route>
                    <Route path="/accounts">
                        <Accounts userManager={userManager}/>
                    </Route>
                    <Route path="/">
                        <Accounts userManager={userManager}/>
                    </Route>
                </Switch>
            </Nav>
        </Router>
    );
}

export default App;
