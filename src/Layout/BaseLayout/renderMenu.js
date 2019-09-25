import {Icon, Menu} from "antd";
import {Link} from "react-router-dom";
import React from "react";

const {SubMenu} = Menu;

export function renderMenu(routes) {
    return routes.map(menu => {
        if (menu.hasOwnProperty("routes")) {
            return (<SubMenu
                key={menu.name}
                title={<span><Icon type={menu.icon}/><span>{menu.title}</span></span>}
            >
                {renderMenu(menu.routes)}
            </SubMenu>)
        } else {
            return (<Menu.Item key={menu.name}>
                <Link to={menu.path}>
                    <Icon type={menu.icon}/>
                    <span>{menu.title}</span>
                </Link>
            </Menu.Item>)
        }
    })
}

export function searchRouteName(route, path) {
    let name = "";
    let father = "";
    route.forEach(menu => {
        if (menu.hasOwnProperty("routes") && name === "") {
            father = menu.name;
            name = searchRouteName(menu.routes, path)['name'];
        } else {
            if (menu.path === path) {
                name = menu.name;
            }
        }
    });
    return {name, father}
}


export function searchRouteInfo(route, name) {
    let result = "";
    route.forEach(menu => {
        if (menu.hasOwnProperty("routes") && result === "") {
            result = searchRouteInfo(menu.routes, name);
        } else {
            if (menu.name === name) {
                result = menu;
            }
        }
    });
    return result
}

export function setTabs(route) {
    let renderTabs = sessionStorage.getItem("renderTabs");
    let temp = null;
    if (renderTabs) {
        temp = JSON.parse(renderTabs);
        temp.push(route);
        temp = [...new Set(temp)];
        renderTabs = JSON.stringify(temp)
    } else {
        renderTabs = JSON.stringify([route])
    }
    sessionStorage.setItem("renderTabs", renderTabs);
    return JSON.parse(renderTabs)
}
