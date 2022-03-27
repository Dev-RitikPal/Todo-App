import React from 'react'

export const Select = (props) =>{

    const {  value,title, handlechange, list, className } = props;

    return(
        <>
        <select  
        title={title}
          value={value}
          className={className}
          onChange={handlechange}>
            <option>{title}</option>
            {
              list.map((item)=>(
                <option value={item.id}>
                  {item.name}
                </option>
              ))
            }
        </select>
      </>
    )
}