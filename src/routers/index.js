import React, {Component} from 'react';
import {Router} from "react-router-dom"
import {renderRoutes} from "react-router-config"
import {inject, observer} from "mobx-react"
import {history} from "../history"

@inject("routeStore")
@observer
class Routers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <Router history={history}>
                {renderRoutes(this.props.routeStore.routes)}
            </Router>
        );
    }
}

export default Routers;
