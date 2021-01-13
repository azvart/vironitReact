export interface Data{
    id:any,
    firstName:string,
    lastName:string,
    text:string,
    setType:string,
    report:boolean,
    dataFrom:string,
    dataTo:string,
};
export interface DataState{
    data:Data[]
}

export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const UPDATE_ITEM = "UPDATE_ITEM";

interface AddItemAction{
    type: typeof ADD_ITEM,
    payload: {data:Data},
};
interface DeleteItemAction{
    type:typeof DELETE_ITEM,
    meta:{
        id:number
    }
};



export type DataActionTypes = AddItemAction | DeleteItemAction;