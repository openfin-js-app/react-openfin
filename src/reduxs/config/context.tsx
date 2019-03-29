import * as React from 'react';

import { Omit } from '../../utils/typeHelper';

import { I18Language, IConfigState } from './types';

interface IWithConfig {
    config:Partial<IConfigState>,
    actions:{
        onToggleThemeField:()=>void,
        onUpdateLangField:(lang:I18Language)=>void,
        onUpdateGlobalFilterString:(filterStr:string)=>void,
        onUpdateOneField:(tabName:string,fieldName:string,value:any)=>void,
        onExtendCustomState:(customState:any)=>void,
    }
}

interface IWithConfigContext {
    configContext?:Partial<IWithConfig>
}

export const ConfigContext = React.createContext<Partial<IWithConfig>|null>(null);

const { Provider, Consumer } = ConfigContext;

export type WithConfigContext = IWithConfigContext;

export const ConfigContextProvider = Provider;
export const ConfigContextConsumer = Consumer;

export const withConfigContext:<
    P extends WithConfigContext
>(Component: React.ComponentType<P>)=>React.FunctionComponent<Omit<P,WithConfigContext>> =

    <P extends WithConfigContext>(Component: React.ComponentType<P>)=> {
        return function ComponentWithConfig(props:Omit<P,WithConfigContext>){
            return (
                <ConfigContextConsumer>
                    {value =>
                        // @ts-ignore
                        (<Component {...props} configContext={value}/>)}
                </ConfigContextConsumer>
            );}
};