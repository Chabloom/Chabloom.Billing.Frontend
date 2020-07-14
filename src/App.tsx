import React from 'react';
import './App.css';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Accounts from "./components/Accounts";
import Nav from "./components/Nav";
import Partitions from "./components/Partitions";

const App: React.FC = () => {
    return (
        <Router>
            <Nav>
                <Switch>
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
