import axios from "axios";

export const instance = axios.create({
    baseURL:process.env.REACT_APP_BASE_URL
})

export const UserLogin = async (data) =>{
    try {
          const res = await instance.post("/signin", data);
          window.localStorage.setItem("authTokan", res?.data?.token)
          return res
    } catch (error) {
        return error
    }
}