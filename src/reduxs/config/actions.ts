import {createAction, ActionFunctionAny, Action} from 'redux-actions';

import makeType, {makeResType, makeReqType} from '../../utils/makeType'

import {
    IConfigDexie,
    IConfigResetOption,
    IConfigUpdateOneFieldOption,
    IConfigUpdateGlobalFilterStrOption,
    IConfigDoUpdateOneFieldOption
} from './types';

export const CONFIG_RESET                           = makeType('CONFIG_RESET');

// redux
export const CONFIG_DO_UPDATE_ONE_FIELD             = makeType('CONFIG_DO_UPDATE_ONE_FIELD');
export const CONFIG_UPDATE_GLOBAL_FILTER_STR        = makeType('CONFIG_UPDATE_GLOBAL_FILTER_STR');
export const configReset
    = createAction<IConfigResetOption,IConfigResetOption>(CONFIG_RESET, (option:IConfigResetOption)=>(option));
export const configDoUpdateOneField
    = createAction<IConfigDoUpdateOneFieldOption,IConfigDoUpdateOneFieldOption>(CONFIG_DO_UPDATE_ONE_FIELD, (option:IConfigDoUpdateOneFieldOption)=>(option));
export const configUpdateGlobalFilterStr
    = createAction<IConfigUpdateGlobalFilterStrOption,IConfigUpdateGlobalFilterStrOption>(CONFIG_UPDATE_GLOBAL_FILTER_STR, (option:IConfigUpdateGlobalFilterStrOption)=>(option));

// saga
export const CONFIG_LOAD_FROM_DEXIE                 = makeType('CONFIG_LOAD_FROM_DEXIE');
export const configLoadFromDexie
    = createAction<void>(CONFIG_LOAD_FROM_DEXIE);
export const CONFIG_DO_UPDATE_ONE_FIELD_IN_DEXIE    = makeType('CONFIG_DO_UPDATE_ONE_FIELD_IN_DEXIE');
export const configDoUpdateOneFieldInDexie
    = createAction<IConfigDexie,IConfigDexie>(CONFIG_DO_UPDATE_ONE_FIELD_IN_DEXIE, (option:IConfigDexie)=>(option));

export const CONFIG_UPDATE_ONE_FIELD                = makeType('CONFIG_UPDATE_ONE_FIELD');
export const configUpdateOneField
    = createAction<IConfigUpdateOneFieldOption,IConfigUpdateOneFieldOption>(CONFIG_UPDATE_ONE_FIELD, (option:IConfigUpdateOneFieldOption)=>(option));



// optional actions depending on the config application values

export const CONFIG_UPDATE_NEW_WINDOW_POSITION              = makeType('CONFIG_UPDATE_NEW_WINDOW_POSITION');
export const CONFIG_UPDATE_NEW_WINDOW_POSITION_ADD_DELTA    = makeType('CONFIG_UPDATE_NEW_WINDOW_POSITION_ADD_DELTA');
export const CONFIG_UPDATE_NEW_WINDOW_POSITION_RESET_TOP    = makeType('CONFIG_UPDATE_NEW_WINDOW_POSITION_RESET_TOP');
export const CONFIG_UPDATE_NEW_WINDOW_POSITION_RESET_LEFT   = makeType('CONFIG_UPDATE_NEW_WINDOW_POSITION_RESET_LEFT');
export const configUpdateNewWindowPosition
    = createAction<void>(CONFIG_UPDATE_NEW_WINDOW_POSITION);
export const configUpdateNewWindowPositionAddDelta
    = createAction<void>(CONFIG_UPDATE_NEW_WINDOW_POSITION_ADD_DELTA);
export const configUpdateNewWindowPositionResetTop
    = createAction<void>(CONFIG_UPDATE_NEW_WINDOW_POSITION_RESET_TOP);
export const configUpdateNewWindowPositionResetLeft
    = createAction<void>(CONFIG_UPDATE_NEW_WINDOW_POSITION_RESET_LEFT);