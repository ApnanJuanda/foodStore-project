import {USER_LOGIN, USER_LOGOUT} from "./constants";

//Action userLogin
export function userLogin(user, token) {
    return{
        type: USER_LOGIN,
        user,
        token
    }
}

//Action userLogout
export function userLogout(user, token){
    return{
        type: USER_LOGOUT,
    }
}