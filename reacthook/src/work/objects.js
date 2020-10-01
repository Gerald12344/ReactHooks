import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
} from "react-router-dom";

import Objects from './objects/Cashregister'
import CreditCard from './objects/creditcard'
import BattleShip from './objects/battleships'
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4001";

function Routers(props) {
    let match = useRouteMatch();

    return (
        <div style={{top:"0"}}>
            <Router>
                <ul>
                    <li>
                        <Link to={`${match.url}/cashregister`}>Cash Register Object</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/creditCardValidator`}>Credit Card Validator</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/BattleShips`}>BattleShips!!!!</Link>
                    </li>
                </ul>
                <Switch>
                        <Route path={`${match.url}/cashregister`}>
                            <Objects />
                        </Route>
                        <Route path={`${match.url}/creditCardValidator`}>
                            <CreditCard />
                        </Route>
                        <Route path={`${match.url}/BattleShips`}>
                            <BattleShip socketIOClient={socketIOClient} ENDPOINT={ENDPOINT}/>
                        </Route>
                </Switch>
            </Router>
        </div>
    );
}
export default Routers