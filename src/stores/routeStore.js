import {observable, action} from "mobx"
import {routerConfig, appRoute, formatRoute} from "../routers/routerConfig"
import {Redirect} from "react-router";
import React from "react";
import {getPermission} from "../utils/permission";
import deepcopy from 'deepcopy';

function renderPermissionRoute() {
    let result = deepcopy(routerConfig)
    let permissionRoute = deepcopy(appRoute);
    let routes = [];
    if (getPermission()) {
        result.splice(0, 1, {path: '/', component: () => <Redirect to="/app"/>, exact: true});
        permissionRoute.routes.forEach(function (item) {
            if (JSON.parse(getPermission()).includes(item.name)) {
                routes.push(item)
            }
        })
        permissionRoute.routes = routes;
        result.splice(1, 0, formatRoute(permissionRoute))
    }
    return result
}

class RouteStore {
    @observable renderTabs = JSON.parse(sessionStorage.getItem("renderTabs")) || [];
    @observable currentRoute = "";
    @observable routes = getPermission() ? renderPermissionRoute() : routerConfig;

    @action.bound setTabStore(val) {
        this.renderTabs = val;
    }

    @action.bound setCurrentRoute(val) {
        this.currentRoute = val;
    }

    @action.bound setRoutes() {
        this.routes = renderPermissionRoute()
    }
}

export default new RouteStore()
