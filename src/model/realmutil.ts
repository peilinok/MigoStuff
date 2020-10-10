import Realm from 'realm';

const StoreSchema = {
    name: 'Store',
    primaryKey:'id',
    properties: {
      id:      'string',
      name:    'string', 
      address: 'string?',
      modifyTime:  {type:'date',optional:true},
      createTime:  {type: 'date'}, // optional property
    }
};

const ShopSchema = {
    name: 'Shop',
    primaryKey:'id',
    properties: {
        id:      'string',
      name:    'string', 
      address: 'string?',
      modifyTime:  {type:'date',optional:true},
      createTime:  {type: 'date'}, // optional property
    }
};

const StuffSchema = {
    name: 'Stuff',
    primaryKey:'id',
    properties: {
        id:      'string',
      storeId:   'string',
      name:      'string', 
      count:       {type:'int',default:0},
      modifyTime:  {type:'date',optional:true},
      createTime:  {type: 'date'}, // optional property
    }
};

const RecordSchema = {
    name: 'Record',
    primaryKey:'id',
    properties: {
        id:      'string',
      op:      'int',              // 0 input 1 output
      stuffId: 'string',
      storeId: 'string',
      shopId:  'string?',  
      count:   {type:'int',default:0},
      createTime:  {type: 'date'}, // optional property
    }
};
  
const instance  = new Realm({
    schema: [StoreSchema, ShopSchema,StuffSchema,RecordSchema],
    deleteRealmIfMigrationNeeded:true,
    inMemory:false,
});

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

export function writeToRealm<T>(obj:any,tabName:string) {
    return new Promise<T>((resolve, reject) => {
        try{
        instance.write(() => {
            let realmObj = instance.create(tabName, {...obj,id:generateUUID(),createTime:new Date()});
            resolve(realmObj as unknown as T);
        })
    }
    catch(e){
        reject(e);
    }
    })
}

export function updateOneRealm<T>(id:string,obj:any,tabName:string) {
    return new Promise<T>((resolve, reject) => {
        try{
        instance.write(() => {
            let realmObj = instance.create(tabName, {...obj,id,modifyTime:new Date()},Realm.UpdateMode.Modified);
            resolve(realmObj as unknown as T)
        })
    }
    catch(e){
        reject(e);
    }
    })
}


export function queryAllFromRealm<T>(tabName:string) {
    return new Promise<T>((resolve, reject) => {
        try{
        let obj = instance.objects(tabName);
        let objStr = JSON.stringify(obj);
        resolve(JSON.parse(objStr) as unknown as T)
        }
        catch(e){
            reject(e);
        }
    })
}

export function queryFromRealmById<T>(id:string,tabName:string) {
    return new Promise<T>((resolve, reject) => {
        try{
        let arrays = instance.objects(tabName);
        let rows = arrays.filtered('id==' + id);
        let objStr = JSON.stringify(rows);
        resolve(JSON.parse(objStr) as unknown as T)
        }
        catch(e){
            reject(e);
        }
    })
}


export function queryFromRealm<T>(filter:{key:string,value:string},tabName:string) {
    return new Promise<T>((resolve, reject) => {
        try{
        let arrays = instance.objects(tabName);
        let rows = arrays.filtered(filter.key + '==' + filter.value);
        let objStr = JSON.stringify(rows);
        resolve(JSON.parse(objStr) as unknown as T)
        }
        catch(e){
            reject(e);
        }
    })
}
export function clearAllFromRealm(tabName:string) {
    return new Promise<boolean>((resolve, reject) => {
        try{
        instance.write(() => {
            let arrays = instance.objects(tabName);
            instance.delete(arrays);
            resolve(true)
        })
    }catch(e){
        reject(e);
    }
    })
}


export function clearRowFromRealm(id:string,tabName:string) {
    return new Promise<boolean>((resolve, reject) => {
        instance.write(() => {
            try{
            let arrays = instance.objects(tabName);
            let row = arrays.filtered('id==' + id);
            instance.delete(row);
            resolve(true)
            }catch(e){
                reject(e);
            }
        })
    })
}