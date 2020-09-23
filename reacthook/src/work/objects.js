import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Objects from './objects/Cashregister'

function Routers() {

    return (
        <div>
            <Router>
                <ul>
                    <li>
                        <Link to="/cashregister">Cash Register Object</Link>
                    </li>
                </ul>
                <Switch>
                        <Route path="/cashregister">
                            <Objects />
                        </Route>
                </Switch>
            </Router>
        </div>
    );
}
export default Routers