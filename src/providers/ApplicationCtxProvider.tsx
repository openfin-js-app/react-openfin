import * as React from 'react';
import { connect } from 'react-redux';
import { WindowOptions, Window, Notification } from "redux-openfin";

import { CreateNotificationPayload } from 'redux-openfin/notification/types';

import { REACT_OPENFIN_STORE_CTX } from '../GlobalTypes'
import { IRootState, IReadyPayload } from '../reduxs';
import { IWithApplication, ApplicationContextProvider } from '../reduxs/application/context'
import {
    // types
    IApplicationNewSnackbarOption,
    // actions
    applicationLaunchNewWindow,
    applicationSetLoadingMsg,
    applicationStart,
    applicationReady,
    applicationChildStart,
    applicationChildReady,
    applicationNotificationStart,
    applicationNotificationReady,
    applicationNewSnackbar,
    applicationSetSnackbarStatus,
    applicationProcessSnackbarQueue,
    applicationCloseSnackbar,
    applicationDrawerToggle,
    applicationToggleWindowState,
    applicationLaunchBarClose,
    applicationLaunchBarToggleCollapse,
    applicationLaunchBarToggle,
} from '../reduxs';


const ApplicationCtxProivder:React.FunctionComponent<Partial<IWithApplication>> = (
    {
        children,
        state,
        actions,
    }
)=>{
    return (<React.Fragment>
        <ApplicationContextProvider value={{
            state,
            actions,
        }}>
            {children}
        </ApplicationContextProvider>
    </React.Fragment>)
}

export default connect(
    (state:IRootState) => ({
        state: state.application,
    }),
    (dispatch)=>({
        actions:{
            launchNewWin: (appJson:Partial<WindowOptions>)=>{dispatch(applicationLaunchNewWindow(appJson))},
            onSetLoadingMsg:(label:string)=>{dispatch(applicationSetLoadingMsg(label))},
            onApplicationStart:()=>{dispatch(applicationStart())},
            onApplicationReady:(readyConfig:IReadyPayload)=>{
                dispatch(applicationReady(readyConfig))
            },
            onChildWinStart:()=>{dispatch(applicationChildStart())},
            onChildWinReady:(readyConfig:IReadyPayload)=>{
                dispatch(applicationChildReady(readyConfig))
            },
            onNotificationStart:()=>{dispatch(applicationNotificationStart())},
            onNotificationReady:(readyConfig:IReadyPayload)=>{
                dispatch(applicationNotificationReady(readyConfig))
            },
            onNewSnackBar:(newSnackBar:IApplicationNewSnackbarOption)=>{dispatch(applicationNewSnackbar(newSnackBar))},
            onSnackBarClose:(event: React.SyntheticEvent<any>, reason: string) => {dispatch(applicationCloseSnackbar(event,reason))},
            onSnackBarCloseBtnClick:()=> {dispatch(applicationSetSnackbarStatus(false))},
            onSnackBarExited:()=> {dispatch(applicationProcessSnackbarQueue())},
            onDrawerToggle:()=>{dispatch(applicationDrawerToggle())},
            onLaunchBarClose:()=>{dispatch(applicationLaunchBarClose())},
            onLaunchBarToggleCollapse:()=>{dispatch(applicationLaunchBarToggleCollapse())},
            onLaunchBarToggle:()=>{dispatch(applicationLaunchBarToggle())},
            onSetAsForeground:()=>{dispatch((Window.actions.setAsForeground({})))},
            onUndock:()=>{dispatch((Window.actions.leaveGroup({})))},
            onToggleWinState:()=>{dispatch(applicationToggleWindowState())},
            onMinimize:()=>{dispatch((Window.actions.minimize({})))},
            onWinClose:()=>{dispatch((Window.actions.close({force:false})))},
            onWinForceClose:()=>{dispatch((Window.actions.close({force:true})))},
            launchNewNotification:(options:CreateNotificationPayload)=>{
                dispatch((Notification.actions.createNotification(options)))
            },
            onNotificationClose:()=>{dispatch((Notification.actions.close({})))},
        }
    }),
    null,
    {context:REACT_OPENFIN_STORE_CTX}
)(ApplicationCtxProivder);