import React, {Component} from 'react';
import {Router} from "react-router-dom"
import {renderRoutes} from "react-router-config"
import {inject, observer} from "mobx-react"
import {history} from "../history"
import {routerConfig, formatRoute, appRoute} from "./routerConfig"
import permission from "../utils/permission";
import deepcopy from "deepcopy"

@inject("permissionStore")
@observer
class Routers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            routes: ""
        }
    }

    componentDidMount() {
        console.log(this.state.routes)
        setTimeout(() => {
            this.props.permissionStore.setPermission(['form', 'nested']);
            let perRoute = deepcopy(appRoute);
            perRoute.routes = permission(this.props.permissionStore.permission);
            let newRoute = deepcopy(routerConfig);
            newRoute.splice(1, 1, formatRoute(perRoute));
            this.setState({
                routes: newRoute
            })
            console.log(this.state.routes)
        }, 100)
    }

    render() {
        return (
            <Router history={history}>
                {
                    this.state.routes
                        ? renderRoutes(this.state.routes)
                        : "loading"
                }
            </Router>
        );
    }
}

export default Routers;
