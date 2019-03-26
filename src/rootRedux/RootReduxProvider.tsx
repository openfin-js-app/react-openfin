import * as React from 'react';

import { createOpenfinMiddleware } from 'redux-openfin';
import { IConfig } from 'redux-openfin/init'
import { useEnhancedReducerAndSaga } from '../utils/useEnhancedReducerAndSaga'
import rootReducer, {IRootState, buildInitState} from '../reduxs'
import rootSaga from '../reduxs/sagas'

import { RootReduxContextProvider } from './RootReduxContext'

interface IProps {
    fin:any,
    finMiddlewareConfig:IConfig,
}

const RootReduxProvider:React.FunctionComponent<IProps> = (
    {
        children,
        fin,finMiddlewareConfig,
    }
)=>{

    const [state, dispatch] = useEnhancedReducerAndSaga(rootReducer,buildInitState(),[
        createOpenfinMiddleware(fin,finMiddlewareConfig)
    ],rootSaga,{});

    return(<React.Fragment>
        <RootReduxContextProvider value={{state,dispatch}}>
            { children }
        </RootReduxContextProvider>
    </React.Fragment>)
}

export default RootReduxProvider;