
import {UserDetail} from './userDetail.constants';

const initialState = {
    createUser: false,
    updatedDetails:{},
    userDetails: [
        {
        firstName: "Lorem ",
        lastName: "Ipsum",
        email: "Loremipsum@gmail.com",
        date: "2012/01/01",
        role: "Member",
    },
    {
        firstName: "Jane",
        lastName: "Doe",
        email: "Janedoe@gmail.com",
        date: "2012/01/01",
        role: "Internal Employee",
    },
    {
        firstName: "Mike",
        lastName:"Tyson",
        email: "Miketyson@gmail.com",
        date: "	2012/01/01",
        role: "External Employee",
    },
    {
        firstName: "Chris",
        lastName: "Gayle",
        email: "Chrisgayle@gmail.com",
        date: "2012/01/01",
        role: "End User",
    },
    {
        firstName: "Bruce",
        lastName: " Wayne",
        email: "Brucewayne@gmail.com",
        date: "2012/01/01",
        role: "Management",
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