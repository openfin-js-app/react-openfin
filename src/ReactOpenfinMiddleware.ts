import {
    Store, Middleware, Dispatch, AnyAction,
} from 'redux';

import { isReqAct as isOpenfinReduxReqAct } from 'redux-openfin';
import { SHARED_ACTION_ORIGIN_TAG } from 'redux-openfin/channel';

import initState from './init';

import { isReqAct} from './utils/makeType';

import { REACT_OPENFIN_DISPATCH_FIELD_NAME } from './GlobalTypes';

declare const window:any;

export default function middlewareCreator():Middleware {
    return (
        (store?:Store<any>) => (next: Dispatch<AnyAction>) => (action:any) => {

            if (!initState.clientReduxDispatch){
                initState.clientReduxDispatch = store.dispatch;
            }
            // console.log(`[react-openfin] middleware 0# ${action.type}`, action);
            // client actions
            if (
                (!action[SHARED_ACTION_ORIGIN_TAG]) && (
                    isOpenfinReduxReqAct(action.type) ||
                    isReqAct(action.type)
                )
            ){
                if (window[REACT_OPENFIN_DISPATCH_FIELD_NAME]){
                    // console.log(`[react-openfin] middleware 1# ${action.type}`, action);
                    window[REACT_OPENFIN_DISPATCH_FIELD_NAME](action);
                }
            }else if (
                (!action[SHARED_ACTION_ORIGIN_TAG]) &&
                window[REACT_OPENFIN_DISPATCH_FIELD_NAME] &&
                initState.sharedActionsDict.has(action.type)
            ){
                // console.log(`[react-openfin] middleware 2# ${action.type}`, action);
                window[REACT_OPENFIN_DISPATCH_FIELD_NAME](action);
                return next(action);
            }else{
                return next(action);
            }
        }
    );
}