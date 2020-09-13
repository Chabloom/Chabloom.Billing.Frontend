import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {UserManager} from "oidc-client";

import {OidcSettings} from "./settings";

import {TenantViewModel} from "./models";

import {Accounts, Bills, Home, Nav, Schedules, Tenants, Transactions} from "./components";
import {OidcSignInCallback, OidcSignOutCallback} from "./components/oidc";

import './App.scss';

const userManager = new UserManager(OidcSettings);

export const App: React.FC = () => {
    const [tenant, setTenant] = React.useState<TenantViewModel>();
    const [allTenants, setAllTenants] = React.useState([] as Array<TenantViewModel>);

    return (
        <Router>
            <Nav
                tenant={tenant}
                setTenant={setTenant}
                allTenants={allTenants}
                setAllTenants={setAllTenants}
                userManager={userManager}>
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
                    <Route path="/schedules">
                        <Schedules tenant={tenant} userManager={userManager}/>
                    </Route>
                    <Route path="/transactions">
                        <Transactions tenant={tenant} userManager={userManager}/>
                    </Route>
                    <Route path="/tenants">
                        <Tenants userManager={userManager}/>
                    </Route>
                    <Route path="/">
                        <Home allTenants={allTenants} setAllTenants={setAllTenants}/>
                    </Route>
                </Switch>
            </Nav>
        </Router>
    );
}
