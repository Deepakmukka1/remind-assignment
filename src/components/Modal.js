import React from 'react'

const Modal = ({time,func}) => {
    setTimeout(()=>{
       func("")
    },1000)
    return (
        <div>
            <h4>Hello</h4>
        </div>
    )
}

export default Modal
