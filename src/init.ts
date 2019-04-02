import i18n from "i18next";
import {History} from "history";
import {Dispatch, Store} from 'redux'

import {ILaunchBarItem} from "./GlobalTypes";
import {IDockingOptions} from "redux-openfin/docking";
import { IConfigTab, IReadyPayload } from "./reduxs";

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
    // temp on start on stop payload solution
    readyPayload:IReadyPayload,
}

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
        newWindowDeltaLeft:20,
        newWindowDeltaHeight:20,
        onAppAwaitDelayTime:4000,
        onAppChildAwaitDelayTime:200,
        onAppNotificationAwaitDelayTime:100,
        onAppClosingAwaitDelayTime:200,
    },
    // temp on start on stop payload solution
    readyPayload:void 0,
}

// ---- on start ----
export function onStartReady(readyPayload:IReadyPayload,){
    initState.readyPayload = readyPayload;
}
// ---- on stop ----


// ---- init ----

export interface IInitReactOpenfinParametersObj {
    fin:any,
    finUuid: string,
    sharedActions: string[],

    i18n:typeof i18n,
    hist:History,

    config?:Partial<IInitStateConfig>,

    dockingOptions?:Partial<IDockingOptions>,

    launchBarItems?:ILaunchBarItem[],
    configTabs?:IConfigTab[],

    clientReduxStore?:Store<any>,
}

export const initReactOpenfin = (
    params:IInitReactOpenfinParametersObj
)=>{
    initState.fin           = params.fin;
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