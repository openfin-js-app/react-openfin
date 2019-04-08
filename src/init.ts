import i18n from "i18next";
import {History} from "history";
import {Dispatch, Store} from 'redux'
import { BrowserAdapter } from 'openfin-browser-adapter';

import {InitSeed, ILaunchBarItem } from "./GlobalTypes";
import {IDockingOptions} from "redux-openfin/docking";
import { IConfigTab } from "./reduxs/config/types";

import reactOpenfinSharedActions from './reduxs/sharedActions';

interface IInitStateConfig{
    logActions:boolean,
    enableLoadingView:boolean,
    enableAutoDocking:boolean,
    defaultViewUrl:string,
    defaultDashboardViewUrl:string,
    defaultDashboardMinWidth:number,
    defaultDashboardMinHeight:number,
    defaultLoadingBannerWidth:number,
    defaultLoadingBannerHeight:number,
    defaultAppHeight:number,
    defaultAppWidth:number,
    newWindowTop:number,
    newWindowLeft:number,
    newWindowWidth:number,
    newWindowHeight:number,
    newWindowDeltaLeft:number,
    newWindowDeltaHeight:number,
    onAppAwaitDelayTime:number,
    onAppChildAwaitDelayTime:number,
    onAppNotificationAwaitDelayTime:number,
    onAppClosingAwaitDelayTime:number,
}

interface IInitState {
    fin:any,
    finUuid:string,
    sharedActions:string[],
    sharedActionsDict:Set<string>,
    i18n:typeof i18n,
    hist:History,
    dockingOptions:Partial<IDockingOptions>,
    launchBarItems:ILaunchBarItem[],
    configTabs:IConfigTab[],
    clientReduxDispatch:Dispatch<any>,
    config:IInitStateConfig,
    seed:InitSeed,
}

declare const window:any;
const initSharedActionsDict:Set<string> = new Set();

reactOpenfinSharedActions.forEach((actionType)=>{
    initSharedActionsDict.add(actionType);
});

const initState:IInitState = {
    fin: void 0,
    finUuid: void '',
    sharedActions:[...reactOpenfinSharedActions],
    sharedActionsDict: initSharedActionsDict,
    i18n: void 0,
    hist: void 0,
    dockingOptions:{},
    launchBarItems: [],
    configTabs:[],
    clientReduxDispatch: void 0,
    config:{
        logActions:false,
        enableLoadingView:true,
        enableAutoDocking:true,
        defaultViewUrl:'/dashboard/view-one',
        defaultDashboardViewUrl:'/dashboard/accessibility',
        defaultDashboardMinWidth:570,
        defaultDashboardMinHeight:300,
        defaultLoadingBannerWidth:728,
        defaultLoadingBannerHeight:450,
        defaultAppHeight:900,
        defaultAppWidth:1400,
        newWindowTop:60,
        newWindowLeft:300,
        newWindowWidth:640,
        newWindowHeight:320,
        newWindowDeltaLeft:40,
        newWindowDeltaHeight:40,
        onAppAwaitDelayTime:4000,
        onAppChildAwaitDelayTime:200,
        onAppNotificationAwaitDelayTime:200,
        onAppClosingAwaitDelayTime:200,
    },
    seed: void 0,
}

// ---- init ----

export interface IInitReactOpenfinParametersObj {
    fin?:any,
    finUuid: string,
    sharedActions?: string[],

    i18n:typeof i18n,
    hist:History,

    config?:Partial<IInitStateConfig>,

    dockingOptions?:Partial<IDockingOptions>,

    launchBarItems?:ILaunchBarItem[],
    configTabs?:IConfigTab[],

    clientReduxStore?:Store<any>,
}

export const InitializeReactOpenfin = (
    params:IInitReactOpenfinParametersObj
)=>{
    if (params.fin){
        window.fin              = params.fin;
        initState.fin           = params.fin;
    }else{
        window.fin = new BrowserAdapter({
            finUuid:params.finUuid,
            silentMode:true,
        });
        initState.fin           = window.fin;

    }
    initState.finUuid       = params.finUuid;

    if (params.sharedActions && params.sharedActions.length > 0){
        initState.sharedActions = [...reactOpenfinSharedActions,...params.sharedActions];
        params.sharedActions.forEach(actionType => {
            initState.sharedActionsDict.add(actionType);
        })
    }

    initState.i18n = params.i18n;
    initState.hist = params.hist;

    if (params.config){
        initState.config = {
            ...initState.config,
            ...params.config,
        }
    }
    if (params.dockingOptions){
        initState.dockingOptions = params.dockingOptions;
    }
    if (params.launchBarItems){
        initState.launchBarItems = params.launchBarItems;
    }
    if (params.configTabs){
        initState.configTabs = params.configTabs.filter( oneConfigTab => oneConfigTab._name !== 'application');
    }
    if (params.clientReduxStore){
        initState.clientReduxDispatch = params.clientReduxStore.dispatch;
    }
}

export default initState;