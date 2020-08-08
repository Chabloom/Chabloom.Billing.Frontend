import React from 'react';
import './App.css';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Accounts from "./components/manager/Accounts";
import Nav from "./components/Nav";
import Partitions from "./components/admin/Partitions";
import Account from "./components/customer/Account";

const App: React.FC = () => {
    return (
        <Router>
            <Nav>
                <Switch>
                    <Route path="/account">
                        <Account accountId={"f74d0e69-34c9-41fd-a401-7efcef46ede8"}/>
                    </Route>
                    <Route path="/accounts">
                        <Accounts/>
                    </Route>
                    <Route path="/partitions">
                        <Partitions/>
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
