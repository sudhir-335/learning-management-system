"use client"
import React, { useState, useRef, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { VscWorkspaceTrusted } from 'react-icons/vsc'
import { styles } from '../../styles/style'
import { useSelector } from "react-redux"
import { useActivationMutation } from '@/redux/features/auth/authApi'



function Verification({ setRoute }) {
  const { token } = useSelector((state) => state.auth)
  const [activation, { isSuccess, error }] = useActivationMutation();
  const [invalidError, setInvalidError] = useState(false)

  useEffect(() => {
    console.log(isSuccess)
    if (isSuccess) {
      toast.success("Account activated successfully")
      setRoute("Login")
    }
    else if (error) {
      if ("data" in error) {
        const errorData = error
        toast.error(errorData.data.message)
        setInvalidError(true)
      }
      else {
        console.log('an error occured:', error);
      }
    }
    else {

      console.log("Hello")
    }
  }, [isSuccess, error])




  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]


  const verificationHandler = async (e) => {
    const verificationNumber = Object.values(verifyNumber).join("");
    if (verificationNumber.length !== 6) {
      setInvalidError(true);
      return;
    }
    await activation({
      activation_Token: token,
      activation_Code: Number(verificationNumber)
    })
  }
  const [verifyNumber, setVerifyNumber] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: ""
  })

  function handleInputChange(index, value) {
    setInvalidError(false)
    const newVerifyNumber = { ...verifyNumber, [index]: value }
    setVerifyNumber(newVerifyNumber)
    if (value === "" && index > 0) {
      inputRefs[index - 1].current.focus()
    }
    else if (value.length === 1 && index < 5) {
      inputRefs[index + 1].current.focus()
    }
  }
  return (
    <div>
      <h1 className={`${styles.title}`}>
        verify your account
      </h1>
      <br />
      <div className='w-full flex items-center justify-center mt-2'>
        <div className='w-[80px] h-[80px] rounded-full bg-[#497df2] flex items-center justify-center' >
          <VscWorkspaceTrusted size={40} color='#ffffff' />
        </div>
      </div>
      <br />
      <br />
      <div className='1100px:w-[70%]  m-auto flex items-center justify-around' >
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            key={key}
            ref={inputRefs[index]}
            type="number"
            value={verifyNumber[key]}
            onChange={(e) => handleInputChange(index, e.target.value)}
            className={`w-[55px] h-[55px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center font-Poppins text-center text-[18px] outline-none ${invalidError ? 'shake border-red-500' : 'dark:border-white border-[#497df2]'
              }`}
            placeholder=''
            maxLength={1}
          />
        ))}
      </div>
      <br />
      <br />
      <div className='w-full flex justify-center'>
        <button
          className={`${styles.button}`}
          onClick={() => { verificationHandler() }}
        >
          Verify OTP
        </button>
      </div>
      <br />
      <h5 className='text-center pt-4 font-Poppins text-[14px] text-black dark:text-white'>
        Go back to Sign In?{" "}
        <span
          className='text-[#2190ff] cursor-pointer pl-1'
          onClick={() => setRoute("Login")}
        >
          Sign In
        </span>
      </h5>
    </div >
  )
}

export default Verification