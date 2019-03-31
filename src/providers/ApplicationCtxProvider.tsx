import * as React from 'react';
import { useContext } from 'react';

import { WindowOptions, Window } from "redux-openfin";

import { RootReduxContext } from '../rootRedux/RootReduxContext'
import { IReadyPayload } from '../reduxs';
import { ApplicationContextProvider } from '../reduxs/application/context'
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

const ApplicationCtxProivder:React.FunctionComponent<{}> = (
    { children }
)=>{

    const { state, dispatch } = useContext(RootReduxContext);

    return (<React.Fragment>
        <ApplicationContextProvider value={{
            state: state.application,
            actions:{
                launchNewWin: (appJson:Partial<WindowOptions>)=>{dispatch(applicationLaunchNewWindow(appJson))},
                onSetLoadingMsg:(label:string)=>{dispatch(applicationSetLoadingMsg(label))},
                onApplicationStart:()=>{dispatch(applicationStart())},
                onApplicationReady:(readyConfig:IReadyPayload)=>{dispatch(applicationReady(readyConfig))},
                onChildWinStart:()=>{dispatch(applicationChildStart())},
                onChildWinReady:(readyConfig:IReadyPayload)=>{dispatch(applicationChildReady(readyConfig))},
                onNotificationStart:()=>{dispatch(applicationNotificationStart())},
                onNotificationReady:(readyConfig:IReadyPayload)=>{dispatch(applicationNotificationReady(readyConfig))},
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
            }
        }}>
            {children}
        </ApplicationContextProvider>
    </React.Fragment>)
}

export default ApplicationCtxProivder;