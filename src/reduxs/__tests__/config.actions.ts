import * as Actions from '../config/actions';

describe('Config actions',()=>{

    it('configReset action',()=>{
        expect(Actions.configReset({})).toMatchSnapshot();
    })

    it('configDoUpdateOneField action',()=>{
        expect(Actions.configDoUpdateOneField({
            tabName:'tabName',
            fieldName:'fieldName',
            value:'value',
        })).toMatchSnapshot();
    })

    it('configUpdateGlobalFilterStr action',()=>{
        expect(Actions.configUpdateGlobalFilterStr('string')).toMatchSnapshot();
    })

    it('configLoadFromDexie action',()=>{
        expect(Actions.configLoadFromDexie()).toMatchSnapshot();
    })

    it('configDoUpdateOneFieldInDexie action',()=>{
        expect(Actions.configDoUpdateOneFieldInDexie({
            id:1,
            tabName:'tableName',
            fieldName:'fieldName',
            value:'value',
            version:1
        })).toMatchSnapshot();
    })

    it('configUpdateOneField action',()=>{
        expect(Actions.configUpdateOneField('str1','str2',{})).toMatchSnapshot();
    })

    it('configUpdateOneField action',()=>{
        expect(Actions.configUpdateOneField('str1','str2',{})).toMatchSnapshot();
    })

    it('configUpdateNewWindowPosition action',()=>{
        expect(Actions.configUpdateNewWindowPosition()).toMatchSnapshot();
    })

    it('configUpdateNewWindowPositionAddDelta action',()=>{
        expect(Actions.configUpdateNewWindowPositionAddDelta()).toMatchSnapshot();
    })

    it('configUpdateNewWindowPositionResetTop action',()=>{
        expect(Actions.configUpdateNewWindowPositionResetTop()).toMatchSnapshot();
    })

    it('configUpdateNewWindowPositionResetLeft action',()=>{
        expect(Actions.configUpdateNewWindowPositionResetLeft()).toMatchSnapshot();
    })

})