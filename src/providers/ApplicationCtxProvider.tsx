import * as React from 'react';
import { useContext } from 'react';

import { WindowOptions } from "redux-openfin";

import { RootReduxContext } from '../rootRedux/RootReduxContext'
import { ApplicationContextProvider } from '../reduxs/application/context'
import {
    // types
    IApplicationNewSnackbarOption,
    // actions
    applicationLaunchNewWindow,
    applicationNewSnackbar,
    applicationSetSnackbarStatus,
    applicationProcessSnackbarQueue,
    applicationCloseSnackbar,
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
                onNewSnackBar:(newSnackBar:IApplicationNewSnackbarOption)=>{dispatch(applicationNewSnackbar(newSnackBar))},
                onSnackBarClose:(event: React.SyntheticEvent<any>, reason: string) => {dispatch(applicationCloseSnackbar(event,reason))},
                onSnackBarCloseBtnClick:()=> {dispatch(applicationSetSnackbarStatus(false))},
                onSnackBarExited:()=> {dispatch(applicationProcessSnackbarQueue())},
            }
        }}>
            {children}
        </ApplicationContextProvider>
    </React.Fragment>)
}

export default ApplicationCtxProivder;