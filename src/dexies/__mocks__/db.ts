import Dexie from 'dexie';
import indexedDB from 'fake-indexeddb';

Dexie.dependencies.indexedDB = indexedDB;
Dexie.dependencies.IDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange');

import { IConfigDexie } from '../../reduxs';

class OpenfinReactDatabase extends Dexie{
    configs:Dexie.Table<IConfigDexie,number>;

    constructor(databaseName){
        super(databaseName);
        this.version(1).stores({
            configs:'++id,tabName,fieldName,version'
        })
    }
}

const db = new OpenfinReactDatabase('openfinReactDb');

db.open().catch((err)=>{
    console.error('Default openfinReactDb db failed',err);
});

export default db;