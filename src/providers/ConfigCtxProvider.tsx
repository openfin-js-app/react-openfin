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

    const theme = state.config.application.theme;

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