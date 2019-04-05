import { useReducer, useEffect, useRef } from "react";
import { runSaga, stdChannel } from "redux-saga";
import { take, call, effectTypes } from "redux-saga/effects";

function* selectAsyncSaga(selector, args) {
    const { state } = yield take("REACT_STATE_READY");
    return selector(state, ...args);
}

export function useReducerAndSaga(reducer, state0, saga, sagaOptions) {
    const [state, reactDispatch] = useReducer(reducer, state0);
    const sagaEnv = useRef({ state: state0, pendingActions: [], channel: void 0 });

    function dispatch(action) {
        console.log("[useReducerAndSaga] react dispatch", action);
        reactDispatch(action);
        console.log("[useReducerAndSaga] post react dispatch", action);
        // dispatch to sagas is done in the commit phase
        sagaEnv.current.pendingActions.push(action);
    }

    useEffect(() => {
        console.log("[useReducerAndSaga] update saga state");
        // sync with react state, *should* be safe since we're in commit phase
        sagaEnv.current.state = state;
        const pendingActions = sagaEnv.current.pendingActions;
        // flush any pending actions, since we're in commit phase, reducer
        // should've handled all those actions
        if (pendingActions.length > 0) {
            sagaEnv.current.pendingActions = [];
            console.log("[useReducerAndSaga] flush saga actions");
            pendingActions.forEach(action => sagaEnv.current.channel.put(action));
            sagaEnv.current.channel.put({ type: "REACT_STATE_READY", state });
        }
    });

    // This is a one-time effect that starts the root saga
    useEffect(() => {
        sagaEnv.current.channel = stdChannel();

        const task = runSaga(
            {
                ...sagaOptions,
                channel: sagaEnv.current.channel,
                dispatch,
                getState: () => {
                    /* overrided by effectMiddlewares below */
                },
                effectMiddlewares: [
                    runEffect => {
                        return effect => {
                            if (effect.type === effectTypes.SELECT) {
                                return runEffect(
                                    call(
                                        selectAsyncSaga,
                                        effect.payload.selector,
                                        effect.payload.args
                                    )
                                );
                            }
                            return runEffect(effect);
                        };
                    }
                ]
            },
            saga
        );
        return () => task.cancel();
    }, []);

    return [state, dispatch];
}
