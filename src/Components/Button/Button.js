import React from 'react'

export const Button = (props) =>{

    const { type, title, Disabled, onClick } = props;
    
    return(
        <button 
        type = {type}
        disabled = {Disabled}
        onClick={onClick}>
        {title}</button>
    )
}