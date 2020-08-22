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
            <Nav userManager={userManager}>
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
                    <Route path="/bills">
                        <Bills userManager={userManager}/>
                    </Route>
                    <Route path="/billSchedules">
                        <BillSchedules userManager={userManager}/>
                    </Route>
                    <Route path="/billTransactions">
                        <BillTransactions userManager={userManager}/>
                    </Route>
                    <Route path="/tenants">
                        <Tenants userManager={userManager}/>
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
