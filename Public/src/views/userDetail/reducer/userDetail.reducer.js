
import {UserDetail} from './userDetail.constants';

const initialState = {
    createUser: false,
    updatedDetails:{},
    userDetails: [
        {
        userName: "Vishnu Serghei",
        date: "	2012/01/01",
        role: "	Member	",
    },
    {
        userName: "Jitendra Patidar",
        date: "	2012/01/01",
        role: "	Internal Employee",
    },
    {
        userName: "Shashikant Shrivastava",
        date: "	2012/01/01",
        role: "External Employee	",
    },
    {
        userName: "Sadanand Mandal",
        date: "	2012/01/01",
        role: "End User	",
    },
    {
        userName: "Zuber Khan",
        date: "	2012/01/01",
        role: "	Management",
    },
]
} 


function UserReducer(state = initialState, action) {
   
    switch (action.type) {

        
        case UserDetail.UPDATE_USER:
            return {
                ...state,
                updatedDetails :action.payload,
                createUser: true
            }
       
        case UserDetail.CREATE_USER:
            return {
                ...state,
                createUser: !state.createUser
            }

         case UserDetail.CREATE_NEW_USER:
                return {
                    ...state,
                    userDetails: [...state.userDetails, action.payload]
                }
                
                case UserDetail.DELETE_USER:
                        var updatedUsers  = state.userDetails.filter((data, index)=>{
                            return (action.payload != index)
                        });
                      
                    return {
                        ...state,
                        userDetails: updatedUsers
                    }
            default:
                return state;
         
    }
}

export default UserReducer;