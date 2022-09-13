import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import './Dashboard.css'

import { Navbaar } from '../../Containers'

export const Dashboard = () => {

    // const activetasks = useSelector((state) => state?.todos);
// const alldata = useSelector((state)=>state)
    // console.log("🚀 ~ file: DashBoard.js ~ line 13 ~ Dashboard ~ alldata", alldata)
    
    return (
        <>
        <Navbaar/><br/>
            <h1> Dashboard</h1> 
            <Link to='/todos'><i className="fas tiles fa-list"></i></Link>   
            <Link to='/blogs'><i className="fas tiles fa-blog"></i></Link>    
            {/* <span className='badge bg-danger rounded-pill' title='Active tasks' >{activetasks.filter(x=>x.status === "Active").length}</span> */}
        </>
    )
}