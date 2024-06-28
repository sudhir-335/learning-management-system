"use client"

import React from 'react'
import Heading from '../utils/Heading'
import AdminSidebar from "../components/admin/sidebar/AdminSidebar"
import AdminProtected from '../hooks/adminProtected'
import DashBoardHero from '../components/admin/DashBoardHero'
function page() {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="ELearner"
          description="ELearner students favourite online learning platform"
          keywords="Programming,MERN,Redux"
        />
        <div className='flex h-[200vh]'>
          <div className='1500px:w-[16%] w-1/5'>
            <AdminSidebar />
          </div>
          <div className='w-[85%]'>
            <DashBoardHero />
          </div>
        </div>
      </AdminProtected>
    </div>
  )
}

export default page