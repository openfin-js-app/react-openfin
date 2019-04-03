import {IApplicationState} from './application/types';
import {IConfigState} from './config/types';

import combineReducers from '../utils/combineReducers';

import applicationReducerCreator from './application/reducer';
import { defaultState as applicationDefaultState } from './application/reducer';
import { buildInitState as applicationbBuildInitState } from './application/reducer';
import configReducerCreator from './config/reducer';
import { defaultState as configDefaultState } from './config/reducer';
import { buildInitState as configBuildInitState } from './config/reducer';

export * from './application/actions';
export * from './application/types';
export * from './config/actions';
export * from './config/types';

export interface IRootState {
    application:IApplicationState,
    config:IConfigState,
}

export const rootDefaultState = {
    application:applicationDefaultState,
    config:configDefaultState,
}

export const buildInitState = (parentRootState?:IRootState) => ({
    application:applicationbBuildInitState(parentRootState?parentRootState.application:void 0),
    config:configBuildInitState(parentRootState?parentRootState.config:void 0),
})

export const buildRootReducer = (parentRootState?:IRootState)=>{
    if (parentRootState){
        return combineReducers({
            application:applicationReducerCreator(parentRootState.application),
            config:configReducerCreator(parentRootState.config),
        })
    }else{
        return combineReducers({
            application:applicationReducerCreator(),
            config:configReducerCreator(),
        });
    }
}

export default buildRootReducer;