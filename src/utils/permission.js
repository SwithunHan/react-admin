import {appRoute} from "../routers/routerConfig"

export default function permission(permission) {
    let result = [];
    appRoute.routes.forEach((item) => {
        if (!item["permission"] || !item.hasOwnProperty("permission")) {
            result.push(item)
        } else {
            if (permission.includes(item.name)) {
                result.push(item)
            }
        }
    });
    return result
}

export function getPermission() {
    return sessionStorage.getItem("permission")
}

export function setPermission(val) {
    return sessionStorage.setItem("permission", val)
}
