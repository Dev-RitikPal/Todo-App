import { React, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import './portfolio.css'
import { Roadmap } from './roadmap';

import {  isEmailValid, handleValiDation } from '../../Utils';
import { Navbaar } from '../../Containers';
import { Ritik_pal_resume,profile  } from '../../Assets'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Portfolio = (props) => {    
    const user = useSelector((state)=>state?.userData);
    const [formData, setFormData] = useState({ 
        Name: { value: "", errorMessage: "" },
        Email:  { value: "", errorMessage: "" },
        Phone: { value: "", errorMessage: "" },
        subject: { value: "", errorMessage: "" },
        message: { value: "", errorMessage: "" }       
    })
    
    const handleSendMessage = (e) => {
        e.preventDefault();
        toast.success("Thanks for contacting us")
    }

    const handleChange = (key, value) => {
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
            case "message":
                setFormData({
                    ...formData,
                    [key]: { value: value, errorMessage: handleValiDation("message",value)? "Message should not be empty": "" },
                    });
                return value.length < 1;
            default:
                break;
        }
    };

    return (
        <>
        {/* {user[0] && <Navbaar/>} */}
        <Navbaar/>
        <div className='about-main-div'>
                <div className='about-detail'>
                <p className='intro'> 
            <strong className='heading-about '>I AM Ritik Pal.</strong><br/><br/>
                A software developer from Indore, India. 
                On my spare time, I enjoy expanding my programming knowledge and building applications, 
                particularly web and mobile. Aside from programming, I like writing, exercising, and traveling. 
                Listen to some of my programming favorites on the right/top. Thanks for visiting my page.
                <hr/>
                <ul className="social-media-list">
                <a href={Ritik_pal_resume} download="Ritik_pal_resume.pdf" style={{textDecoration:"none",color:"white",}}>
                    <i className="fas fa-arrow-alt-circle-down icons download-cv contact-icon" title='Download CV'> Download CV</i>
                </a>
                </ul>
                {/* <div className='social-icon' >
                Social 
                <i className="fab fa-linkedin mx-3 icons"></i>
                <i className="fab fa-twitter mx-3 icons"></i>
                <i className="fab fa-instagram mx-3 icons"></i>
                <i className="fas fa-arrow-alt-circle-down mx-3 icons"></i>
                </div> */}
                
                </p>
                </div>
        </div>
        <div className='my-d bg-dark '>
        <div className='my-jd'>
                    <center><h1 className='my-j'>Work i have done in</h1></center>
                </div>
             <Roadmap/>
        </div>
            <div className='contact-div pb-5' >
            <center><h1 className='contact-me'>Contact Me</h1></center>                
            <div className="contact-wrapper">
                <form id="contact-form" className="form-horizontal" role="form">
                <div className="form-group">
                    <div className="col-sm-12">
                    <input type="text" className="form-control bg-dark border-0" id="name" placeholder="NAME" name="name" value="" required/>
                    </div>
                </div><br/>
                <div className="form-group">
                    <div className="col-sm-12">
                    <input type="email" className="form-control bg-dark border-0" id="email" placeholder="EMAIL" name="email" value="" required/>
                    </div>
                </div><br/>
                <textarea className="form-control bg-dark border border-0" rows="10" placeholder="MESSAGE" name="message" required></textarea>
                <button className="btn btn-info send-button" id="submit" type="submit" value="SEND">
                    <div className="alt-send-button">
                    <i className="fa fa-paper-plane"></i><span className="send-text">SEND</span>
                    </div>
                </button>
                </form>
                <div className="direct-contact-container">
                    <ul className="contact-list">
                    <li className="list-item"><i className="fa fa-map-marked fa-2x"><span className="contact-text place">Indore, India</span></i></li>
                    <li className="list-item"><i className="fa fa-phone fa-2x"><span className="contact-text phone"><a href="tel:1-212-555-5555" title="Give me a call">+91 9399493350</a></span></i></li>
                    <li className="list-item"><i className="fa fa-envelope fa-2x"><span className="contact-text gmail"><a href="mailto:#" title="Send me an email">palsaitrtik022@gmail.com</a></span></i></li>
                    </ul>
                    <ul className="social-media-list">
                    <li>
                        <a href="#" target="_blank" className="contact-icon">
                         <i className="fab fa-github"></i>
                    </a>
                    </li>
                    <li><a href="#" target="_blank" className="contact-icon">
                    <i className="fab fa-twitter mx-3 icons-twt"></i></a>
                    </li>
                    <li><a href="#" target="_blank" className="contact-icon">
                    <i className="fab fa-linkedin mx-3 icons-link"></i></a>
                    </li>
                    <li><a href="#" target="_blank" className="contact-icon">
                    <i className="fab fa-instagram mx-3 icons-insta"></i></a>
                    </li>       
                    </ul>
                    <hr/>
                </div>
                    </div>
            </div>
            <div className='bg-dark h-50 pt-3 pb-3'>
                    <div className="copyright">&copy; ALL OF THE RIGHTS RESERVED</div>
            </div>  
        {/* <hr/><center>
            <div className="modal-div">
                <h3>Contact me</h3><br/>
                <form>
                    <div className="test">
                        <input type="email"  
                            placeholder="Type your Name"
                            id="exampleFormControlInput1"
                            className="form-control"   
                            value={formData.Name.value}
                            onChange={(e) => {handleChange("Name", e.target.value);}}/>&nbsp;
                        <input type="email" 
                            placeholder="Type your Name"
                            id="exampleFormControlInput1"
                            className="form-control"   
                            value={formData.Email.value}
                            onChange={(e) => {handleChange("Email", e.target.value,formData,setFormData);}}/>
                    </div>
                        <div className="form-group">
                            &nbsp;
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                value={formData.message.value}
                                onChange={(e) => {handleChange("message", e.target.value,formData,setFormData);}}>
                            </textarea>
                        </div><br/>
                    <button type="button" Disabled={isEnable()} className="btn btn-primary" onClick={(e) => handleSendMessage(e)}>Send message</button>
                </form>
            </div>
        </center> */}
    </>
    )
}