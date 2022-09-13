import React from 'react'
import { useState, useEffect } from 'react/cjs/react.development'

const Demo = () => {
    const [state, setState] = useState("Demo")
    useEffect(() => {
        setState("test")
    }, [])
    const add = (a,b) => {
        return a+b
    }
    // setState("test")
  return (
    <div>{()=>add(2,4)}</div>
  )
}

export default Demo