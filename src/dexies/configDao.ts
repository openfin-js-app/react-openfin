import db from './db';

import { IConfigDexie } from '../reduxs';


export const CONFIG_VERSION:number = 2;

export async function findAll():Promise<IConfigDexie[]>{
    return  db.table('configs').toArray();
}

export async function findAllOfCurrentVersion():Promise<IConfigDexie[]> {
    return db.table('configs')
        .where({version:CONFIG_VERSION})
        .toArray();
}

export async function findOneField(tabName:string,fieldName:string):Promise<IConfigDexie> {
    const configs = db.table('configs');
    return await configs.where({
        tabName,fieldName, version:CONFIG_VERSION,
    }).first();
}

export async function findOneFieldVal(tabName:string,fieldName:string):Promise<any> {
    const oneItem:IConfigDexie = await findOneField(tabName,fieldName);
    return oneItem?oneItem.value:null;
}

export async function saveOrUpdateOneByTabNameFieldName(tabName:string, fieldName:string, value:any):Promise<IConfigDexie> {
    let one:IConfigDexie = null;
    const configs = db.table('configs');
    await db.transaction('rw',configs,async()=>{
        const founds:IConfigDexie[] = await configs
            .where({tabName,fieldName,version:CONFIG_VERSION})
            .toArray();
        // console.log('configDao::saveOrUpdateOneByTabNameFieldName',founds.length,founds,tabName,fieldName,value);
        if (founds.length === 0){
            one = {tabName,fieldName,value,version:CONFIG_VERSION};
            const id = await configs.put(one);
            one = await configs.get(id);
        }else if (founds.length === 1){
            one = founds[0];
            await configs.update(one.id,{value});
            one = await configs.get(one.id);
        }else{
            await configs.bulkDelete(founds.map(one => one.id));
            one = {tabName,fieldName,value,version:CONFIG_VERSION};
            const id = await configs.put(one);
            one = await configs.get(id);
        }
    });
    return one;
}