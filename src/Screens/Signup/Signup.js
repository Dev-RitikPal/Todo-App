import { React, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { toast } from 'react-toastify';

import './signup.css'

import { Input,Select,Button } from '../../Components';
import { CountryList, StateList, CityList, isEmailValid, handleErrors, handleValiDation } from '../../Utils';
import { AddingUserdata, addingUserdata, UserSignup, userSignup,  } from '../../Firebase';
import { useDispatch } from 'react-redux';
import { blog } from '../../Assets';
import { storage, ref } from "../../Firebase";
import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { loading } from '../../Assets';

export const Signup = (props) => {

    const history = useHistory();
    const dispatch = useDispatch()

    const [loader, setloader] = useState(false)
    const [uploadprogress, setUploadprogress] = useState(0);
    const [imageAsUrl, setimageAsUrl] = useState(null);
    const [countryStates, setCountryStates] = useState([]);
    const [statecity, setStatecity] = useState([])
    const [profilephoto, setprofilephoto] = useState("");
    const [formData, setFormData] = useState({ 
        Name: { value: "", errorMessage: "" },
        Email:  { value: "", errorMessage: "" },
        Password: { value: "", errorMessage: "" },
        Phone: { value: "", errorMessage: "" },
        Address:{ value: "", errorMessage: "" },
        Country:{ value: "", errorMessage: "" },
        States: { value: "", errorMessage: "" },
        City: { value: "", errorMessage: "" },
        Zipcode: { value: "", errorMessage: "" }
    })
    
    const handlesignup = async (e) => {
        e.preventDefault(); 
        setloader(true)
        try {
            const res = await UserSignup(formData?.Email?.value, formData?.Password?.value);
            if (res) {
                await AddingUserdata(formData?.Name?.value,
                    formData?.Email?.value,
                    formData?.Phone?.value,
                    formData?.Address?.value,
                    CountryList[formData.Country.value - 1]?.name,
                    StateList[formData.States.value - 1]?.name,
                    CityList[formData.City.value - 1]?.name,
                    formData?.Zipcode?.value,
                    imageAsUrl
                    )
                    history.push('/todos')
                    setloader(false)
                    toast.success("welcome : "+formData?.Name?.value) 
                    dispatch({ type: "ADD_USER", data: formData })
                } else {
                    toast.error("Invalid User")
                }
        } catch (error) {
            toast.error(handleErrors(error))
        }
    }

    const isEnable = () => {
        return (!formData.Name.value || 
            !formData.Email.value || 
            !formData.Password.value || 
            !formData.Phone.value || 
            !formData.Address.value || 
            !formData.Country.value ||
            !formData.States.value ||
            !formData.City.value ||
            !formData.Zipcode.value)
    }

    const checklocation = (country) => {
        
        let states = StateList.filter(x => x.countryId == country);
        setCountryStates(states)
    }
    
    const checkcity = (citi) => {
        
        let cities = CityList.filter(x => x.StateId == citi);
        setStatecity(cities)
    }

    const handleChange = (key, value,formData,setFormData, checklocation,checkcity) => {
        switch (key) {
            case "Name":
                setFormData({
                    ...formData,
                    [key]:{ value: value, errorMessage: handleValiDation("Name",value)? "Name should longer": "" },
                  });
                return value.length < 2;
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
                return value.length < 8;
            case "Phone":
                setFormData({
                    ...formData,
                    [key]: { value: value, errorMessage: handleValiDation("Phone",value)? "Number should be 10 digits": "" },
                    });
                return value.length < 2;
            case "Address":        
                setFormData({
                      ...formData,
                      [key]: { value: value, errorMessage: handleValiDation("Address",value)? "Address should be up 10 character": "" },
                    });
                return value.length < 2;
            case "Country":
                setFormData({
                    ...formData,
                    [key]: { value: value, errorMessage: handleValiDation("Country",value) ? "Country not selected": "" },
                    });
                    checklocation(value)
                return value.length < 2;
            case "States":
                setFormData({
                    ...formData,
                    [key]: { value: value, errorMessage: handleValiDation("States",value)? "State not selected": "" },
                    });
                    checkcity(value)
                return value.length < 2;
            case "City":
                setFormData({
                    ...formData,
                    [key]: { value: value, errorMessage: handleValiDation("City",value)? "City not selected": "" },
                    });
                return value.length < 2;
            case "Zipcode":
                setFormData({
                    ...formData,
                    [key]: { value: value, errorMessage: handleValiDation("Zipcode",value)? "Should be longer then 2 char": "" },
                    });
                return value.length < 2;
            default:
                break;
        }
    };

    const uploadImage = (image) => {
        try {
          if (uploadprogress !== 100) {
            const storageRef = ref(
              storage,
              `images/${new Date().getTime()}` + image?.name
            );
            const uploadimage = uploadBytesResumable(storageRef, image, {
              contentType: "image/jpeg",
            });
    
            uploadimage.on(
              "state_changed",
              (snapshot) => {
                setUploadprogress(snapshot.bytesTransferred / snapshot.totalBytes * 100);
              },
              (error) => {
                toast.error(handleErrors(error))
              },
              () => {
                getDownloadURL(uploadimage.snapshot.ref).then((downloadURL) => {
                  setimageAsUrl(downloadURL);
                  console.log(downloadURL)
                });
              }
            );
          } else {
            toast.error("Image already uploaded");
          }
        } catch (error) {
            
        }
      };

    const onImageChange = (event) => {
        if (event?.target?.files && event?.target?.files[0]) {
          if (event?.target?.files[0].type === "image/jpeg") {
            console.log(event?.target?.files[0]);
            setprofilephoto(event?.target?.files[0]);
            uploadImage(event?.target?.files[0])
          } else {
            if (event?.target?.files[0].type !== "image/jpeg") {
              toast.error("Please choose image only",event.target.value = null);
             
            }
          }
        }
    };

    return (
        <div>
            {loader ? <center><img src={loading} className="loadinggif" /></center> :                       
            <center>
                <div className="signup-div">
                    <h3 style={{ color: "black" }}>Sign Up</h3>
                    <center>{profilephoto ? <img src={URL.createObjectURL(profilephoto)} alt='profile' className='profilePhoto'/> : <img src='https://img.icons8.com/officel/150/000000/test-account.png' alt='profile' className='profilePhoto'/>}</center><br/>
                    <form onSubmit={(e) => handlesignup(e)} method="POST">
                        <input
                            type="file" 
                            className="form-control w-75" 
                            placeHolder="Type your Name"
                            // value={formData.Name.value}
                            onChange={(e) => {onImageChange(e)}}/><br/>
                            {/* <span style={{"color":"red"}}>{formData.Name.errorMessage}</span><br/> */}

                        <input
                            type="text" 
                            className="form-control w-75" 
                            placeHolder="Type your Name"
                            value={formData.Name.value}
                            onChange={(e) => {handleChange("Name", e.target.value,formData,setFormData);}}/>
                            <span style={{"color":"red"}}>{formData.Name.errorMessage}</span><br/>

                        <input
                            type="email" 
                            className="form-control w-75" 
                            placeHolder="Type your Email"
                            value={formData.Email.value}
                            onChange={(e) => {handleChange("Email", e.target.value,formData,setFormData);}}/>
                            <span style={{"color":"red"}}>{formData.Email.errorMessage}</span><br/>
                        
                        <input
                            type="password"
                            className="form-control w-75" 
                            placeHolder="type your password"
                            value={formData.Password.value}
                            onChange={(e) => {handleChange("Password", e.target.value,formData,setFormData);}}/>
                            <span style={{"color":"red"}}>{formData.Password.errorMessage}</span><br/>

                        <input
                            type="tel"
                            className="form-control w-75" 
                            placeHolder="Type your Phone"
                            value={formData.Phone.value}
                            onChange={(e) => {handleChange("Phone", e.target.value,formData,setFormData);}}/>
                            <span style={{"color":"red"}}>{formData.Phone.errorMessage}</span><br/>

                        <input
                            type="text"
                            className="form-control w-75" 
                            placeHolder="Type your Address"
                            value={formData.Address.value}
                            onChange={(e) => { handleChange("Address", e.target.value,formData,setFormData);}}/>
                            <span style={{"color":"red"}}>{formData.Address.errorMessage}</span><br/>                    

                        <Select
                            value={formData.Country.value}
                            title={"Select country"}
                            className="form-control w-75" 
                            handlechange={(e) => {handleChange("Country", e.target.value,formData,setFormData,checklocation,checkcity);}}
                            list={CountryList}/><br/>
                            <span style={{"color":"red"}}>
                            {formData.Country.errorMessage}</span>

                        <Select
                            value={formData.States.value}
                            title={"Select states"}
                            className="form-control w-75" 
                            handlechange={(e) => {handleChange("States", e.target.value,formData,setFormData,checklocation,checkcity);}}
                            list={countryStates}/>
                            <br/><span style={{"color":"red"}}>
                            {formData.States.errorMessage}</span>

                        <Select
                            className="form-control w-75" 
                            title={"Select states"}
                            value={formData.City.value}
                            handlechange={(e) => {handleChange("City", e.target.value,formData,setFormData,checklocation,checkcity);}}
                            list={statecity}/>
                            <br/><span style={{"color":"red"}}>
                            {formData.City.errorMessage}</span>

                        <input
                            type="number"
                            className="form-control w-75" 
                            placeHolder="Type your Zipcode"
                            value={formData.Zipcode.value}
                            onChange={(e) => { handleChange("Zipcode", e.target.value,formData,setFormData)}}/>
                            <span style={{"color":"red"}}>{formData.Zipcode.errorMessage}</span><br/>

                        <button type="submit" Disabled={isEnable()} className="btn add-btn btn-primary" style={{float:"left",marginLeft:"45%"}}><span style={{textDecoration:"none",color:"white" }}>signup</span></button><br/><br/>
                        <span style={{fontSize:"15px"}}>Already have account! <Link to="/login"> Login</Link></span>
                    </form>
                </div>
            </center>
        }
        </div>
    )
}