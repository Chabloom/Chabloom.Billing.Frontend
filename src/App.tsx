import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {UserManager} from "oidc-client";

import {OidcSettings} from "./settings";

import OidcSignInCallback from "./components/oidc/OidcSignInCallback";
import OidcSignOutCallback from "./components/oidc/OidcSignOutCallback";
import Nav from "./components/Nav";
import Accounts from "./components/Accounts";
import Bills from "./components/Bills";
import BillSchedules from "./components/BillSchedules";
import BillTransactions from "./components/BillTransactions";
import Tenants from "./components/Tenants";

import './App.scss';

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
                        <Accounts/>
                    </Route>
                    <Route path="/bills">
                        <Bills/>
                    </Route>
                    <Route path="/billSchedules">
                        <BillSchedules/>
                    </Route>
                    <Route path="/billTransactions">
                        <BillTransactions/>
                    </Route>
                    <Route path="/tenants">
                        <Tenants/>
                    </Route>
                    <Route path="/">
                        <Accounts/>
                    </Route>
                </Switch>
            </Nav>
        </Router>
    );
}

export default App;
