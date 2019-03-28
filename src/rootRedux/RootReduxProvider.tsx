import * as React from 'react';
import { useEffect, useMemo } from 'react';

import { createOpenfinMiddleware } from 'redux-openfin';
import { IConfig } from 'redux-openfin/init'

import { REACT_OPENFIN_DISPATCH_FIELD_NAME } from '../GlobalTypes';
import { useEnhancedReducerAndSaga } from '../utils/useEnhancedReducerAndSaga'
import rootReducer, {IRootState, buildInitState} from '../reduxs'
import rootSaga from '../reduxs/sagas'

import { RootReduxContextProvider } from './RootReduxContext'

interface IProps {
    fin:any,
    finMiddlewareConfig:IConfig,
}

declare const window:any;

const RootReduxProvider:React.FunctionComponent<IProps> = (
    {
        children,
        fin,finMiddlewareConfig,
    }
)=>{

    const reduxOpenfinMiddleware = useMemo(()=>(
        createOpenfinMiddleware(fin,{
            ...finMiddlewareConfig,
            libDispatchFieldName:REACT_OPENFIN_DISPATCH_FIELD_NAME
        })
    ),[1]);

    const [state, dispatch] = useEnhancedReducerAndSaga(rootReducer,buildInitState(),[
        reduxOpenfinMiddleware
    ],rootSaga,{});

    useEffect(()=>{
        window[REACT_OPENFIN_DISPATCH_FIELD_NAME] = dispatch;
        return ()=>{
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