import * as React from 'react';
import {WindowOptions} from 'redux-openfin';
import { CreateNotificationPayload } from 'redux-openfin/notification/types';

import { Omit } from '../../utils/typeHelper';

import { IApplicationState, IApplicationNewSnackbarOption, IReadyPayload } from './types'

export interface IWithApplicationActions{
    // application
    launchNewWin: (appJson:Partial<WindowOptions>) => void,
    onSetLoadingMsg: (label:string) => void,
    onApplicationStart: () => void,
    onApplicationReady: (readyConfig:IReadyPayload) => void,
    onChildWinStart: () => void,
    onChildWinReady: (readyConfig:IReadyPayload) => void,
    onNotificationStart: () => void,
    onNotificationReady: (readyConfig:IReadyPayload) => void,
    // snackbars
    onNewSnackBar:(newSnackBar:IApplicationNewSnackbarOption)=>void,
    onSnackBarClose:(event: React.SyntheticEvent<any>, reason: string) => void,
    onSnackBarCloseBtnClick:()=>void,
    onSnackBarExited:()=>void,
    // dashboard
    onDrawerToggle:()=>void,
    // launch bar
    onLaunchBarClose:()=>void,
    onLaunchBarToggleCollapse:()=>void,
    onLaunchBarToggle:()=>void,
    // windows
    onSetAsForeground:()=>void,
    onUndock:()=>void,
    onToggleWinState:()=>void,
    onMinimize:()=>void,
    onWinClose:()=>void,
    onWinForceClose:()=>void,
    // notification
    launchNewNotification:(options:CreateNotificationPayload)=>void,
    onNotificationClose:()=>void,
}

export interface IWithApplication {
    state:IApplicationState,
    actions:IWithApplicationActions,
}

export const ApplicationContext = React.createContext<Partial<IWithApplication>|null>(null);

const { Provider, Consumer } = ApplicationContext;

interface IWithApplicationContext {
    applicationContext?:Partial<IWithApplication>
}

export type WithApplicationContext = IWithApplicationContext;

export const ApplicationContextProvider = Provider;
export const ApplicationContextConsumer = Consumer;


export const withApplicationContext:<
    P extends WithApplicationContext
    >(Component: React.ComponentType<P>)=>React.FunctionComponent<Omit<P,WithApplicationContext>> =

    <P extends WithApplicationContext>(Component: React.ComponentType<P>)=> {
        return function ComponentWithConfig(props:Omit<P,WithApplicationContext>){
            return (
                <ApplicationContextConsumer>
                    {value =>
                        // @ts-ignore
                        (<Component {...props} applicationContext={value}/>)}
                </ApplicationContextConsumer>
            );}
    };