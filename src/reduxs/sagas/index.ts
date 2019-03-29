import { all, takeEvery, select, fork } from 'redux-saga/effects';

import { isResAct as isReduxOpenfinResAct } from 'redux-openfin';
import { isResAct } from '../../utils/makeType';

import initState from '../../init'

import applicationSaga from './application';
import configSaga from './config';

export function* handleLogAllActions(action) {
    const state = yield select();
    console.log(`${action.type}`,action,'state after',state);
}

export function* handleClientResponseActions(action){

    if (
        initState.clientReduxDispatch &&
        (
            isReduxOpenfinResAct(action.type) ||
            isResAct(action.type)
        )

    ){
        initState.clientReduxDispatch(action);
    }

}

export function* watchAndLogSaga(){
    yield takeEvery('*',handleLogAllActions)
}

export function* resActInterceptor(){
    yield takeEvery('*',handleClientResponseActions)
}

export default function* rootSaga(){

    const sagas = [resActInterceptor(), applicationSaga(),configSaga()];

    if(process.env.REACT_APP_LOG_ACTION === 'true'){
        sagas.unshift(watchAndLogSaga());
    }

    yield all(sagas);

}