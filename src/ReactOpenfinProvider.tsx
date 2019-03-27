import * as React from 'react';
import { useEffect } from 'react'

import i18n  from 'i18next';
import {History} from 'history'

import {IDockingOptions} from 'redux-openfin/docking/DockingType'

import {ILaunchBarItem} from './GlobalTypes'
import {setInitState, resetInitState} from './init';

import { IConfigTab } from './reduxs'

import RootReduxProvider from './rootRedux/RootReduxProvider'
import ApplicationCtxProvider from './providers/ApplicationCtxProvider';
import ConfigCtxProvider from './providers/ConfigCtxProvider';

interface IProps {

    fin:any,
    finUuid: string,
    sharedActions: string[],
    enableAutoDocking:boolean,
    dockingOptions?:Partial<IDockingOptions>,

    i18n:typeof i18n,
    hist:History,
    launchBarItems:ILaunchBarItem[],
    configTabs:IConfigTab[],

}

const ReactOpenfinProvider:React.FunctionComponent<IProps> = (
    {
        children,
        fin, finUuid, sharedActions, enableAutoDocking, dockingOptions,
        i18n, hist, launchBarItems, configTabs,

    }
)=>{

    useEffect(()=>{
        setInitState(i18n, hist, launchBarItems, configTabs)
        return () => {
            resetInitState();
        }
    });

    return(<React.Fragment>
        <RootReduxProvider
            fin={fin}
            finMiddlewareConfig={{
                finUuid,
                sharedActions,
                autoDocking:enableAutoDocking,
                dockingOptions,
            }}
        >
            <ApplicationCtxProvider>
                <ConfigCtxProvider>
                    {children}
                </ConfigCtxProvider>
            </ApplicationCtxProvider>
        </RootReduxProvider>
    </React.Fragment>)
}

export default ReactOpenfinProvider;