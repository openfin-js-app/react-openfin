import { all, takeEvery, select, fork } from 'redux-saga/effects';

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

    const sagas = [applicationSaga(),configSaga()];

    if(process.env.REACT_APP_LOG_ACTION === 'true'){
        sagas.unshift(watchAndLogSaga());
    }

    yield all(sagas);

}