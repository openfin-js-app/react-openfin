import i18n from "i18next";
import {History} from "history";
import {ILaunchBarItem} from "./GlobalTypes";
import {IConfigTab} from "./reduxs";

interface IInitState {
    i18n:typeof i18n,
    hist:History,
    launchBarItems:ILaunchBarItem[],
    configTabs:IConfigTab[],
}

const initState:IInitState = {
    i18n: void 0,
    hist: void 0,
    launchBarItems: [],
    configTabs: [],
}

export const setInitState = (
    _i18n:typeof i18n,
    hist:History,
    launchBarItems:ILaunchBarItem[],
    configTabs:IConfigTab[],
)=>{
    initState.i18n = _i18n;
    initState.hist = hist;
    initState.launchBarItems = launchBarItems;
    initState.configTabs = configTabs;

}

export const resetInitState = () => {
    initState.i18n = void 0;
    initState.hist = void 0;
    initState.launchBarItems = [];
    initState.configTabs = [];
}

export default initState;