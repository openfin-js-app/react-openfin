import i18n from "i18next";
import {History} from "history";
import {ILaunchBarItem} from "./GlobalTypes";

interface IInitState {
    i18n:typeof i18n,
    hist:History,
    launchBarItems:ILaunchBarItem[],
}

const initState:IInitState = {
    i18n: void 0,
    hist: void 0,
    launchBarItems: [],
}

export const setInitState = (
    _i18n:typeof i18n,
    hist:History,
    launchBarItems:ILaunchBarItem[],
)=>{
    initState.i18n = _i18n;
    initState.hist = hist;
    initState.launchBarItems = launchBarItems;

}

export const resetInitState = () => {
    initState.i18n = void 0;
    initState.hist = void 0;
    initState.launchBarItems = [];
}

export default initState;