import {GlobalStore} from "@/stores";

export function getToken() {
    const globalStore = GlobalStore();
    return globalStore.token;
}