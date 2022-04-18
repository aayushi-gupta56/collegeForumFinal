import { login,logout } from "./authActions"

const authReducer = (state, action)=>{
    switch(action.type){
        case login:
            return {
                ...state,
                userID: action.payload.userID,
                email: action.payload.email,
                isAdmin: action.payload.isAdmin,
                isClub: action.payload.isClub,
                AccessToken: action.AccessToken
            }

        case logout: 
            return {
                ...state,
                userID:"",
                email:"",
                isAdmin:0,
                isClub:0,
                AccessToken:""
            }

        default:
            return state;
    }
}

export default authReducer