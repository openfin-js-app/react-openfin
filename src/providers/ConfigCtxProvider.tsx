import * as React from 'react';
import { useContext, useCallback, } from 'react';

import { RootReduxContext } from '../rootRedux/RootReduxContext'

import {
    // types
    I18Language, MuiTheme,
    IConfigTab,
    // actions
    configUpdateOneField,
    configUpdateGlobalFilterStr,
    configExtendCustState,
} from '../reduxs';

import {buildDefaultConfigState} from '../reduxs/config/reducer';

import { ConfigContextProvider } from '../reduxs/config/context';

export interface IProps{
    configTabs?:IConfigTab[],
}

const ConfigCtxProvider:React.FunctionComponent<IProps> = (
    { children, configTabs }
) => {

    const { state, dispatch } = useContext(RootReduxContext);

    // todo: feel like config state app tab obj is not populated correctly, and have to check of n/a over here
    // const theme = state.config.application?state.config.application.theme:MuiTheme.DARK;
    const theme = state.config.application.theme;

    const customStateCb = useCallback(()=>{
        if (configTabs && configTabs.length>0){
            const customState = buildDefaultConfigState(configTabs)
            dispatch(configExtendCustState(customState));
        }
    },[configTabs]);

    return (<React.Fragment>
        <ConfigContextProvider value={{
            config:state.config,
            actions:{
                onUpdateLangField:(value:I18Language)=>{
                    dispatch(configUpdateOneField(
                        'application',
                        'language',
                        value
                    ))
                },
                onToggleThemeField: ()=>{
                    dispatch(configUpdateOneField(
                        'application',
                        'theme',
                        theme === MuiTheme.DARK ?MuiTheme.LIGHT:MuiTheme.DARK,
                    ))
                },
                onUpdateGlobalFilterString:(filterString:string)=>{
                    dispatch(configUpdateGlobalFilterStr(filterString));
                },
                onUpdateOneField:(tabName:string,fieldName:string,value:any)=>{
                    dispatch(configUpdateOneField(
                        tabName,
                        fieldName,
                        value
                    ))
                },
                onExtendCustomState:(customState:any)=>{
                    dispatch(configExtendCustState(customState));
                }
            }

        }}>
            {children}
        </ConfigContextProvider>
    </React.Fragment>)

}

export default ConfigCtxProvider;