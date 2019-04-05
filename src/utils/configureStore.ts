import { applyMiddleware, createStore, compose, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createOpenfinMiddleware } from 'redux-openfin';
import {IDockingOptions} from "redux-openfin/docking";

import rootReducer, {
    IRootState,
} from '../reduxs';
import rootSaga from '../reduxs/sagas';


declare const window:any;

export default (
    fin:any,
    finUuid:string,
    sharedActions:string[],
    enableAutoDocking:boolean,
    dockingOptions:Partial<IDockingOptions>,
    parentRootState?:IRootState,
):Store => {

    const reduxOpenfinMiddleware = createOpenfinMiddleware(fin,{
        finUuid: finUuid,
        sharedActions: sharedActions,
        autoDocking: enableAutoDocking,
        dockingOptions:dockingOptions,
        // libDispatchFieldName:REACT_OPENFIN_DISPATCH_FIELD_NAME
    });

    const sagaMiddleware = createSagaMiddleware();

    const enhancers = compose(
        applyMiddleware(
            sagaMiddleware,
            reduxOpenfinMiddleware,
        ),
    );

    const store = createStore(
        rootReducer(parentRootState),
        enhancers,
    );

    sagaMiddleware.run(rootSaga);

    return store;

}