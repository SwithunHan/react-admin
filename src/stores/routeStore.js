import {observable, action} from "mobx"

class RouteStore {
    @observable renderTabs = JSON.parse(sessionStorage.getItem("renderTabs")) || [];
    @observable currentRoute = "";

    @action.bound setTabStore(val) {
        this.renderTabs = val;
    }

    @action.bound setCurrentRoute(val) {
        this.currentRoute = val;
    }

}

export default new RouteStore()
