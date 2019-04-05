import { call, delay, select, put, putResolve, take, takeLatest, takeEvery } from 'redux-saga/effects';
import { System } from "redux-openfin";

import {
    CONFIG_LOAD_FROM_DEXIE,
    CONFIG_UPDATE_NEW_WINDOW_POSITION,
    CONFIG_UPDATE_ONE_FIELD,
    CONFIG_DO_UPDATE_ONE_FIELD_IN_DEXIE,

    configDoUpdateOneField,
    configDoUpdateOneFieldInDexie,
    configUpdateNewWindowPositionAddDelta,
    configUpdateNewWindowPositionResetLeft,
    configUpdateNewWindowPositionResetTop,

    IConfigDexie,
    IConfigUpdateOneFieldOption
} from '..';

import {
    findAllOfCurrentVersion,saveOrUpdateOneByTabNameFieldName,
} from '../../dexies/configDao';

export const getNewWindowTop = state => state.config.application.newWinTop;
export const getNewWindowLeft = state => state.config.application.newWinLeft;
export const getNewWindowWidth = state => state.config.application.newWinWidth;
export const getNewWindowHeight = state => state.config.application.newWinHeight;

export function* handleConfigLoadFromDexie() {
    const configs : IConfigDexie[] = yield call(findAllOfCurrentVersion);
    for (const config of configs){
        yield put(configDoUpdateOneField({
            tabName:config.tabName,
            fieldName:config.fieldName,
            value:config.value,
        }))
    }
}

export function* handleConfigUpdateOneField(action) {
    const {name,value} = action.payload as IConfigUpdateOneFieldOption;
    const paths = name.split('.');
    if (paths.length === 2){
        yield putResolve(configDoUpdateOneField({
            tabName:paths[0],
            fieldName:paths[1],
            value,
        }));
        yield put(configDoUpdateOneFieldInDexie({
            tabName:paths[0],
            fieldName:paths[1],
            value,
        }))
    }
}

export function* handleConfigUpdateOneFieldInDexie(action) {
    const {tabName, fieldName, value} = action.payload as IConfigDexie;
    yield call(saveOrUpdateOneByTabNameFieldName,tabName,fieldName,value);
    yield delay(800);
}

export function* handleConfigUpdateNewWindowPosition() {
    const newWinWidth = yield select(getNewWindowWidth);
    const newWinHeight = yield select(getNewWindowHeight);
    const newWinTop = yield select(getNewWindowTop);
    const newWinLeft = yield select(getNewWindowLeft);

    const monitorInfoAction = yield call(System.asyncs.getMonitorInfo,System.actions.getMonitorInfo({}));
    const virtualScreen = monitorInfoAction.payload.virtualScreen;

    // console.log("configUpdateNewWindowPosition",monitorInfoAction,virtualScreen);

    if (
        ((newWinLeft+newWinWidth)<virtualScreen.right) &&
        ((newWinTop+newWinHeight)<virtualScreen.bottom)
    ){
        yield putResolve(configUpdateNewWindowPositionAddDelta());
    }else{
        if ((newWinLeft+newWinWidth)>=virtualScreen.right){
            yield putResolve(configUpdateNewWindowPositionResetLeft());
        }
        if ((newWinTop+newWinHeight)>=virtualScreen.bottom){
            yield putResolve(configUpdateNewWindowPositionResetTop());
        }
    }

}

export default function* () {
    yield takeEvery(CONFIG_LOAD_FROM_DEXIE, handleConfigLoadFromDexie);
    yield takeEvery(CONFIG_UPDATE_ONE_FIELD, handleConfigUpdateOneField);
    yield takeLatest(CONFIG_DO_UPDATE_ONE_FIELD_IN_DEXIE, handleConfigUpdateOneFieldInDexie);
    yield takeLatest(CONFIG_UPDATE_NEW_WINDOW_POSITION,handleConfigUpdateNewWindowPosition);
}