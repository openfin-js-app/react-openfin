import * as React from "react";

export enum APPLICATION_LAUNCH_BAR_STATUS{
    SWITCH_TO_LAUNCHBAR = 1,
    SWITCH_TO_MAIN_WIN = 2,
}

export interface IApplicationNewSnackbarOption {
    message:string;
    variant?:'primary'|'success'|'warning'|'error'|'info'|'rose';
    vertical?:'top'|'bottom';
    horizontal?:'left'|'right'|'center';
}

export interface IApplicationCloseSnackBarOption {
    event?:React.SyntheticEvent<any>;
    reason:string;
}

export interface ISnackBarMsg extends IApplicationNewSnackbarOption{
    key:number;
}

export interface IReadyPayload {
    targetUrl?:string,
}

export interface IApplicationState {
    offline:boolean,
    username:string,
    computerName:string,
    machineId:string,
    deviceUserId:string,
    loading:boolean,
    loadingMsg:string,
    docked:boolean,
    winTop:number,
    winLeft:number,
    winWidth:number,
    winHeight:number,
    drawerOpen:boolean,
    launchBarCollapse:boolean,
    snackBarOpen:boolean,
    snackBarMsgInfo:Partial<ISnackBarMsg>,
    snackBarMsgQueue:Array<Partial<ISnackBarMsg>>,
    openfinVersion:string,
    openfinHostSpec:any,
    windowsState:string,
}
