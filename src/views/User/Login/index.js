import React, {Component} from 'react'
import "./style.scss"
import {inject, observer} from "mobx-react"
import {history} from "../../../history"
import {setPermission} from "../../../utils/permission";

@inject("permissionStore")
@inject("routeStore")
@observer
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        setTimeout(() => {
            setPermission(JSON.stringify(["table", "form"]))
            this.props.routeStore.setRoutes()
            history.push("/app")
        }, 2000)
    }

    render() {
        return (
            <div className="Login">
                登录
            </div>
        )
    }
}

export default Login
