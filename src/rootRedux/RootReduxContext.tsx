import * as React from 'react';

import { Omit } from '../utils/typeHelper';

interface IWithRootRedux{
    state:any,
    dispatch:any,
}

export const RootReduxContext = React.createContext<IWithRootRedux>({state:{},dispatch:void 0});

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