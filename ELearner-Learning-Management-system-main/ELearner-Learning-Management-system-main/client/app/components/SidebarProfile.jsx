import React from 'react'
import defaultAvatar from "../../public/assets/user.svg"
import Image from 'next/image'
import { RiLockPasswordLine } from 'react-icons/ri'
import { SiCoursera } from 'react-icons/si'
import { AiOutlineLogout } from 'react-icons/ai'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import Link from 'next/link'
function SidebarProfile({ user, active, setActive, avatar, logoutHandler }) {
  return (
    <div className='w-full'>


      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 1 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`}
        onClick={() => setActive(1)}
      >
        <Image
          src={user.avatar || avatar ? user.avatar.url || avatar : defaultAvatar}
          alt=''
          width={20}
          height={20}
          className='w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] rounded-full'
        />
        <h5 className='pl-2 800px:block hidden font-Poppins font-semibold text-black dark:text-white'>
          My Account
        </h5>
      </div>


      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer  ${active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine className='size-{30}  dark:text-white text-black' />
        <h5 className='pl-2 800px:block hidden font-Poppins font-semibold text-black dark:text-white'>
          Change Password
        </h5>
      </div>


      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer  ${active === 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`}
        onClick={() => setActive(3)}
      >
        <SiCoursera className='size-{30}  dark:text-white text-black ' />
        <h5 className='pl-2 800px:block hidden font-Poppins font-semibold text-black dark:text-white'>
          Enrolled Courses
        </h5>
      </div>


      {
        user.role === "admin" && (
          <Link
            href='/admin'
            className={`w-full flex items-center px-3 py-4 cursor-pointer  ${active === 6 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`}
          >
            <MdOutlineAdminPanelSettings className='size-{30}  dark:text-white text-black ' />
            <h5 className='pl-2 800px:block hidden font-Poppins font-semibold text-black dark:text-white'>
              Admin DashBoard
            </h5>
          </Link>

        )
      }

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer  ${active === 4 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`}
        onClick={() => logoutHandler()}
      >
        <AiOutlineLogout className='size-{30} dark:text-white text-black' />
        <h5 className='pl-2 800px:block hidden font-Poppins font-semibold text-black dark:text-white'>
          Log Out
        </h5>
      </div>

    </div >
  )
}

export default SidebarProfile