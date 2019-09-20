import React, {Component} from 'react'
import {Layout, Menu} from "antd";
import PropTypes from "prop-types"
import {appRoute} from "../../../routers/routerConfig"
import {renderMenu, searchRouteName} from "../renderMenu"
import "./style.scss"

const {Sider} = Layout;

class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Sider trigger={null} collapsible collapsed={this.props.collapsed} theme={this.props.navTheme}
                   className="sideMenu">
                <div className="logo"/>
                <Menu
                    defaultSelectedKeys={searchRouteName(appRoute.routes, this.props.location.pathname)['name']}
                    defaultOpenKeys={[searchRouteName(appRoute.routes, this.props.location.pathname)['father']]}
                    mode="inline"
                    theme="dark"
                >
                    {
                        renderMenu(appRoute.routes)
                    }
                </Menu>
            </Sider>
        )
    }
}

SideMenu.propTypes = {
    collapsed: PropTypes.bool.isRequired,
    navTheme: PropTypes.string.isRequired,
    // defaultSelectedKeys: PropTypes.array.isRequired
};
export default SideMenu
