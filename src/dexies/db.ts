import Dexie from 'dexie';

import { IConfigDexie } from '../reduxs';

class OpenfinReactDatabase extends Dexie{
    configs:Dexie.Table<IConfigDexie,number>;

    constructor(databaseName){
        super(databaseName);
        this.version(1).stores({
            configs:'++id,tabName,fieldName'
        })
        this.version(2).stores({
            configs:'++id,tabName,fieldName,version'
        })
    }
}

const db = new OpenfinReactDatabase('openfinReactDb');

db.open().catch((err)=>{
    console.error('Default openfinReactDb db failed',err);
});

export default db;