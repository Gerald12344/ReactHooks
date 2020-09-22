import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Objects from './work/objects'

function Routers() {

    return (
        <div>
            <Router>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/objects">Object Oritentation</Link>
                    </li>
                    <li>
                        <Link to="/topics">Topics</Link>
                    </li>
                </ul>
                <Switch>
                    <Switch>
                        <Route path="/objects">
                            <Objects />
                        </Route>
                        <Route path="/topics">
                        </Route>
                        <Route path="/">
                        </Route>
                    </Switch>
                </Switch>
            </Router>
        </div>
    );
}
export default Routers