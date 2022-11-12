
import React from 'react'

const Button = ({ show, showBtn }) => {
  return (
    <>
      {!show ? (
        <button
          className="btnfloat rounded-full p-3 m-3 text-white font-extrabold shadow-xl animate-pulse  bg-gradient-to-r from-green-400 to-blue-500"
          onClick={() => showBtn()}
        >
          <i className="fas fa-plus-circle" aria-hidden="true" style={{color: "blue",fontSize:"27px"}}></i>
        </button>
      ) : (
        <button
          className="btnfloat rounded-full p-3 m-3 text-white font-semibold shadow-xl  bg-gradient-to-r from-green-400 to-blue-500"
          onClick={() => showBtn(!show)}
        >
         <i className="fas fa-plus-circle" aria-hidden="true"></i>
        </button>
      )}
    </>
  )
}

export default Button