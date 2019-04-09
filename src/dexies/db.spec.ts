import db from './db';


describe('indexDb db',()=>{
    it('db init successfully',()=>{
        expect(db).toBeTruthy();
    })
})