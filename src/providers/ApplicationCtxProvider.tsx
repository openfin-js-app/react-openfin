import * as React from 'react';
import { useContext } from 'react';

import { RootReduxContext } from '../rootRedux/RootReduxContext'
import { applicationLaunchNewWindow } from '../reduxs';
import { ApplicationContextProvider } from '../reduxs/application/context'
import { WindowOptions } from "redux-openfin";

const ApplicationCtxProivder:React.FunctionComponent<{}> = (
    { children }
)=>{

    const { state, dispatch } = useContext(RootReduxContext);

    return (<React.Fragment>
        <ApplicationContextProvider value={{
            state: state.application,
            actions:{
                launchNewWin: (appJson:Partial<WindowOptions>)=>{dispatch(applicationLaunchNewWindow(appJson))}
            }
        }}>
            {children}
        </ApplicationContextProvider>
    </React.Fragment>)
}