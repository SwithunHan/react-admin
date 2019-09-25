import React, {Component} from 'react'
import {Tabs} from "antd";
import {inject, observer} from "mobx-react"
import {searchRouteInfo, searchRouteName} from "../renderMenu";
import {appRoute} from "../../../routers/routerConfig"

const {TabPane} = Tabs;

@inject("routeStore")
@observer
class TabsCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRoute: searchRouteName(appRoute.routes, this.props.location.pathname)['name']
        }
    }

    tabsHandle = (currentRoute) => {
        this.setState({
            currentRoute
        })
    };

    componentDidMount() {
        this.props.history.listen((route) => {
            this.setState({
                currentRoute: searchRouteName(appRoute.routes, route.pathname)['name']
            })
        })
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    render() {
        let info = "";
        return (
            <Tabs onChange={this.tabsHandle} type="editable-card"
                  activeKey={this.state.currentRoute}
                  className="navTabs">
                {
                    this.props.routeStore.renderTabs.map((item) => {
                        info = {...searchRouteInfo(appRoute.routes, item)};
                        return <TabPane tab={info.title} key={info.name} closable={true}/>
                    })
                }
            </Tabs>
        )
    }
}

export default TabsCard
