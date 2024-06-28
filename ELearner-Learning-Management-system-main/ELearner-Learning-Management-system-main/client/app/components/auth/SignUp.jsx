"use client"
import React, { useEffect } from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from "react-icons/fc"
import { styles } from '../../styles/style'
import { useRegisterMutation } from '@/redux/features/auth/authApi'
import { toast } from "react-hot-toast"
const schema = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
  email: Yup.string().email("Invalid email!").required("Email is required!"),
  password: Yup.string().required("Password is required!").min(6, "Password must be at least 6 characters")
})



function SignUp({ setRoute }) {
  const [show, setShow] = React.useState(false);
  const [register, { isError, data, isSuccess, error }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data.message || "Registration Successful";
      toast.success(message);
      setRoute('Verification')
    }
    if (error) {
      if ("data" in error) {
        const errorData = error
        toast.error(errorData.data.message)
      }
    }
  }, [isSuccess, error])



  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      const data = {
        name, email, password
      }
      console.log(data)
      await register(data)
    }
  })

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = formik;

  return (
    <div className='w-full'>

      <h1 className={`${styles.title}`}>
        Sign Up To ELearner
      </h1>

      <form onSubmit={handleSubmit}>
        <div className='w-full mt-5 relative mb-1'>
          <label htmlFor="email" className={`${styles.label}`}>
            Enter Your Name
          </label>
          <input type="text"
            name=''
            value={values.name}
            onChange={handleChange}
            id="name"
            placeholder='John Doe'
            className={`${errors.name && touched.name ? "border-red-500" : "border-gray-300"
              } ${styles.input}`} />
          {errors.name && touched.name && (
            <span className='text-red-500 pt-2 block'>{errors.name}</span>
          )}
        </div>

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
            value="Sign Up"
            className={`${styles.button}`} />
        </div>
        <br />
        <h5 className='text-center font-Poppins pt-4 text-[14px] text-black dark:text-white'>
          or join with
        </h5>
        <div className='flex items-center justify-center my-3'>
          <FcGoogle className='cursor-pointer mr-2' size={30} />
          <AiFillGithub className='cursor-pointer  dark:text-white text-black' size={30} />
        </div>
        <h5 className='text-center font-Poppins pt-4 text-[14px] text-black dark:text-white'>
          Already have an account? <span onClick={() => setRoute('Login')} className='text-[#f50057] cursor-pointer pl-1'>Sign In</span>
        </h5>
        <br />
      </form>
    </div >
  )
}

export default SignUp