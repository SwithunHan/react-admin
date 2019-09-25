import React, {Component} from "react"
import {Layout, Icon} from 'antd';
import {renderRoutes} from "react-router-config";
import {inject, observer} from "mobx-react"
import "./style.scss"
import defaultSetting from "../../config/defaultSetting"
import SideMenu from "./SideMenu";
import {appRoute} from "../../routers/routerConfig"
import {Route} from "react-router-dom";
import TopMenu from "./TopMenu";
import TabsCard from "./TabsCard";

const {Header, Content} = Layout;

function searchRouteName(route, path) {
    let name = "";
    let father = ""
    route.forEach(menu => {
        if (menu.hasOwnProperty("routes")) {
            if (name === "") {
                father = menu.name;
                name = searchRouteName(menu.routes, path)['name']
            }
        } else {
            if (menu.path === path) {
                name = menu.name
            }
        }
    });
    return {name, father}
}

@inject("routeStore")
@observer
class BaseLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            layout: defaultSetting.layout,
            navTheme: defaultSetting.navTheme,
            activeKey: 1,
            showTabs: defaultSetting.showTabs,
            currentRoute: [searchRouteName(appRoute.routes, this.props.location.pathname)['name']],
            openMenu: [searchRouteName(appRoute.routes, this.props.location.pathname)['father']]
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout id="baseLayout">
                {

                    <Layout>
                        {this.state.layout === "sidemenu" &&
                        <Route render={(props) => <SideMenu collapsed={this.state.collapsed}
                                                            navTheme={this.state.navTheme} {...props}/>}/>}
                        <Layout>
                            {
                                this.state.layout === "sidemenu"
                                    ? <Header style={{background: '#fff', padding: 0, marginBottom: '20px'}}>
                                        <Icon
                                            className="trigger"
                                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                            onClick={this.toggle}
                                        />
                                    </Header>
                                    : <Header className="top-header">
                                        <div className="top-logo"/>
                                        <Route render={(props) => <TopMenu className="topMenu" {...props}/>}/>
                                    </Header>
                            }
                            {
                                this.state.showTabs ? <Route render={(props) => <TabsCard {...props}/>}/> : ""
                            }
                            <Content className="content">
                                {renderRoutes(this.props.route.routes)}
                            </Content>
                        </Layout>
                    </Layout>
                }
            </Layout>
        );
    }
}

export default BaseLayout
