import { RoleDetail } from './role.constants'

export const AssignRoleHandler = () => {
    return (dispatch) => {
        dispatch({
            type: RoleDetail.ASSIGN_ROLE,
        })
    }
}

export const AssignNewRole = (data) => {
    return (dispatch) => {
        dispatch({
            type: RoleDetail.ASSIGN_NEW_ROLE,
            payload:data
        })
    }
}

export const deleteRole = (index) => {
    return (dispatch) => {
        dispatch({
            type: RoleDetail.DELETE_ROLE,
            payload:index
        })
    }
}

export const updateRole = (data) => {
    return (dispatch) => {
        dispatch({
            type: RoleDetail.UPDATE_ROLE,
            payload:data
        })
    }
}