import * as React from 'react';
import {ReactReduxContextValue} from "react-redux";
import { Store } from 'redux';
import {LIB_REDUX_DISPATCH_FIELD_NAME} from 'redux-openfin';

export const REACT_OPENFIN_STORE_CTX = React.createContext<ReactReduxContextValue>(null);
export const REACT_OPENFIN_STORE ='REACT_OPENFIN_STORE';
export const REACT_OPENFIN_DISPATCH_FIELD_NAME ='REACT_OPENFIN_DISPATCH';

// todo: consider to rename it into redux openfin extAct
export const defaultExtAct = {
    [LIB_REDUX_DISPATCH_FIELD_NAME]:REACT_OPENFIN_DISPATCH_FIELD_NAME,
};

export type InitSeed = Store;

export interface ILaunchBarItem {
    icon:any,
    disabled:boolean,
    svg:string,
    appJson:any,
}