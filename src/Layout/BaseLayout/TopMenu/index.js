import React, {Component} from 'react'
import {Menu} from "antd";
import {appRoute} from "../../../routers/routerConfig"
import {renderMenu, searchRouteName, setTabs} from "../renderMenu"
import {inject, observer} from "mobx-react"
import permission from "../../../utils/permission";

@inject("routeStore")
@inject("permissionStore")
@observer
class TopMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: searchRouteName(appRoute.routes, this.props.location.pathname)['name'],
        }
    }

    handleClick = e => {
        this.setState({
            current: e.key,
        }, () => this.setTabStore());
    };
    setTabStore = () => {
        this.props.routeStore.setTabStore(setTabs(this.state.current))
    };

    render() {
        const prop = {...this.props};
        delete prop.staticContext;
        return (
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]}
                  mode="horizontal" theme="dark" className={this.props.className}
            >
                {
                    renderMenu(permission(this.props.permissionStore.permission))
                }
            </Menu>
        )
    }
}

export default TopMenu
