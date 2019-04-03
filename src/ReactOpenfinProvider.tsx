import * as React from 'react';
import { useMemo } from 'react';
import { Provider } from 'react-redux';

import {REACT_OPENFIN_DISPATCH_FIELD_NAME, REACT_OPENFIN_STORE, REACT_OPENFIN_STORE_CTX} from './GlobalTypes'
import configureStore from "./utils/configureStore";
import {applicationNetworkOffline, applicationNetworkOnline} from "./reduxs";
import initState from "./init";
import ApplicationCtxProvider from './providers/ApplicationCtxProvider';
import ConfigCtxProvider from './providers/ConfigCtxProvider';

const ReactOpenfinProvider:React.FunctionComponent<{}> = (
    {
        children
    }
)=>{
    const seed = useMemo(()=>{

        // init store
        const store = configureStore(
            initState.fin, initState.finUuid, initState.sharedActions,
            initState.config.enableAutoDocking, initState.dockingOptions,
            window.name == initState.finUuid?
                void 0:
                window.opener[REACT_OPENFIN_STORE].getState()
        );

        window[REACT_OPENFIN_STORE] = store;
        window[REACT_OPENFIN_DISPATCH_FIELD_NAME] = store.dispatch;

        window.addEventListener('online', ()=>{
            store.dispatch(applicationNetworkOnline())
        });
        window.addEventListener('offline', ()=>{
            store.dispatch(applicationNetworkOffline())
        });

        initState.seed = store;

        return store;
    },[]);

    return(<React.Fragment>
        <Provider
            store = {seed}
            context = {REACT_OPENFIN_STORE_CTX}
        >
            <ApplicationCtxProvider
            >
                <ConfigCtxProvider>
                    {children}
                </ConfigCtxProvider>
            </ApplicationCtxProvider>
        </Provider>
    </React.Fragment>)
}

export default ReactOpenfinProvider;