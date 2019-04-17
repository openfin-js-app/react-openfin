import {createAction} from 'redux-actions';

import makeType, {makeReqType, makeResType} from '../../utils/makeType'

import {
    IConfigDexie,
    IConfigResetOption,
    IConfigUpdateOneFieldOption,
    IConfigSelectOneFieldOption,
    IConfigSelectOneFieldResPayload,
    IConfigRemoveOneFieldOption,
    IConfigDoUpdateOneFieldOption
} from './types';

export const CONFIG_RESET                           = makeType('CONFIG_RESET');

// redux
export const CONFIG_DO_UPDATE_ONE_FIELD             = makeType('CONFIG_DO_UPDATE_ONE_FIELD');
export const CONFIG_UPDATE_GLOBAL_FILTER_STR        = makeReqType('CONFIG_UPDATE_GLOBAL_FILTER_STR');
export const CONFIG_EXTEND_CUST_STATE               = makeReqType('CONFIG_EXTEND_CUST_STATE');
export const configReset
    = createAction<IConfigResetOption,IConfigResetOption>(CONFIG_RESET, (option:IConfigResetOption)=>(option));
export const configDoUpdateOneField
    = createAction<IConfigDoUpdateOneFieldOption,IConfigDoUpdateOneFieldOption>(CONFIG_DO_UPDATE_ONE_FIELD, (option:IConfigDoUpdateOneFieldOption)=>(option));
export const configUpdateGlobalFilterStr
    = createAction<{configGlobalFilterString:string},string>(CONFIG_UPDATE_GLOBAL_FILTER_STR, (configGlobalFilterString:string)=>({configGlobalFilterString}));
export const configExtendCustState
    = createAction<any,any>(CONFIG_EXTEND_CUST_STATE,(option)=>(option));

// saga
export const CONFIG_LOAD_FROM_DEXIE                 = makeType('CONFIG_LOAD_FROM_DEXIE');
export const configLoadFromDexie
    = createAction<void>(CONFIG_LOAD_FROM_DEXIE);
export const CONFIG_DO_UPDATE_ONE_FIELD_IN_DEXIE    = makeType('CONFIG_DO_UPDATE_ONE_FIELD_IN_DEXIE');
export const configDoUpdateOneFieldInDexie
    = createAction<IConfigDexie,IConfigDexie>(CONFIG_DO_UPDATE_ONE_FIELD_IN_DEXIE, (option:IConfigDexie)=>(option));

export const CONFIG_UPDATE_ONE_FIELD                = makeReqType('CONFIG_UPDATE_ONE_FIELD');
export const configUpdateOneField
    = createAction<IConfigUpdateOneFieldOption,string,string,any>(CONFIG_UPDATE_ONE_FIELD,
    (tabName:string,fieldName:string,value:any)=>({
        name:`${tabName}.${fieldName}`,
        value,
    })
);

export const CONFIG_SELECT_ONE_FIELD                = makeReqType('CONFIG_SELECT_ONE_FIELD');
export const configSelectOneField
    = createAction<IConfigSelectOneFieldOption,IConfigSelectOneFieldOption>(CONFIG_SELECT_ONE_FIELD,(option)=>(option));

export const CONFIG_REMOVE_ONE_FIELD                = makeReqType('CONFIG_REMOVE_ONE_FIELD');
export const configRemoveOneField
    = createAction<IConfigRemoveOneFieldOption,IConfigRemoveOneFieldOption>(CONFIG_REMOVE_ONE_FIELD,
    (option:IConfigRemoveOneFieldOption)=>(option)
);

// response actions
export const CONFIG_SELECT_ONE_FIELD_RES            = makeResType('CONFIG_SELECT_ONE_FIELD_RES');
export const configSelectOneFieldRes
    = createAction<IConfigSelectOneFieldResPayload,IConfigSelectOneFieldResPayload>(CONFIG_SELECT_ONE_FIELD_RES,(option)=>(option));


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