import { all, takeEvery, select, fork } from 'redux-saga/effects';

import initState from '../../init'

import applicationSaga from './application';
import configSaga from './config';

export function* handleLogAllActions(action) {
    const state = yield select();
    console.log(`${action.type}`,action,'state after',state);
}

export function* watchAndLogSaga(){
    yield takeEvery('*',handleLogAllActions)
}

export default function* rootSaga(){

    const sagas = [ applicationSaga(), configSaga() ];

    if(initState.config.logActions){
        sagas.unshift(watchAndLogSaga());
    }

    yield all(sagas);

}