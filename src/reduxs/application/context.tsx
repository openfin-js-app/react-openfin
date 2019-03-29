import * as React from 'react';
import {WindowOptions} from 'redux-openfin';

import { Omit } from '../../utils/typeHelper';

import { IApplicationState, IApplicationNewSnackbarOption, IReadyPayload } from './types'

interface IWithApplication {
    state:IApplicationState,
    actions:{
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
        onMinimize:()=>void,
        onWinClose:()=>void,
        onWinForceClose:()=>void,
    }
}

export const ApplicationContext = React.createContext<Partial<IWithApplication>|null>(null);

const { Provider, Consumer } = ApplicationContext;

export type WithApplicationContext = IWithApplication;

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
                        (<Component {...props} configContext={value}/>)}
                </ApplicationContextConsumer>
            );}
    };