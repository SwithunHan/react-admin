import {observable, action} from "mobx"

class PermissionStore {
    @observable permission = JSON.parse(sessionStorage.getItem("permission")) || [];

    @action.bound setPermission(val) {
        this.permission = val
    }
}

export default new PermissionStore()
