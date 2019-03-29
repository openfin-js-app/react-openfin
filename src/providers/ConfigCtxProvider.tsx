import * as React from 'react';
import { useContext } from 'react';

import { RootReduxContext } from '../rootRedux/RootReduxContext'

import {
    // types
    I18Language, MuiTheme,
    // actions
    configUpdateOneField,
    configUpdateGlobalFilterStr,
    configExtendCustState,
} from '../reduxs';
import { ConfigContextProvider } from '../reduxs/config/context';


const ConfigCtxProvider:React.FunctionComponent<{}> = (
    { children }
) => {

    const { state, dispatch } = useContext(RootReduxContext);

    // todo: feel like config state app tab obj is not populated correctly, and have to check of n/a over here
    // const theme = state.config.application?state.config.application.theme:MuiTheme.DARK;
    const theme = state.config.application.theme;

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