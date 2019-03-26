import * as React from 'react';

import { useEnhancedReducerAndSaga } from '../utils/useEnhancedReducerAndSaga'
import rootReducer, {IRootState, buildInitState} from '../reduxs'
import rootSaga from '../reduxs/sagas'

import { RootReduxContextProvider } from './RootReduxContext'

const RootReduxProvider:React.FunctionComponent<{}> = (
    { children }
)=>{

    const [state, dispatch] = useEnhancedReducerAndSaga(rootReducer,buildInitState(),[],rootSaga,{});

    return(<React.Fragment>
        <RootReduxContextProvider value={{state,dispatch}}>
            { children }
        </RootReduxContextProvider>
    </React.Fragment>)
}

export default RootReduxProvider;