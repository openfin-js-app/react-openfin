import * as React from 'react';

import RootReduxProvider from './rootRedux/RootReduxProvider'
import ApplicationCtxProvider from './providers/ApplicationCtxProvider';
import ConfigCtxProvider from './providers/ConfigCtxProvider';

const ReactOpenfinProvider:React.FunctionComponent<{}> = (
    {
        children,
    }
)=>{

    return(<React.Fragment>
        <RootReduxProvider>
            <ApplicationCtxProvider>
                <ConfigCtxProvider>
                    {children}
                </ConfigCtxProvider>
            </ApplicationCtxProvider>
        </RootReduxProvider>
    </React.Fragment>)
}

export default ReactOpenfinProvider;