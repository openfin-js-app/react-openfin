import { all, takeEvery, select, fork } from 'redux-saga/effects';

import initState from '../../init'

import applicationSaga from './application';
import configSaga from './config';
import {isResAct as isReduxOpenfinResAct} from "redux-openfin";
import {isResAct} from "../../utils/makeType";
import {SHARED_ACTION_ORIGIN_TAG} from "redux-openfin/channel";


// logging interceptor
export function* handleLogAllActions(action) {
    const state = yield select();
    console.log(`${action.type}`,action,'state after',state);
}

export function* watchAndLogSaga(){
    yield takeEvery('*',handleLogAllActions)
}

// client redux correspondent

export function* correspondClientReduxAction(action){
    console.log("[react-openfin]::ActCorresSaga 0#",`${action.type}`,action);
    if (
        initState.clientReduxDispatch &&
        (
            isReduxOpenfinResAct(action.type) ||
            isResAct(action.type) ||
            (
                action[SHARED_ACTION_ORIGIN_TAG]
                && action[SHARED_ACTION_ORIGIN_TAG] !== window[SHARED_ACTION_ORIGIN_TAG]
                // do not need to check sharedActionsDict since already has SHARED_ACTION_ORIGIN_TAG field
                // && initState.sharedActionsDict.has(action.type)
            )
        )

    ){
        // console.log("[react-openfin]::ActCorresSaga 1#",`${action.type}`,action);
        initState.clientReduxDispatch(action);
    }
}

export function* clientReduxCorrespondent(){
    yield takeEvery('*',correspondClientReduxAction)
}

export default function* rootSaga(){

    const sagas = [ applicationSaga(), configSaga(), clientReduxCorrespondent() ];

    if(initState.config.logActions){
        sagas.unshift(watchAndLogSaga());
    }

    yield all(sagas);

}