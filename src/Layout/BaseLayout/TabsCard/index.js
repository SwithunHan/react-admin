import React, {Component} from 'react'
import {Tabs} from "antd";

const {TabPane} = Tabs;

class TabsCard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    tabsHandle = (activeKey) => {
        this.setState({
            activeKey
        })
    };

    render() {
        return (
            <Tabs onChange={this.tabsHandle} type="card" defaultActiveKey="1"
                  className="navTabs">
                <TabPane tab="Tab 1" key="1"/>
                <TabPane tab="Tab 2" key="2"/>
                <TabPane tab="Tab 3" key="3"/>
            </Tabs>
        )
    }
}

export default TabsCard
