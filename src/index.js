import React from 'react';
import ReactDOM from 'react-dom';
import Routers from './routers/index';
import {Provider} from "mobx-react";
import loginStore from "stores/loginStore"
import routeStore from "stores/routeStore"
import permissionStore from "stores/permissionStore"

const stores = {loginStore, routeStore, permissionStore};

ReactDOM.render(
    <Provider {...stores}>
        <Routers/>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
