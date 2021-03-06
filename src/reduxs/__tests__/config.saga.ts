import { testSaga,expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers'
import {call, delay, put, select, take, takeEvery, takeLatest,} from 'redux-saga/effects';

import {
    CONFIG_UPDATE_NEW_WINDOW_POSITION,
    configSelectOneFieldRes,
    configDoUpdateOneFieldInDexie,
    configUpdateNewWindowPositionAddDelta,
    configUpdateNewWindowPositionResetLeft,
    configUpdateNewWindowPositionResetTop, CONFIG_SELECT_ONE_FIELD, CONFIG_REMOVE_ONE_FIELD,
} from '..';
import {System, Window} from "redux-openfin";

import {
    // selectors
    getOneConfigField,
    getNewWindowTop,
    getNewWindowLeft,
    getNewWindowWidth,
    getNewWindowHeight,
    // sub sagas
    handleConfigUpdateNewWindowPosition,
    handleConfigLoadFromDexie,
    handleConfigUpdateOneField,
    handleConfigSelectOneField,
    handleConfigRemoveOneField,
    handleConfigUpdateOneFieldInDexie
} from '../sagas/config';

import configSaga from '../sagas/config';
import {
    CONFIG_DO_UPDATE_ONE_FIELD_IN_DEXIE, CONFIG_LOAD_FROM_DEXIE, CONFIG_UPDATE_ONE_FIELD,
    configDoUpdateOneField
} from "..";
import {
    findAllOfCurrentVersion, saveOrUpdateOneByTabNameFieldName, removeOneByTabNameAndFieldName
} from "../../dexies/configDao";

describe('Config saga',()=>{

    describe('handleConfigLoadFromDexie saga',()=>{
        it('it basically works',()=>{

            testSaga(handleConfigLoadFromDexie)
                .next()
                .call(findAllOfCurrentVersion)
                .next([{tabName:'tabName',fieldName:'fieldName',value:'value'}])
                .put(configDoUpdateOneField({
                    tabName:'tabName',fieldName:'fieldName',value:'value'
                }))
                .next()
                .isDone();
        })
    });

    describe('handleConfigUpdateOneField saga',()=>{
        it('it basically works',()=>{

            testSaga(handleConfigUpdateOneField,{payload:{name:'tabName.fieldName',value:'value'}})
                .next()
                // @ts-ignore
                .putResolve(configDoUpdateOneField({
                    tabName:'tabName',fieldName:'fieldName',value:'value'
                }))
                .next()
                .put(configDoUpdateOneFieldInDexie({
                    tabName:'tabName',fieldName:'fieldName',value:'value'
                }))
                .next()
                .isDone();
        })
    });

    describe('handleConfigUpdateOneFieldInDexie saga',()=>{
        it('it basically works',()=>{
            expectSaga(handleConfigUpdateOneFieldInDexie,{payload:{tabName:'tabName',fieldName:'fieldName',value:'value'}})
                .call(saveOrUpdateOneByTabNameFieldName,'tabName','fieldName','value')
                .delay(800)
                .run();
        })
    });

    describe('handleConfigSelectOneField',()=>{

        it('dynamic selector function',()=>{
            const tabName       = 'tabName';
            const fieldName     = 'fieldName';

            const generatedFun = getOneConfigField(tabName,fieldName);

            expect(
                generatedFun({
                    config:{
                        tabName:{
                            fieldName:'value'
                        }
                    }
                })
            ).toMatchSnapshot();

            expect(
                generatedFun({
                    config:{
                        tabName:{
                        }
                    }
                })
            ).toMatchSnapshot();

            expect(
                generatedFun({
                    config:{
                    }
                })
            ).toMatchSnapshot();


        })

        it('with userObj',()=>{
            const tabName       = 'tabName';
            const fieldName     = 'fieldname';
            const userObj       = 'userObj';
            const value         = 'value';

            testSaga(handleConfigSelectOneField,{payload:{ tabName, fieldName, userObj }})
                .next()
                // .select(getOneConfigField(tabName,fieldName))
                .next(value)
                // @ts-ignore
                .putResolve(configSelectOneFieldRes({
                    tabName,fieldName,value,userObj,
                }))
                .next()
                .isDone();
        })

        it('without userObj',()=>{
            const tabName       = 'tabName';
            const fieldName     = 'fieldname';
            const value         = 'value';

            testSaga(handleConfigSelectOneField,{payload:{ tabName, fieldName }})
                .next()
                // .select(getOneConfigField(tabName,fieldName))
                .next(value)
                // @ts-ignore
                .putResolve(configSelectOneFieldRes({
                    tabName,fieldName,value,userObj:null,
                }))
                .next()
                .isDone();
        })
    })

    describe('handleConfigRemoveOneField',()=>{

        it ('with reset value',()=>{
            const tabName       = 'tabName';
            const fieldName     = 'fieldname';
            const value         = 'value';
            testSaga(handleConfigRemoveOneField,{payload:{tabName,fieldName, value}})
                .next()
                .call(removeOneByTabNameAndFieldName,tabName, fieldName)
                .next()
                // @ts-ignore
                .putResolve(configDoUpdateOneField({
                    tabName,fieldName, value
                }))
                .next()
                .isDone();
        })

        it ('without reset value',()=>{
            const tabName       = 'tabName';
            const fieldName     = 'fieldname';
            testSaga(handleConfigRemoveOneField,{payload:{tabName,fieldName}})
                .next()
                .call(removeOneByTabNameAndFieldName,tabName, fieldName)
                .next()
                // @ts-ignore
                .putResolve(configDoUpdateOneField({
                    tabName,fieldName, value:{}
                }))
                .next()
                .isDone();
        })

    })

    describe('handleConfigUpdateNewWindowPosition saga',()=>{
        it('add delta to new win pos',()=>{
            const newWinWidth = 400;
            const newWinHeight = 300;
            const newWinTop = 10;
            const newWinLeft = 10;
            const virtualScreen = {
                top:0, left:0, right:800, bottom:600,
            };
            testSaga(handleConfigUpdateNewWindowPosition)
                .next()
                .select(getNewWindowWidth)
                .next(newWinWidth)
                .select(getNewWindowHeight)
                .next(newWinHeight)
                .select(getNewWindowTop)
                .next(newWinTop)
                .select(getNewWindowLeft)
                .next(newWinLeft)
                .call(System.asyncs.getMonitorInfo,System.actions.getMonitorInfo({}))
                .next({payload:{ virtualScreen }})
                // @ts-ignore
                .putResolve(configUpdateNewWindowPositionAddDelta())
                .next()
                .isDone();
        });
        it('reset left of the new win pos',()=>{
            const newWinWidth = 400;
            const newWinHeight = 300;
            const newWinTop = 10;
            const newWinLeft = 410;
            const virtualScreen = {
                top:0, left:0, right:800, bottom:600,
            };
            testSaga(handleConfigUpdateNewWindowPosition)
                .next()
                .select(getNewWindowWidth)
                .next(newWinWidth)
                .select(getNewWindowHeight)
                .next(newWinHeight)
                .select(getNewWindowTop)
                .next(newWinTop)
                .select(getNewWindowLeft)
                .next(newWinLeft)
                .call(System.asyncs.getMonitorInfo,System.actions.getMonitorInfo({}))
                .next({payload:{ virtualScreen }})
                // @ts-ignore
                .putResolve(configUpdateNewWindowPositionResetLeft())
                .next()
                .isDone();
        });
        it('reset top of the new win pos',()=>{
            const newWinWidth = 400;
            const newWinHeight = 300;
            const newWinTop = 310;
            const newWinLeft = 10;
            const virtualScreen = {
                top:0, left:0, right:800, bottom:600,
            };
            testSaga(handleConfigUpdateNewWindowPosition)
                .next()
                .select(getNewWindowWidth)
                .next(newWinWidth)
                .select(getNewWindowHeight)
                .next(newWinHeight)
                .select(getNewWindowTop)
                .next(newWinTop)
                .select(getNewWindowLeft)
                .next(newWinLeft)
                .call(System.asyncs.getMonitorInfo,System.actions.getMonitorInfo({}))
                .next({payload:{ virtualScreen }})
                // @ts-ignore
                .putResolve(configUpdateNewWindowPositionResetTop())
                .next()
                .isDone();
        });
    });

    it('default function register all event',()=>{
        testSaga(configSaga)
            .next()
            .takeEvery(CONFIG_LOAD_FROM_DEXIE, handleConfigLoadFromDexie)
            .next()
            .takeEvery(CONFIG_UPDATE_ONE_FIELD, handleConfigUpdateOneField)
            .next()
            .takeEvery(CONFIG_SELECT_ONE_FIELD,handleConfigSelectOneField)
            .next()
            .takeEvery(CONFIG_REMOVE_ONE_FIELD,handleConfigRemoveOneField)
            .next()
            .takeLatest(CONFIG_DO_UPDATE_ONE_FIELD_IN_DEXIE, handleConfigUpdateOneFieldInDexie)
            .next()
            .takeLatest(CONFIG_UPDATE_NEW_WINDOW_POSITION,handleConfigUpdateNewWindowPosition)
            .next()
            .isDone();
    })
});
