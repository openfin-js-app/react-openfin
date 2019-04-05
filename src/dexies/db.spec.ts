import Dexie from 'dexie';
import indexedDB from 'fake-indexeddb';

Dexie.dependencies.indexedDB = indexedDB;
Dexie.dependencies.IDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange');

import db from './db';


describe('indexDb db',()=>{
    it('db init successfully',()=>{
        expect(db).toBeTruthy();
    })
})