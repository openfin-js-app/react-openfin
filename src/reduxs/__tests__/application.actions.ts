import * as Actions from '../application/actions';

describe('Application actions',()=>{

    it('applicationSetLoadingMsg action',()=>{
        expect(Actions.applicationSetLoadingMsg('loadingMsg')).toMatchSnapshot();
    })

})
