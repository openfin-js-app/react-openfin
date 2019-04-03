import {
    Action, Store, Middleware, Dispatch, AnyAction,
} from 'redux';

import { isReqAct as isOpenfinReduxReqAct } from 'redux-openfin';
import { SHARED_ACTION_ORIGIN_TAG } from 'redux-openfin/channel';

import {
    APPLICATION_READY,
    APPLICATION_CHILD_READY,
    APPLICATION_NOTIFICATION_READY,
} from './reduxs';

import initState, { onStartReady } from './init';

import { isReqAct} from './utils/makeType';

import { REACT_OPENFIN_DISPATCH_FIELD_NAME } from './GlobalTypes';

declare const window:any;

export default function middlewareCreator():Middleware {
    return (
        (store?:Store<any>) => (next: Dispatch<AnyAction>) => (action:any) => {

            console.log(`[react-openfin] middleware ${action.type}`, action);
            // client actions
            if (
                (!action[SHARED_ACTION_ORIGIN_TAG]) && (
                    isOpenfinReduxReqAct(action.type) ||
                    isReqAct(action.type)
                )
            ){
                if (window[REACT_OPENFIN_DISPATCH_FIELD_NAME]){
                    window[REACT_OPENFIN_DISPATCH_FIELD_NAME](action);

                    // hijack the ready actions
                    if (
                        (action.type == APPLICATION_READY) ||
                        (action.type == APPLICATION_CHILD_READY) ||
                        (action.type == APPLICATION_NOTIFICATION_READY)
                    ){
                        onStartReady(action.payload);
                    }

                }
            }else if (
                (!action[SHARED_ACTION_ORIGIN_TAG]) &&
                window[REACT_OPENFIN_DISPATCH_FIELD_NAME] &&
                initState.sharedActionsDict.has(action.type)
            ){
                window[REACT_OPENFIN_DISPATCH_FIELD_NAME](action);
                return next(action);
            }else{
                return next(action);
            }
        }
    );
}