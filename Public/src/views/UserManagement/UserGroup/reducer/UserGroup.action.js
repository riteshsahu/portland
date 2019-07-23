import { UserGroup } from "./UserGroup.constants";


export const addGroup =(value)=>{
    return(dispatch)=>{
        dispatch({
            type: UserGroup.ADD_NEW_GROUP,
            payload: value
        })
    }
}
export const showList =(value)=>{
    return(dispatch)=>{
        dispatch({
            type: UserGroup.SHOW_LIST,
            payload: value
        })
    }
}