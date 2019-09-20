import React, {Component} from 'react'
import {Menu} from "antd";
import {appRoute} from "../../../routers/routerConfig"
import {renderMenu,searchRouteName} from "../renderMenu"



class TopMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: searchRouteName(appRoute.routes, this.props.location.pathname)['name'],
        }
    }

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    render() {
        return (
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]}
                  mode="horizontal" theme="dark" {...this.props}
            >
                {
                    renderMenu(appRoute.routes)
                }
            </Menu>
        )
    }
}

export default TopMenu
