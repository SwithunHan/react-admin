import React, {Component} from 'react'
import "./style.scss"
import {renderRoutes} from "react-router-config";

class UserLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="UserLayout">
                {renderRoutes(this.props.route.routes)}
            </div>
        )
    }
}

export default UserLayout