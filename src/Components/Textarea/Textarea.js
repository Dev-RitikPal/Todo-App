import React from 'react'

export const Textarea = (props) =>{
  
    const { type, placeHolder, value, handlechange } = props;

    return(
      <div>
        <textarea   
          type={type}
          placeholder={placeHolder}
          value={value}
          onChange={handlechange} />
    </div>
    )
}