import {IApplicationState} from './application/types';
import {IConfigState} from './config/types';

import combineReducers from '../utils/combineReducers';

import application from './application/reducer';
import { defaultState as applicationDefaultState } from './application/reducer';
import { buildInitState as applicationbBuildInitState } from './application/reducer';
import config from './config/reducer';
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
    application:applicationbBuildInitState(parentRootState.application),
    config:configBuildInitState(parentRootState.config),
})

export default combineReducers({
    application,
    config,
})
