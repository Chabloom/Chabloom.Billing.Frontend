import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {UserManager} from "oidc-client";

import {OidcSettings} from "./settings";

import {TenantViewModel} from "./models";

import {Accounts, Bills, BillSchedules, BillTransactions, Home, Nav, Tenants} from "./components";
import {OidcSignInCallback, OidcSignOutCallback} from "./components/oidc";

import './App.scss';

const userManager = new UserManager(OidcSettings);

export const App: React.FC = () => {
    const [tenant, setTenant] = React.useState<TenantViewModel>();

    return (
        <Router>
            <Nav tenant={tenant} setTenant={setTenant} userManager={userManager}>
                <Switch>
                    <Route exact={true} path="/signin-oidc">
                        <OidcSignInCallback userManager={userManager}/>
                    </Route>
                    <Route exact={true} path="/signout-oidc">
                        <OidcSignOutCallback userManager={userManager}/>
                    </Route>
                    <Route path="/accounts">
                        <Accounts tenant={tenant} userManager={userManager}/>
                    </Route>
                    <Route path="/bills">
                        <Bills tenant={tenant} userManager={userManager}/>
                    </Route>
                    <Route path="/billSchedules">
                        <BillSchedules tenant={tenant} userManager={userManager}/>
                    </Route>
                    <Route path="/billTransactions">
                        <BillTransactions tenant={tenant} userManager={userManager}/>
                    </Route>
                    <Route path="/tenants">
                        <Tenants userManager={userManager}/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </Nav>
        </Router>
    );
}
