import { useReducer, useEffect, useRef } from "react";
import { runSaga, stdChannel } from "redux-saga";
import { take, call, effectTypes } from "redux-saga/effects";

function compose(...fns) {
    if (fns.length === 0) return arg => arg
    if (fns.length === 1) return fns[0]
    return fns.reduce((a, b) => (...args) => a(b(...args)))
}

function* selectAsyncSaga(selector, args) {
    const { state } = yield take("REACT_STATE_READY");
    return selector(state, ...args);
}

export function useEnhancedReducerAndSaga(reducer, state0, middlewares=[], saga, sagaOptions) {
    const [state, reactDispatch] = useReducer(reducer, state0);
    const sagaEnv = useRef({ state: state0, pendingActions: [], channel: void 0 });

    const dispatch = (action) => {
        console.log("react dispatch", action);
        reactDispatch(action);
        console.log("post react dispatch", action);
        // dispatch to sagas is done in the commit phase
        sagaEnv.current.pendingActions.push(action);
    }

    let enhancedDispatch
    const store = {
        getState: () => state,
        dispatch: (...args) => enhancedDispatch(...args)
    }
    const chain = middlewares.map(middleware => middleware(store))
    enhancedDispatch = compose.apply(void 0, chain)(dispatch);


    useEffect(() => {
        console.log("update saga state");
        // sync with react state, *should* be safe since we're in commit phase
        sagaEnv.current.state = state;
        const pendingActions = sagaEnv.current.pendingActions;
        // flush any pending actions, since we're in commit phase, reducer
        // should've handled all those actions
        if (pendingActions.length > 0) {
            sagaEnv.current.pendingActions = [];
            console.log("flush saga actions");
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
                enhancedDispatch,
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

    return [state, enhancedDispatch];
}
