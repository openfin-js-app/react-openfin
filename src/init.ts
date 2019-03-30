import i18n from "i18next";
import {History} from "history";
import {Dispatch, Store} from 'redux'

import {ILaunchBarItem} from "./GlobalTypes";
import {IDockingOptions} from "redux-openfin/docking";
import {IConfigTab} from "./reduxs";

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
}

interface IInitState {
    fin:any,
    finUuid:string,
    sharedActions:string[],
    i18n:typeof i18n,
    hist:History,
    dockingOptions:Partial<IDockingOptions>,
    launchBarItems:ILaunchBarItem[],
    configTabs:IConfigTab[],
    clientReduxDispatch:Dispatch<any>,
    config:IInitStateConfig,
}

const initState:IInitState = {
    fin: void 0,
    finUuid: void '',
    sharedActions:[...reactOpenfinSharedActions],
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
    }
}

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
    initState.sharedActions = [...reactOpenfinSharedActions,...params.sharedActions];

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