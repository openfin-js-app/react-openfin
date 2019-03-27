import * as React from 'react';
import { useContext } from 'react';

import { RootReduxContext } from '../rootRedux/RootReduxContext'

import {
    // types
    I18Language, MuiTheme,
    // actions
    configUpdateOneField,
} from '../reduxs';
import { ConfigContextProvider } from '../reduxs/config/context';


const ConfigCtxProvider:React.FunctionComponent<{}> = (
    { children }
) => {

    const { state, dispatch } = useContext(RootReduxContext);

    // todo: feel like config state app tab obj is not populated correctly, and have to check of n/a over here
    const theme = state.config.application?state.config.application.theme:MuiTheme.DARK;

    return (<React.Fragment>
        <ConfigContextProvider value={{
            config:state.config,
            actions:{
                onUpdateLangField:(value:I18Language)=>{
                    dispatch(configUpdateOneField({
                        name:'application.language',
                        value,
                    }))
                },
                onToggleThemeField: ()=>{
                    dispatch(configUpdateOneField({
                        name:'application.theme',
                        value: theme === MuiTheme.DARK ?MuiTheme.LIGHT:MuiTheme.DARK,
                    }))
                }
            }

        }}>
            {children}
        </ConfigContextProvider>
    </React.Fragment>)

}

export default ConfigCtxProvider;