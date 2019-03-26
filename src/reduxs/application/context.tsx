import * as React from 'react';
import {WindowOptions} from 'redux-openfin';

import { Omit } from '../../utils/typeHelper';

import { IApplicationState } from './types'

interface IWithApplication {
    state:IApplicationState,
    actions:{
        launchNewWin: (appJson:Partial<WindowOptions>) => void
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