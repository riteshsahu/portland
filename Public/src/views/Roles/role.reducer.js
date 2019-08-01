import { RoleDetail } from './role.constants';

const initialState = {
    assignRole: false,
    updatedDetails: {},
    roleDetails: [
        {
            name: "Robert Downey",
            email: "Junior@RDJ.com",
            role: "Management",
        },
        {
            name: "Mike Hamesworth",
            email: "Mike@tesla.com",
            role: "Management",
        },
        {
            name: "Bruce Homes",
            email: "Bruce@gmail.com",
            role: "Management",
        },
        {
            name: "Jane Doe",
            email: "Jane@gmail.com",
            role: "Internal Employee",
        },
        {
            name: "Samual Kaulson",
            email: "Samual@gmail.com",
            role: "Management",
        },
        {
            name: "Nick Furi",
            email: "nick@yahoo.com",
            role: "External Employee",
        },
        {
            name: "Peter Parkar",
            email: "parkar@rediffmail.com",
            role: "Client",
        },
    ]
}


function RoleReducer(state = initialState, action) {

    switch (action.type) {
        case RoleDetail.UPDATE_ROLE:
            return {
                ...state,
                updatedDetails: action.payload,
                assignRole: true
            }

        case RoleDetail.ASSIGN_ROLE:
            return {
                ...state,
                assignRole: !state.assignRole
            }

        case RoleDetail.ASSIGN_NEW_ROLE:
            return {
                ...state,
                roleDetails: [...state.roleDetails, action.payload]
            }

        case RoleDetail.DELETE_ROLE:
            var updatedRoles = state.roleDetails.filter((data, index) => {
                return (action.payload != index)
            });
            return {
                ...state,
                roleDetails: updatedRoles
            }
        default:
            return state;
    }
}

export default RoleReducer;