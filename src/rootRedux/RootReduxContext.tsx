import * as React from 'react';

import { Action } from 'redux-actions';

import { Omit } from '../utils/typeHelper';

import { IRootState } from '../reduxs';

interface IWithRootRedux{
    state:IRootState,
    dispatch:(action:Action<any>) => void,
}

export const RootReduxContext = React.createContext<IWithRootRedux>({state: void 0,dispatch:void 0});

const { Provider, Consumer } = RootReduxContext;

export type WithRootReduxContext = IWithRootRedux;

export const RootReduxContextProvider = Provider;
export const RootReduxContextConsumer = Consumer;

export const withRootReduxContext:<P extends WithRootReduxContext>(comp:React.ComponentType<P>)
    => React.FunctionComponent<Omit<P,WithRootReduxContext>> =
    <P extends WithRootReduxContext>(comp:React.ComponentType<P>) => {

        return function compWithRootRedux(props: Omit<P, WithRootReduxContext>){
            return (
                <RootReduxContextConsumer>
                    {
                        value =>
                            // @ts-ignore
                            (<comp {...value} {...props}/>)
                    }
                </RootReduxContextConsumer>
            )
        }


    }