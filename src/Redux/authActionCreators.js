import * as actionTypes from "./actionTypes";
import axios from "axios"


export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId
        }
    }
}



 export const authLoading = (isLoading) => {
     return {
         type: actionTypes.AUTH_LOADING,
         payload: isLoading,
   };
};
export const authFailed = isFailed => {
    return {
        type: actionTypes.AUTH_FAILED,
        payload: isFailed,
    }
}
export const auth = (email, password, mode) => dispatch => {
    dispatch(authLoading(true))
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }
    
    let authURL = null;
    if (mode === "Sign Up") {
        authURL ="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
    } else {
        authURL ="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
    }
    
        const API_KEY = "AIzaSyDZXf8shU6ms3DYaB6NWt-QpCYTH-qUKe4";
    axios
      .post(authURL + [API_KEY], authData)
      .then((response) => {
        dispatch(authLoading(false));
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);
        const expirationTime = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("expirationTime", expirationTime);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
      })
        .catch((err) => {
            dispatch(authLoading(false));
            dispatch(authFailed(err.response.data.error.message));
      });
}

export const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("userId");
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const authCheck = () =>dispatch=> {
    const token = localStorage.getItem("token");
    if (!token) {
        dispatch(logOut())
    } else {
        const expirationTime = new Date(localStorage.getItem("expirationTime"));
        if (expirationTime <= new Date()) {
            dispatch(logOut())
        }else{
            const userId = localStorage.getItem("userId")
            dispatch(authSuccess(token, userId))
        }
    }
}