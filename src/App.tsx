import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { User, UserManager } from "oidc-client";

import {
    ApplicationUsersApi,
    TenantsApi,
    TenantUsersApi,
    TenantViewModel,
} from "chabloom-payments-typescript";

import { AppConfig, OidcSettings } from "./settings";

import {
    AccountRoles,
    Accounts,
    AccountUsers,
    ApplicationRoles,
    ApplicationUsers,
    Bills,
    Home,
    Navigation,
    Schedules,
    TenantRoles,
    Tenants,
    TenantUsers,
    Transactions,
} from "./components";
import { OidcSignInCallback, OidcSignOutCallback } from "./components/oidc";

import "./App.scss";

const userManager = new UserManager(OidcSettings);

export const App: React.FC = () => {
    const [user, setUser] = React.useState<User>();
    const [userLevel, setUserLevel] = React.useState<
        "admin" | "manager" | undefined
    >();
    const [admin, setAdmin] = React.useState(false);
    const [manager, setManager] = React.useState(false);
    const [tenant, setTenant] = React.useState<TenantViewModel>();
    const [allTenants, setAllTenants] = React.useState(
        [] as Array<TenantViewModel>
    );

    // Check if the user is signed in
    React.useEffect(() => {
        const signedIn = localStorage.getItem("SignedIn");
        if (signedIn !== "true") {
            console.debug("user not logged in");
            return;
        }
        console.debug("updating user");
        userManager.getUser().then((ret) => {
            if (ret && !ret.expired) {
                console.debug("user valid");
                setUser(ret);
            } else {
                // Attempt silent sign in
                userManager
                    .signinSilent()
                    .then((ret) => {
                        if (ret && !ret.expired) {
                            console.debug("got silent user");
                            setUser(ret);
                        } else {
                            // Redirect to sign in
                            console.debug("redirecting to sign in");
                            localStorage.setItem(
                                "redirectUri",
                                window.location.pathname
                            );
                            userManager.signinRedirect().then();
                        }
                    })
                    .catch((reason) => console.debug(reason));
            }
        });
    }, []);
    // Get the user's administrative level
    React.useEffect(() => {
        if (user && !user.expired) {
            const api = new ApplicationUsersApi(AppConfig);
            api.readItem(user.access_token, user.profile.sub).then((ret) => {
                if (typeof ret !== "string") {
                    setUserLevel("admin");
                } else {
                    const tenantUsersApi = new TenantUsersApi(AppConfig);
                    tenantUsersApi
                        .readItem(user.access_token, user.profile.sub)
                        .then((ret) => {
                            if (typeof ret !== "string") {
                                setUserLevel("manager");
                            }
                        });
                }
            });
        }
    }, [user]);
    // Get all available tenants
    React.useEffect(() => {
        const api = new TenantsApi(AppConfig);
        api.readItems("")
            .then((result) => {
                if (typeof result !== "string") {
                    try {
                        result = result.sort((a, b) =>
                            a.name.localeCompare(b.name)
                        );
                        setAllTenants(result);
                    } catch {
                        console.log("item read failed");
                    }
                }
            })
            .catch((e) => console.log(e.message));
    }, []);

    return (
        <Router>
            <Navigation
                user={user}
                userManager={userManager}
                userLevel={userLevel}
                tenant={tenant}
                setTenant={setTenant}
                allTenants={allTenants}
                admin={admin}
                setAdmin={setAdmin}
                manager={manager}
                setManager={setManager}
            >
                <Switch>
                    <Route exact={true} path="/signin-oidc">
                        <OidcSignInCallback userManager={userManager} />
                    </Route>
                    <Route exact={true} path="/signout-oidc">
                        <OidcSignOutCallback userManager={userManager} />
                    </Route>
                    <Route path="/accounts">
                        <Accounts user={user} tenant={tenant} />
                    </Route>
                    {user && (
                        <Route path="/accountRoles">
                            <AccountRoles user={user} tenant={tenant} />
                        </Route>
                    )}
                    {user && (
                        <Route path="/accountUsers">
                            <AccountUsers user={user} tenant={tenant} />
                        </Route>
                    )}
                    <Route path="/bills">
                        <Bills user={user} tenant={tenant} />
                    </Route>
                    <Route path="/schedules">
                        <Schedules user={user} tenant={tenant} />
                    </Route>
                    <Route path="/transactions">
                        <Transactions user={user} tenant={tenant} />
                    </Route>
                    <Route path="/tenants">
                        <Tenants user={user} />
                    </Route>
                    {user && tenant && (
                        <Route path="/tenantRoles">
                            <TenantRoles user={user} tenant={tenant} />
                        </Route>
                    )}
                    {user && tenant && (
                        <Route path="/tenantUsers">
                            <TenantUsers user={user} tenant={tenant} />
                        </Route>
                    )}
                    {user && (
                        <Route path="/applicationRoles">
                            <ApplicationRoles user={user} />
                        </Route>
                    )}
                    {user && (
                        <Route path="/applicationUsers">
                            <ApplicationUsers user={user} />
                        </Route>
                    )}
                    <Route path="/">
                        <Home
                            user={user}
                            allTenants={allTenants}
                            admin={admin}
                            manager={manager}
                        />
                    </Route>
                </Switch>
            </Navigation>
        </Router>
    );
};
