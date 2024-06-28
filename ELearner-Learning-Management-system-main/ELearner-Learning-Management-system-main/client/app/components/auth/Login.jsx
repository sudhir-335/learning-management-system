"use client"
import React, { useEffect } from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from "react-icons/fc"
import { styles } from '../../styles/style'
import { useLoginMutation } from '@/redux/features/auth/authApi'
import toast from 'react-hot-toast'
import { signIn } from "next-auth/react"
const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email!").required("Email is required!"),
  password: Yup.string().required("Password is required!").min(6, "Password must be at least 6 characters")
})



function Login({ setRoute, setOpen }) {
  const [show, setShow] = React.useState(false);
  const [login, { isSuccess, data, isError, error }] = useLoginMutation();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password })
    }
  })


  useEffect(() => {
    if (isSuccess) {
      console.log(data)
      toast.success('Login Successfully')
      setOpen(false)
    }
    if (error) {
      if ("data" in error) {
        const errorData = error
        toast.error(errorData.data.message)
      }
    }
  }, [isSuccess, error])

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = formik;

  return (
    <div className='w-full'>
      <h1 className={`${styles.title}`}>
        Login with ELearner
      </h1>
      <form onSubmit={handleSubmit}>
        <div className='w-full mt-5 relative mb-1'>
          <label htmlFor="email" className={`${styles.label}`}>
            Enter Your Email
          </label>
          <input type="email"
            name=''
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder='loginmail@gmail.com'
            className={`${errors.email && touched.email ? "border-red-500" : "border-gray-300"
              } ${styles.input}`} />
          {errors.email && touched.email && (
            <span className='text-red-500 pt-2 block'>{errors.email}</span>
          )}
        </div>

        <div className='w-full mt-5 relative mb-1'>
          <label htmlFor="password" className={`${styles.label}`}>
            Enter Your Password
          </label>
          <input
            type={show ? "text" : "password"}
            name='password'
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder='password'
            className={`${errors.password && touched.password ? "border-red-500" : "border-gray-300"
              } ${styles.input}`}
          />

          {errors.password && touched.password && (
            <span className='text-red-500 pt-2 block'>{errors.password}</span>
          )}
        </div>
        <div className='w-full mt-5'>
          <input type="submit"
            value="Login"
            className={`${styles.button}`} />
        </div>
        <br />
        <h5 className='text-center font-Poppins pt-4 text-[14px] text-black dark:text-white'>
          or join with
        </h5>
        <div className='flex items-center justify-center my-3'>
          <FcGoogle className='cursor-pointer mr-2' size={30}
            onClick={() => { signIn("google") }} />
          <AiFillGithub className='cursor-pointer ml-2  dark:text-white text-black ' size={30}
            onClick={() => { signIn("github") }} />
        </div>
        <h5 className='text-center font-Poppins pt-4 text-[14px] text-black dark:text-white'>
          Not have any account? <span onClick={() => setRoute('Sign-Up')} className='text-[#f50057] cursor-pointer pl-1'>Sign Up</span>
        </h5>
        <br />
      </form>
    </div >
  )
}

export default Login