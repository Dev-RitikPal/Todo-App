import { React, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import './Navbaar.css'
import 'react-toastify/dist/ReactToastify.css';

import { GetUserdata, getUserdata, UserLogout, userLogout } from '../../Firebase';
import { handleErrors } from '../../Utils';
import { GetUserData } from '../../Redux/Action/Actions';

export const Navbaar = () => {
    
    const history = useNavigate()
    const dispatch = useDispatch();
    const user = useSelector((state)=>state?.userData?.data);
    const [displayNone, setDisplayNone] = useState('')    
    
    useEffect(()=>{
        getuserdata();       
    },[])

    const getuserdata = async () => {

        try {
            const res = await GetUserdata(); 
            if (res) {  
                dispatch(GetUserData(res)) 
            } else {
                toast.error("Username Not Found")
            }
        } catch (error) {
            toast.error(handleErrors(error))
        }     
    }

    const handleLogout = async () =>{
        try {
            UserLogout().then(item=>{                
                toast.success("loggout successfully")
                window.location.pathname='/';  
            })
        } catch (error) {
            toast.error(handleErrors(error))
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
                {/* <span className="navbar-brand text-white  "> */}
                     
                {/* </span> */}
                <button 
                    className="navbar-toggler mx-2" 
                    type="button" data-toggle="collapse" 
                    data-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    onClick={()=>setDisplayNone(displayNone == '' ? 'd-none' : '')}
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon text-white "></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {/* <li className="nav-item ">
                            <span className="nav-link"><Link className="menu-tabs" to="/dashboard">Dashboard</Link></span>
                        </li> */}
                        <li className="nav-item">
                            <span className="nav-link" title='Portfolio@Ritik' ><Link className="menu-tabs mx-3" to={`/portfolio/${"Ritik-Pal"}`}>Portfolio</Link></span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link" title='Todo app' ><Link className="menu-tabs mx-3" to="/todo-app">Todo app</Link></span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link" title='Todo app' ><Link className="menu-tabs mx-3" to="/blogs">Blogs</Link></span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link" title='Typing test' ><Link className="menu-tabs mx-3" to="/test-typing">Typing test</Link></span>
                        </li>
                    </ul>
                </div>
                <div className="mx-3">
                    <span  id="imageDropdown" className={displayNone} data-toggle="dropdown">
                        <img src={user?.profileimage ? user?.profileimage : 'https://img.icons8.com/officel/50/000000/test-account.png'} className='mx-3 profile-photo' alt='profile' title='Profile' />               
                    </span>
                    <ul className="dropdown-menu show-profile-dropdown" role="menu" aria-labelledby="imageDropdown">
                        <li className='dropdown-text-username'>HI,{user?.username} </li><hr/>
                        <li role="presentation" className='dropdown-text' onClick={()=>(history.push('/profile'))} >View Profile</li>
                        <li role="presentation" className='dropdown-text' onClick={handleLogout} >Logout</li>
                    </ul>
                </div>
            </nav>
        </>
    )
}