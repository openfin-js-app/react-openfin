import * as React from 'react';
import { shallow, mount, } from 'enzyme';

import {default as ReactOpenfin} from './ReactOpenfinProvider';

import {InitializeReactOpenfin} from "./init";

describe('ReactOpenfinProvider',()=>{

    beforeAll(()=>{
        InitializeReactOpenfin({
            finUuid: process.env.REACT_APP_FIN_UUID,
            finMockupForceSilentMode:true,
            i18n:{} as any,
            hist:{} as any,
            configTabs:[],
            launchBarItems:[],
        });
    })

    it('render correctly by default', ()=>{
        const wrapper = mount(
            <ReactOpenfin>
                <React.Fragment>dummy ele</React.Fragment>
            </ReactOpenfin>
        )

        expect(wrapper).toBeTruthy();
    })

})