import {LIB_REDUX_DISPATCH_FIELD_NAME} from 'redux-openfin';

export const REACT_OPENFIN_STATE_FIELD_NAME ='REACT_OPENFIN_STATE';
export const REACT_OPENFIN_DISPATCH_FIELD_NAME ='REACT_OPENFIN_DISPATCH';

// todo: consider to rename it into redux openfin extAct
export const defaultExtAct = {
    [LIB_REDUX_DISPATCH_FIELD_NAME]:REACT_OPENFIN_DISPATCH_FIELD_NAME,
};

export interface ILaunchBarItem {
    icon:any,
    disabled:boolean,
    svg:string,
    appJson:any,
}