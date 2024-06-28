"use client"
import Heading from '../../utils/Heading'
import DashBoardHero from '../../components/admin/DashBoardHero'
import AdminSidebar from '../../components/admin/sidebar/AdminSidebar'
import AdminProtected from '../../hooks/adminProtected'
import AllUsers from '../../components/admin/Users/AllUsers'
import React from 'react'

function page() {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="ELearner"
          description="ELearner students favourite online learning platform"
          keywords="Programming,MERN,Redux"
        />
        <div className='flex h-screen'>
          <div className='1500px:w-[16%] w-1/5'>
            <AdminSidebar />
          </div>
          <div className='w-[85%]'>
            <DashBoardHero />
            <AllUsers />
          </div>
        </div>
      </AdminProtected>
    </div>
  )
}

export default page