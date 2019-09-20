import React, {Component} from 'react';
import {Router} from "react-router-dom"
import {history} from "../history"
import {routerConfig} from "./routerConfig"
import {renderRoutes} from "react-router-config"

class Routers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: ""
        }
    }

    render() {
        return (
            <Router history={history}>
                {renderRoutes(routerConfig)}
            </Router>
        );
    }
}

export default Routers;
