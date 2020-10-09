import * as RealmUtil from './realmutil';

const StoreTabName = 'Store';

declare type StoreType = {
    id:string;
    name:string;
    address:string;
    modifyTime?:Date;
    createTime:Date;
}

export function createStore(name:string,address?:string) {
    return RealmUtil.writeToRealm<StoreType>({name:name,address:address},StoreTabName);
}

export function deleteStore(id:string){
    return RealmUtil.clearRowFromRealm(id,StoreTabName);
}

export function updateStore(id:string,name?:string,address?:string){
    return RealmUtil.updateOneRealm<StoreType>(id,{name,address},StoreTabName);
}

export function queryOneStore(id:string){
    return RealmUtil.queryOneFromRealm<StoreType>(id,StoreTabName);
}

export function queryAllStore(){
    return RealmUtil.queryAllFromRealm(StoreTabName);
}