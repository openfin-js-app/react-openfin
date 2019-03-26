import { handleActions, Action } from 'redux-actions';

import {
    CONFIG_RESET,CONFIG_DO_UPDATE_ONE_FIELD,
    CONFIG_UPDATE_GLOBAL_FILTER_STR,

    CONFIG_UPDATE_NEW_WINDOW_POSITION_ADD_DELTA,
    CONFIG_UPDATE_NEW_WINDOW_POSITION_RESET_TOP,
    CONFIG_UPDATE_NEW_WINDOW_POSITION_RESET_LEFT,
} from './actions';
import {
    IConfigTab, IConfigField, FieldType,
    IConfigResetOption, IConfigDoUpdateOneFieldOption, IConfigUpdateGlobalFilterStrOption, IConfigState
} from './types';

import initState from '../../init';
const configTabs = initState.configTabs;

export function buildDefaultConfigState(configTabs: IConfigTab[]):IConfigState{
    const result:IConfigState = {
        configGlobalFilterString:'',
        _tabs:configTabs,
    };
    configTabs.forEach(oneTab =>{
        oneTab._fieldLabels='';
        result[oneTab._name]={};
        oneTab._fields.forEach(oneField =>{
            oneTab._fieldLabels = oneTab._fieldLabels+oneField._label;
            if(oneField._name && (oneField._defaultValue || oneField._defaultValue==="")){
                result[oneTab._name][oneField._name]=oneField._defaultValue;
            }
        })
    });
    return result;
}

export const defaultState:IConfigState = buildDefaultConfigState(configTabs);

export const buildInitState = (parentWindowState?:IConfigState) =>{
    return defaultState;
}

const reducerMap:{[key:string]: (state:IConfigState, action?:Action<any>)=>IConfigState} = {
    [CONFIG_RESET]:(state,action)=>{
        const {tabName} = action.payload as IConfigResetOption;
        if(tabName){
            return {
                ...state,
                tabName:defaultState[tabName],
            }
        }else{
            return defaultState;
        }
    },
    [CONFIG_DO_UPDATE_ONE_FIELD]:(state,action)=>{
        const {tabName, fieldName, value} = action.payload as IConfigDoUpdateOneFieldOption;
        return {
            ...state,
            [tabName]:{
                ...state[tabName],
                [fieldName]:value,
            }
        };
    },
    [CONFIG_UPDATE_GLOBAL_FILTER_STR]:(state,action)=>{
        const { configGlobalFilterString } = action.payload as IConfigUpdateGlobalFilterStrOption;
        return{
            ...state,
            configGlobalFilterString,
        };
    },
    [CONFIG_UPDATE_NEW_WINDOW_POSITION_ADD_DELTA]:(state,action)=>{
        const applicationConfig = state.application;

        return {
            ...state,
            application:{
                ...state.application,
                newWinTop: applicationConfig.newWinTop+ applicationConfig.newWindDeltaHeight,
                newWinLeft: applicationConfig.newWinLeft+ applicationConfig.newWindDeltaLeft,
            }
        };
    },
    [CONFIG_UPDATE_NEW_WINDOW_POSITION_RESET_TOP]:(state,action)=>({
        ...state,
        application:{
            ...state.application,
            newWinTop: parseInt(process.env.REACT_APP_NEW_WINDOW_TOP,10),
        }
    }),
    [CONFIG_UPDATE_NEW_WINDOW_POSITION_RESET_LEFT]:(state,action)=>({
        ...state,
        application:{
            ...state.application,
            newWinLeft: parseInt(process.env.REACT_APP_NEW_WINDOW_LEFT,10),
        }
    }),
}

const reducer = (state:IConfigState, action:Action<any>):IConfigState => {

    if (action.type && reducerMap[action.type]){
        return reducerMap[action.type](state,action);
    }else{
        return state;
    }

}

export default reducer;