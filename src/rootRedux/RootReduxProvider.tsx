import * as React from 'react';
import { useEffect, useMemo } from 'react';

import { createOpenfinMiddleware } from 'redux-openfin';
import { IConfig } from 'redux-openfin/init'

import initState from '../init';

import { REACT_OPENFIN_STATE_FIELD_NAME, REACT_OPENFIN_DISPATCH_FIELD_NAME } from '../GlobalTypes';
import { useEnhancedReducerAndSaga } from '../utils/useEnhancedReducerAndSaga'
import rootReducer, {IRootState, buildInitState} from '../reduxs'
import rootSaga from '../reduxs/sagas'

import { RootReduxContextProvider } from './RootReduxContext'

declare const window:any;

const RootReduxProvider:React.FunctionComponent<{}> = (
    {
        children
    }
)=>{

    const reduxOpenfinMiddleware = useMemo(()=>(
        createOpenfinMiddleware(initState.fin,{
            finUuid: initState.finUuid,
            sharedActions: initState.sharedActions,
            autoDocking: initState.config.enableAutoDocking,
            dockingOptions:initState.dockingOptions,
            libDispatchFieldName:REACT_OPENFIN_DISPATCH_FIELD_NAME
        })
    ),[1]);

    const [state, dispatch] = useEnhancedReducerAndSaga(rootReducer,buildInitState(
        window.name == initState.finUuid ?
            void 0 :
            window.opener[REACT_OPENFIN_STATE_FIELD_NAME]
    ),[
        reduxOpenfinMiddleware
    ],rootSaga,{});

    useEffect(()=>{
        window[REACT_OPENFIN_STATE_FIELD_NAME] = state;
        window[REACT_OPENFIN_DISPATCH_FIELD_NAME] = dispatch;
        return ()=>{
            window[REACT_OPENFIN_STATE_FIELD_NAME] = void 0;
            window[REACT_OPENFIN_DISPATCH_FIELD_NAME] = void 0;
        }
    })

    return(<React.Fragment>
        <RootReduxContextProvider value={{state,dispatch}}>
            { children }
        </RootReduxContextProvider>
    </React.Fragment>)
}

export default RootReduxProvider;