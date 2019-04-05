import {
    CONFIG_VERSION,
    findAll, findAllOfCurrentVersion,
    findOneField, findOneFieldVal,
    saveOrUpdateOneByTabNameFieldName
} from './configDao';
import db from './db';

jest.mock('./db');

describe('ConfigDao',()=>{

    it('findAll async',async ()=>{
        const founds = await findAll();
        expect(founds).toMatchSnapshot();
    })

    it('findAllOfCurrentVersion async',async ()=>{
        const founds = await findAllOfCurrentVersion();
        expect(founds).toMatchSnapshot();
    })

    it('findOneField async',async ()=>{
        const founds = await findOneField('tabName','fieldName');
        expect(founds).toMatchSnapshot();
    })

    it('findOneFieldVal with null async',async ()=>{
        const founds = await findOneFieldVal('tabName','fieldName');
        expect(founds).toMatchSnapshot();
    })

    it('saveOrUpdateOneByTabNameFieldName async',async ()=>{
        const saved = await saveOrUpdateOneByTabNameFieldName(
            'tabName', 'fieldName', 'value'
        );
        expect(saved).toMatchSnapshot();
    })

    describe('with preset',()=>{
        beforeAll(()=>{
            const configs = db.table('configs');
            configs.put({
                tabName:'tabName', fieldName:'fieldName', value:'value', version:CONFIG_VERSION-1,
            });
            configs.put({
                tabName:'tabName', fieldName:'fieldName', value:'value', version:CONFIG_VERSION,
            });
            configs.put({
                tabName:'tabName', fieldName:'fieldName', value:'value', version:CONFIG_VERSION,
            });
        })

        it('findAll async with preset',async ()=>{
            const founds = await findAll();
            expect(founds).toMatchSnapshot();
        })

        it('findAllOfCurrentVersion async with preset',async ()=>{
            const founds = await findAllOfCurrentVersion();
            expect(founds).toMatchSnapshot();
        })

        it('saveOrUpdateOneByTabNameFieldName async with preset',async ()=>{
            const saved = await saveOrUpdateOneByTabNameFieldName(
                'tabName', 'fieldName', 'value'
            );
            expect(saved).toMatchSnapshot();
        })


        it('saveOrUpdateOneByTabNameFieldName async update',async ()=>{
            const saved = await saveOrUpdateOneByTabNameFieldName(
                'tabName', 'fieldName', 'value2'
            );
            expect(saved).toMatchSnapshot();
        })

        it('findOneFieldVal null async',async ()=>{
            const founds = await findOneFieldVal('tabName','fieldName');
            expect(founds).toMatchSnapshot();
        })

    })

});