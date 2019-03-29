import {
    Store, Middleware, Dispatch, AnyAction,
} from 'redux';

import { isReqAct as isOpenfinReduxReqAct } from 'redux-openfin';
import { isReqAct} from './utils/makeType';

import { REACT_OPENFIN_DISPATCH_FIELD_NAME } from './GlobalTypes';

declare const window:any;

export default function middlewareCreator():Middleware {
    return (
        (store?:Store<any>) => (next: Dispatch<AnyAction>) => (action:any) => {
            // client actions
            if (
                isOpenfinReduxReqAct(action) ||
                isReqAct(action)
            ){
                if (window[REACT_OPENFIN_DISPATCH_FIELD_NAME]){
                    window[REACT_OPENFIN_DISPATCH_FIELD_NAME](action);
                }
            }else{
                return next(action);
            }
        }
    );
}