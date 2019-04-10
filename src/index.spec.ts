import *  as all from './index';

describe('index',()=>{

    it('all',()=>{
        expect(all).toMatchSnapshot();
    })

})