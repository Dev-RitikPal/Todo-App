import React from 'react'

export const Input = (props) =>{
  
    const { type, placeHolder, value, handlechange } = props;

    return(
      <div>
        <input
          type={type}
          placeholder={placeHolder}
          value={value}
          onChange={handlechange} />
    </div>
    )
}