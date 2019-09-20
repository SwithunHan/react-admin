import React, {Component} from 'react'
import {renderRoutes} from "react-router-config";

class Nested extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="Nested">
                {renderRoutes(this.props.route.routes)}
            </div>
        )
    }
}

export default Nested
