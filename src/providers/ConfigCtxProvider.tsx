import * as React from 'react';
import {useContext, useCallback, useEffect,} from 'react';

import initState from '../init';

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

import defaultConfigConstant from '../reduxs/config/constant';


const ConfigCtxProvider:React.FunctionComponent<{}> = (
    { children }
) => {

    const { state, dispatch } = useContext(RootReduxContext);

    const theme = state.config.application.theme;

    // todo: consider remove configExtendCustState act if initState works
    useEffect(()=>{
        // console.log('ConfigCtxProvider::useEffect 0#',initState.configTabs);
        if (initState.configTabs && initState.configTabs.length>0){
            const customState = buildDefaultConfigState([ ...defaultConfigConstant, ...initState.configTabs])
            // console.log('ConfigCtxProvider::useEffect 1#', customState);
            dispatch(configExtendCustState(customState));
        }
    },[]);

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