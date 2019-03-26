import * as React from 'react';
import { useContext } from 'react';

import { RootReduxContext } from './RootReduxContext';


const connect = (
    mapState,
    mapDispatch,
)=>{
    return WrappedComp => {
        return ()=>{
            const { state, dispatch } = useContext(RootReduxContext);
            return (
                <WrappedComp {...mapState(state)} {...mapDispatch(dispatch)} />
            )
        }

    }
}

export default connect;