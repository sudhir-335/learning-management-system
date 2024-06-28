"use client"
import React from 'react'
import AdminSidebar from '../../components/admin/sidebar/AdminSidebar'
import Heading from '../../utils/Heading'
import CreateCourse from '../../components/admin/Course/CreateCourse'
import DashboardHeader from '../../components/admin/DashboardHeader'
function page() {
  return (
    <div>
      <Heading
        title="ELearner"
        description="ELearner students favourite online learning platform"
        keywords="Programming,MERN,Redux"
      />
      <div className='flex '>
        <div className='1500px:w-[16%] w-1/5'>
          <AdminSidebar />
        </div>
        <div className='w-[85%]'>
          <DashboardHeader />
          <CreateCourse />
        </div>
      </div>
    </div>
  )
}

export default page