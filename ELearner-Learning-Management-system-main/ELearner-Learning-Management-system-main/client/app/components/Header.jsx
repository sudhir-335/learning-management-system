
"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { NavItems } from "../utils/NavItems"
import ThemeSwitcher from "../utils/ThemeSwitcher"
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from 'react-icons/hi'
import CustomModal from '../utils/CustomModal'
import Login from './auth/Login'
import SignUp from './auth/SignUp'
import Verification from './auth/Verification'
import { useSelector } from 'react-redux'
import userDP from "../../public/assets/user.svg"
import { useSession } from 'next-auth/react'
import { useLogOutQuery, useSocialAuthMutation } from '@/redux/features/auth/authApi'
import toast from 'react-hot-toast'



export default function Header({ open, setOpen, activeItem, route, setRoute }) {
  const [active, setActive] = React.useState(false)
  const [openSidebar, setOpenSidebar] = React.useState(false)
  const { user } = useSelector(state => state.auth)
  const { data } = useSession()
  const [socialAuth, { isSuccess, isError, error }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false)
  const { } = useLogOutQuery(undefined, { skip: !logout ? true : false });
  useEffect(() => {
    if (!user) {
      if (data) {
        console.log(`data : ${data.user}`)
        const avatar = data.user.image ? data.user.image : userDP
        socialAuth({ email: data.user.email, name: data.user.name, avatar })
      }
    }


    if (data === null) {
      // setOpen(false)
      if (isSuccess) {
        toast.success('Login Successfully')
      }
    }

    if (data === null) {
      setLogout(true)
    }
  }, [data, user])


  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 85) {
        setActive(true)
      } else {
        setActive(false)
      }
    })
  }

  function handleClose(e) {
    if (e.target.id === 'screen') {
      setOpenSidebar(false)
    }
  }




  return (
    <div className='w-full relative'>
      <div className={`${active
        ? "dark:bg-opacity-50  dark:bg-gradient-to-b   dark:from-gray-900  dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff] shadow-xl transition duration-500"
        : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"}`}>
        <div className='w-[95%] 800px:w-[92%] m-auto py-2 h-full'>
          <div className='w-full h-[80px] flex items-center justify-between p-3'>
            <div>
              <Link href={"/"}
                className='text-[25px] font-Poppins font-[500] text-black dark:text-white'>
                ELearner
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems
                activeItem={activeItem}
                isMobile={false}
              />
              <ThemeSwitcher />
              {/* only for Mobile */}
              <div className='800px:hidden'>
                <HiOutlineMenuAlt3
                  size={30}
                  className='dark:text-white text-black cursor-pointer'
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              {
                user ? (
                  <Link href={"/profile"}>
                    <Image
                      src={user.avatar ? user.avatar.url : userDP}
                      alt='Image'
                      width={25}
                      height={25}
                      className='w-[25px] h-[25px] rounded-full cursor-pointer ml-3 hidden 800px:block'
                      style={{ border: activeItem === 5 ? "2px solid #ffc107" : "" }}
                    />
                  </Link>

                )
                  : (<HiOutlineUserCircle
                    size={25}
                    className='dark:text-white text-black cursor-pointer ml-3 hidden 800px:block'
                    onClick={() => setOpen(true)}
                  />
                  )
              }

            </div>
          </div>
        </div>
        {/* mobile side bar */}
        {
          openSidebar && (
            <div
              className='fixed w-full h-screen top-0 left-0 z-[9999] dark:bg-[unset] bg-[00000024]'
              onClick={handleClose}
              id="screen">
              <div
                className='w-70% fixed z-999999999 h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0'>
                <NavItems activeItem={activeItem} isMobile={true} />
                <HiOutlineUserCircle
                  size={25}
                  className='dark:text-white ml-5 my-2 text-black cursor-pointer '
                  onClick={() => setOpen(true)}
                />
                <br />
                <br />
                <p className='text-16px px-2 pl-5 text-black dark:text-white'>
                  Copyright &copy 2024 ELearning
                </p>
              </div>
            </div>

          )
        }
      </div>
      {
        route === "Login" && (
          <>
            {
              <CustomModal
                open={open}
                setOpen={setOpen}
                setRoute={setRoute}
                activeItem={activeItem}
                Component={Login}
              />
            }
          </>
        )
      }
      {
        route === "Sign-Up" && (
          <>
            {
              <CustomModal
                open={open}
                setOpen={setOpen}
                setRoute={setRoute}
                activeItem={activeItem}
                Component={SignUp}
              />
            }
          </>
        )
      }
      {
        route === "Verification" && (
          <>
            {
              <CustomModal
                open={open}
                setOpen={setOpen}
                setRoute={setRoute}
                activeItem={activeItem}
                Component={Verification}
              />
            }
          </>
        )
      }
    </div >
  )
}