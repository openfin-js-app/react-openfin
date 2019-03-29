import i18n from "i18next";
import {History} from "history";
import { Dispatch } from 'redux'

import {ILaunchBarItem} from "./GlobalTypes";

interface IInitState {
    i18n:typeof i18n,
    hist:History,
    launchBarItems:ILaunchBarItem[],
    clientReduxDispatch:Dispatch<any>,
}

const initState:IInitState = {
    i18n: void 0,
    hist: void 0,
    launchBarItems: [],
    clientReduxDispatch: void 0,
}

export const setInitState = (
    _i18n:typeof i18n,
    hist:History,
    launchBarItems:ILaunchBarItem[],
    dispatch:Dispatch<any>,
)=>{
    initState.i18n = _i18n;
    initState.hist = hist;
    initState.launchBarItems = launchBarItems;
    initState.clientReduxDispatch = dispatch;

}

export const resetInitState = () => {
    initState.i18n = void 0;
    initState.hist = void 0;
    initState.launchBarItems = [];
}

export default initState;