import {observable, action} from "mobx"

class LoginStore {
    @observable username = localStorage.getItem("username") || "";
    @observable num = 0;
    @observable token = localStorage.getItem("token") || "";

    @action.bound setUsername(val) {
        this.username = val;
    }

    @action.bound setToken(val) {
        this.token = val;
    }


}

export default new LoginStore()