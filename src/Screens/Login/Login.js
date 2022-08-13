import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import './login.css'

import { Button, Input } from '../../Components';
import { UserLogin } from '../../Firebase';
import { handleErrors, handleValiDation, isEmailValid } from '../../Utils';
import { loading } from '../../Assets';
import {getUserDB} from '../../Redux/Action/Actions'

export const Login = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    
    const [loader, setloader] = useState(false)
    const [formData, setFormData] = useState({ 
        Email:  { value: "", errorMessage: "" },
        Password: { value: "", errorMessage: "" }
    });

    const handlelogin = async (e) => {
         
        e.preventDefault();
        setloader(true)
        try {
            const data = {
                email: formData?.Email?.value,
                password: formData?.Password?.value,
              };
              const res = await axios.post("http://localhost:3003/signin", data);
              console.log("🚀 ~ file: Login.js ~ line 32 ~ handlelogin ~ res", res)
            // const response = await UserLogin(formData?.Email?.value, formData?.Password?.value);
            if (res.data.user.email) {
                // navigate.push(`/portfolio/${"Ritik-Pal"}`)
                 dispatch(getUserDB(res));
                navigate('/')
                setloader(false)
                toast.success("welcome : "+formData?.Email?.value)
            } else {
                toast.error("Invalid User")
            }
        } catch (error) {
            console.log("🚀 ~ file: Login.js ~ line 46 ~ handlelogin ~ error", error)
            toast.error(handleErrors(error))
        }
        setloader(false)
    }
           
    const isEnable = () => {
        return (!formData?.Email?.value || !formData?.Password?.value?.length >= 6)
    }

    const handleChange = (key, value,formData,setFormData, checklocation,checkcity) => {
        
        switch (key) {
            case "Email":    
                setFormData({
                    ...formData,
                    [key]:{ value: value, errorMessage: isEmailValid(value)? " invalid Email": "" },
                });
                return value.length < 2;
            case "Password":
                setFormData({
                    ...formData,
                        [key]: { value: value, errorMessage: handleValiDation("Password",value)? "password should be long": "" },
                    });
                return value.length < 2;
            default:
                break;
        }
    }

    return (
        <div>  
            {loader ? <center><img src={loading} className="loadinggif" /></center> :                       
                <center><br/>
                    <div className="login-div my-5">
                        <h1 style={{ color: "black" }}>Login</h1><br/>
                        <form onSubmit={(e) => handlelogin(e)} method="POST">
                            <input
                                type="email" 
                                className="form-control w-75" 
                                placeHolder=" Type your Email"
                                value={formData.Email.value}
                                onChange={(e) => {handleChange("Email", e.target.value, formData, setFormData)}}/>
                                <span style={{"color":"red"}}>{formData?.Email?.errorMessage}</span><br/>

                            <input
                                type="password"
                                className="form-control w-75" 
                                placeHolder=" Type your password"
                                value={formData?.Password?.value}
                                onChange={(e) => {handleChange("Password", e.target.value, formData, setFormData)}}/>
                                <span style={{"color":"red"}}>{formData.Password.errorMessage}</span><br/>

                            {/* <button
                                title="Login"
                                type="submit"
                                className="btn btn-outline-primary my-2 my-sm-0" 
                                Disabled={isEnable()}>Login</button><br/> */}
                            <button type="submit" Disabled={isEnable()}className="btn btn-primary" style={{float:"left",marginLeft:"43%"}}>Login</button><br/><br/>
                            <p>Don't have account<Link to="/signup">Signup</Link></p>
                        </form>
                    </div>
                </center>
            } 
        </div>
    )
}