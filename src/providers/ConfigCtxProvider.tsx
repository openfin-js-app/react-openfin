import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import initState from '../init';

import { REACT_OPENFIN_STORE_CTX } from '../GlobalTypes'

import {
    // types
    IRootState,
    I18Language, MuiTheme,
    // actions
    configUpdateOneField,
    configUpdateGlobalFilterStr,
    configExtendCustState,
} from '../reduxs';

import {buildDefaultConfigState} from '../reduxs/config/reducer';

import { IWithConfig, ConfigContextProvider } from '../reduxs/config/context';

import defaultConfigConstant from '../reduxs/config/constant';

const ConfigCtxProvider:React.FunctionComponent<Partial<IWithConfig>> = (
    {
        children,
        config,
        actions,
    }
) => {

    // todo: consider remove configExtendCustState act if initState works
    useEffect(()=>{
        // console.log('[react-openfin] ConfigCtxProvider:: static useEffect 0#',initState.configTabs);
        if (initState.configTabs && initState.configTabs.length>0){
            const customState = buildDefaultConfigState([ ...defaultConfigConstant, ...initState.configTabs])
            // console.log('[react-openfin] ConfigCtxProvider::static useEffect 1#', customState);
            actions.onExtendCustomState(customState);
        }
    },[]);

    return (<React.Fragment>
        <ConfigContextProvider value={{
            config,
            actions,
        }}>
            {children}
        </ConfigContextProvider>
    </React.Fragment>)

}

export default connect(
    (state:IRootState) => ({
        config: state.config,
        theme: state.config.application.theme,
    }),
    (dispatch)=>({
        onUpdateLangField:(value:I18Language)=>{
            dispatch(configUpdateOneField(
                'application',
                'language',
                value
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
    }),
    (stateProps,actionsProps,ownProps)=>(
        {
            ...ownProps,
            config:stateProps.config,
            actions:{
                ...actionsProps,
                onToggleThemeField: ()=>{
                    actionsProps.onUpdateOneField(
                        'application',
                        'theme',
                        stateProps.theme === MuiTheme.DARK ?MuiTheme.LIGHT:MuiTheme.DARK,
                    )
                },
            }

        }
    ),
    {context:REACT_OPENFIN_STORE_CTX}
)(ConfigCtxProvider);