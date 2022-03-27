import React, { useState } from 'react'

import './profile.css'

import { Navbaar } from '../../Containers'
import { blog } from '../../Assets'
import { useSelector } from 'react-redux'
import { CountryList, StateList, CityList, isEmailValid, handleValiDation, handleErrors } from '../../Utils';
import { HandleUpdateUserData, storage, UserLogout, userLogout } from '../../Firebase'
import { toast } from 'react-toastify'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { loading } from '../../Assets';


export const Profile = () => {

    const userName = useSelector((state)=>state?.userName);
    const user = useSelector((state)=>state?.userData?.data);
    const [countryStates, setCountryStates] = useState([]);
    const [loader, setloader] = useState(false)
    const [Image, setImage] = useState("");
    const [uploadprogress, setUploadprogress] = useState(0);
    const [imageAsUrl, setimageAsUrl] = useState(null);
    const [statecity, setStatecity] = useState([])
    const [formData, setFormData] = useState({ 
        Name: { value: user?.username,  errorMessage: "" },
        Email:  { value: user?.email, errorMessage: "" },
        Phone: { value: user?.phone, errorMessage: "" },
        Address:{ value: user?.address, errorMessage: "" },
        Country:{ value: user?.country, errorMessage: "" },
        States: { value: user?.state, errorMessage: "" },
        City: { value: user?.city,   errorMessage: "" },
        Zipcode: { value: user?.zipcode, errorMessage: "" }
    })

    const handleupdate = async (e) => {
        e.preventDefault()
        console.log(imageAsUrl,"data")
        // console.log(typeof formData.Country.value,"type")
        setloader(true)
        try {
            await HandleUpdateUserData(
                formData?.Name?.value,
                formData?.Email?.value,
                formData?.Phone?.value,
                formData?.Address?.value,
                // CountryList[formData?.Country?.value - 1]?.name ? CountryList[formData?.Country?.value - 1]?.name : formData?.Country?.value,
                // StateList[formData.States.value - 1]?.name ? StateList[formData.States.value - 1]?.name : formData?.States?.value ,
                // CityList[formData.City.value - 1]?.name ? CityList[formData.City.value - 1]?.name : formData?.City?.value ,
                formData?.Zipcode?.value,
                imageAsUrl ? imageAsUrl : user?.profileimage
                )
            setloader(false)
            toast.success("updated")
        } catch (error) {
            console.log(error)
        }
    }

    const checklocation = (country) => {
        let states = StateList.filter(x => x.countryId == country);
        setCountryStates(states)
    }
    
    const checkcity = (city) => {
        let cities = CityList.filter(x => x.StateId == city);
        setStatecity(cities)
    }

    const handleChange = (key, value, formData, setFormData, checklocation, checkcity) => {
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
    }
    
    const onImageChange = (event) => {
        if (event?.target?.files && event?.target?.files[0]) {
          if (event?.target?.files[0].type === "image/jpeg") {
            console.log(event?.target?.files[0]);
            setImage(event?.target?.files[0]);
            uploadImage(event?.target?.files[0])
          } else {
            if (event?.target?.files[0].type !== "image/jpeg") {
              toast.error("Please choose image only",event.target.value = null);
             
            }
          }
        }
    }

    const uploadImage = (profile) => {
        console.log(profile,"imge")
        try {
          if (uploadprogress !== 100) {
            const storageRef = ref(
              storage,
              `images/${new Date().getTime()}` + profile?.name
            );
            const uploadimage = uploadBytesResumable(storageRef, profile, {
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
            console.log(error.message)
        }
      };

    return (
        <div>
            <Navbaar/>
            <center>
                <div className="profile-div" style={{height:"650px"}}>
                    {loader ? <center><img src={loading} className="loadinggif" /></center> :                       
                    <form  onSubmit={(e) => handleupdate(e)} method="POST">
                        <center>{Image ? <img src={URL.createObjectURL(Image)} alt='profile' className='profilePhoto'/> : <img src={user?.profileimage ? user?.profileimage : 'https://img.icons8.com/officel/150/000000/test-account.png'} alt='profile' className='profilePhoto'/>}<br/><br/>{userName}</center><br/>
                        <input
                            type="file" 
                            className="form-control w-75" 
                            placeHolder="Type your Name"
                            onChange={(e) => {onImageChange(e)}}/><br/>

                        <input
                            type="text" 
                            className="form-control w-75"
                            placeHolder="Type your Name"
                            value={formData.Name.value}
                            onChange={(e) => {handleChange("Name", e.target.value,formData,setFormData);}}/>
                            <span style={{"color":"red"}}>{formData.Name.errorMessage}</span><br/>

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

                        {/* <Select
                            value={formData.Country.value}
                            title={user.country}
                            className="form-control w-75" 
                            handlechange={(e) => {handleChange("Country", e.target.value,formData,setFormData,checklocation,checkcity);}}
                            list={CountryList}/><br/>
                            <span style={{"color":"red"}}>
                            {formData.Country.errorMessage}</span>

                        <Select
                            value={formData.States.value}
                            title={user.state}
                            className="form-control w-75" 
                            handlechange={(e) => {handleChange("States", e.target.value,formData,setFormData,checklocation,checkcity);}}
                            list={countryStates}/>
                            <br/><span style={{"color":"red"}}>
                            {formData.States.errorMessage}</span>

                        <Select
                            className="form-control w-75" 
                            title={user.city}
                            value={formData.City.value}
                            handlechange={(e) => {handleChange("City", e.target.value,formData,setFormData,checklocation,checkcity);}}
                            list={statecity}/>
                            <br/><span style={{"color":"red"}}>
                            {formData.City.errorMessage}</span> */}

                        <input
                            type="number"
                            className="form-control w-75" 
                            placeHolder="Type your Zipcode"
                            value={formData.Zipcode.value}
                            onChange={(e) => { handleChange("Zipcode", e.target.value,formData,setFormData)}}/>
                            <span style={{"color":"red"}}>{formData.Zipcode.errorMessage}</span><br/>

                        <button className="btn btn-outline-primary bg-primary text-white" onClick={handleupdate} type="submit" style={{float:"left",marginLeft:"45%"}} >Update</button>
                    </form>
                }
                </div>
            </center>
        </div>
    )
}