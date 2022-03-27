
export const handleErrors = (error) =>{
    if(error.message === "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."){
        return "Too many attempts!! please try again later"
    }
    if(error.message === "Firebase: Error (auth/invalid-email)."){
        return "invalid email"
    }
    if(error.message === "Firebase: Error (auth/user-not-found)."){
        return "User not found"
    }
    if(error.message === "Firebase: Error (auth/wrong-password)."){
        return "Wrong-password"
    }
    if(error.message === "Firebase: Error (auth/network-request-failed)."){
        return "Network error"
    }else{
        return error.message
    }
}