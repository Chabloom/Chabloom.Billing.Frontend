import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {User, UserManager} from "oidc-client";

import {OidcSettings} from "./settings";

import {TenantViewModel} from "./models";

import {Accounts, Bills, Home, Nav, Schedules, Tenants, Transactions} from "./components";
import {OidcSignInCallback, OidcSignOutCallback} from "./components/oidc";

import './App.scss';

const userManager = new UserManager(OidcSettings);

export const App: React.FC = () => {
    const [user, setUser] = React.useState<User>();
    const [tenant, setTenant] = React.useState<TenantViewModel>();
    const [allTenants, setAllTenants] = React.useState([] as Array<TenantViewModel>);

    React.useEffect(() => {
        userManager.getUser().then(ret => {
            if (ret && !ret.expired) {
                setUser(ret);
            } else {
                // Attempt silent sign in
                userManager.signinSilent().then(ret => {
                    if (ret && !ret.expired) {
                        setUser(ret);
                    } else {
                        // Redirect to sign in
                        localStorage.setItem("redirectUri", window.location.pathname);
                        userManager.signinRedirect().then();
                    }
                })
            }
        })
    }, []);

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
                        <Accounts user={user} tenant={tenant} userManager={userManager}/>
                    </Route>
                    <Route path="/bills">
                        <Bills user={user} tenant={tenant} userManager={userManager}/>
                    </Route>
                    <Route path="/schedules">
                        <Schedules user={user} tenant={tenant} userManager={userManager}/>
                    </Route>
                    <Route path="/transactions">
                        <Transactions user={user} tenant={tenant} userManager={userManager}/>
                    </Route>
                    <Route path="/tenants">
                        <Tenants user={user} userManager={userManager}/>
                    </Route>
                    <Route path="/">
                        <Home allTenants={allTenants} setAllTenants={setAllTenants}/>
                    </Route>
                </Switch>
            </Nav>
        </Router>
    );
}
