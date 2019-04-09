import { testSaga } from 'redux-saga-test-plan';
import {all, put, select, take, takeLatest,} from 'redux-saga/effects';

import initState from '../../init';

import applicationSaga from '../sagas/application';
import configSaga from '../sagas/config';

import rootSaga from '../sagas';
import { watchAndLogSaga, handleLogAllActions, clientReduxCorrespondent } from '../sagas';


describe('Root saga',()=>{

    it('Default watchAll',()=>{

        initState.config.logActions = false;

        const watchAll = rootSaga();
        const effect = watchAll.next().value;

        expect(effect).toEqual(
            all([
                applicationSaga(),
                configSaga(),
                clientReduxCorrespondent()
            ])
        );
    });

    describe('Log actions',()=>{

        it('Log actions enabled',()=>{
            initState.config.logActions = true;

            const watchAll = rootSaga();
            const effect = watchAll.next().value;

            expect(effect.payload).toHaveLength(4);
        });

        it ('watchAndLogSaga',()=>{
            testSaga(watchAndLogSaga)
                .next()
                .takeEvery('*',handleLogAllActions)
                .next()
                .isDone();
        });

        it ('handleLogAllActions',()=>{
            testSaga(handleLogAllActions,{type:'SAMPLE_ACTION_TYPE'})
                .next()
                .select()
                .next({})
                .isDone();
        });

    })

});
