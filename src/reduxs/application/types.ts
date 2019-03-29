import * as React from "react";

export interface IApplicationNewSnackbarOption {
    message:string;
    variant?:'primary'|'success'|'warning'|'error'|'info'|'rose';
}

export interface IApplicationCloseSnackBarOption {
    event?:React.SyntheticEvent<any>;
    reason:string;
}

export interface ISnackBarMsg {
    key:number;
    message:string;
    variant:'primary'|'success'|'warning'|'error'|'info'|'rose';
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
