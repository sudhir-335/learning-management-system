"use client"
import React, { useState } from 'react'
import SidebarProfile from './SidebarProfile'
import { useLogOutQuery } from '@/redux/features/auth/authApi'
import { signOut } from 'next-auth/react'
import toast from 'react-hot-toast'
import ProfileInfo from './ProfileInfo'
import ChangePassword from './ChangePassword'
function Profile({ user }) {
  const [scroll, setScroll] = useState(false)
  const [avatar, setAvatar] = useState(null)
  const [active, setActive] = useState(false)
  const [logout, setLogout] = useState(false)
  const { } = useLogOutQuery(undefined, { skip: !logout ? true : false });

  const logoutHandler = async () => {
    setLogout(true)
    await signOut()
    toast.success('Logout Successfully')
  }


  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 85) {
        setActive(true)
      } else {
        setActive(false)
      }
    })
  }



  return (
    <div className='w-[85%] flex mx-auto'>
      <div className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 border bg-white dark:border-[#ffffff1d] border-[#0000002c] rounded-[5px] dark:shadow-sm shadow-xl mt-[80px] mb-[80px] sticky ${scroll ? "top-[120px]" : "top-[30px]"} left-[30px]`}>


        <SidebarProfile
          user={user}
          active={active}
          setActive={setActive}
          avatar={avatar}
          logoutHandler={logoutHandler}
        />

      </div>
      {
        active === 1 && (
          <div className='w-full h-full bg-transparent mt-[80px]'>

            <ProfileInfo avatar={avatar} user={user} />
          </div>
        )
      }
      {
        active === 2 && (
          <div className='w-full h-full bg-transparent mt-[80px]'>

            <ChangePassword />
          </div>
        )
      }
    </div>
  )
}

export default Profile