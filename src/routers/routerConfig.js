import React from "react";
import {Redirect} from "react-router-dom";
import deepcopy from 'deepcopy';
import BaseLayout from "../Layout/BaseLayout";
import UserLayout from "../Layout/UserLayout";
import Login from "../views/User/Login"
import Registered from "../views/User/Registered"
import Table from "../views/App/Table"
import Form from "../views/App/Form"
import Nested from "../views/App/Nested"
import Menu1 from "../views/App/Nested/Menu1";
import Menu2 from "../views/App/Nested/Menu2";


const NotFound = () => <div>404</div>;

function requireAuth(Layout, props, token) {
    const prop = {...props};
    delete prop.staticContext;
    if (token === "") { // 未登录
        return <Redirect to="/user/login"/>;
    } else {
        return <Layout {...prop} />
    }
}

export function formatRoute(routes) {
    let route = deepcopy(routes);
    if (route.routes) {
        let path = route.routes[0].path;
        route.routes.unshift({
            path: route.path,
            component: (props) => <Redirect to={path} {...props}/>,
            exact: true
        })
    }
    route.routes = route.routes.map(item => {
        if (item.hasOwnProperty("routes")) {
            return formatRoute(item)
        } else {
            return item
        }
    });
    route.routes.push({
        path: "",
        component: () => <Redirect to="/404"/>,
    });
    return route;
}

export const appRoute = {
    path: '/app',
    component: props => (requireAuth(BaseLayout, props, "111")),
    routes: [
        {
            path: '/app/table',
            component: Table,
            name: "table",
            title: "表格",
            icon: "table",
            permission: true
        },
        {
            path: '/app/form',
            component: Form,
            name: "form",
            title: "表单",
            icon: "form",
            permission: true
        },
        {
            path: '/app/nested',
            component: Nested,
            name: "nested",
            title: "一级菜单",
            icon: "appstore",
            routes: [
                {
                    path: "/app/nested/menu1",
                    component: Menu1,
                    name: "menu1",
                    title: "菜单1",
                    icon: "menu"
                },
                {
                    path: "/app/nested/menu2",
                    component: Menu2,
                    name: "menu2",
                    title: "菜单2",
                    icon: "bars"
                },

            ],
            permission: true
        },
        {
            path: '/app/nested1',
            component: Nested,
            name: "nested1",
            title: "一级菜单",
            icon: "appstore",
            routes: [
                {
                    path: "/app/nested1/menu1",
                    component: Menu1,
                    name: "menu11",
                    title: "菜单1",
                    icon: "menu"
                },
                {
                    path: "/app/nested1/menu2",
                    component: Menu2,
                    name: "menu12",
                    title: "菜单2",
                    icon: "bars"
                },

            ],
            permission: true
        },
    ]
};

const userRoute = {
    path: '/user',
    component: UserLayout,
    routes: [
        {
            path: '/user/login',
            component: Login,
            exact: true,
        },
        {
            path: '/user/registered',
            component: Registered,
            exact: true,
        },
    ]
};

export const routerConfig = [
    {
        path: '/',
        component: () => <Redirect to="/app"/>,
        exact: true
    },
    formatRoute(appRoute),
    formatRoute(userRoute),
    {
        path: "/404",
        component: NotFound,
        exact: true
    },
    {
        path: "",
        component: () => <Redirect to="/404"/>,
    }
];

