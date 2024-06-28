import React from 'react'
import CoursePlayer from "../../../utils/CoursePlayer"
import { styles } from "../../../styles/style"
import CourseData from './CourseData';
import Ratings from '../../../utils/Ratings';
import { IoCheckmarkDoneOutline } from 'react-icons/io5'
function CoursePreview({ active, setActive, courseData, handleCourseCreate }) {


  const discountPercentage = Math.floor((courseData.EstimatedPrice - courseData.price) / courseData.EstimatedPrice * 100)

  const discountPercentagePrice = discountPercentage.toFixed(0);


  const handlePrev = () => {
    setActive(active - 1)
  }

  const handleOptions = () => {
    handleCourseCreate()
  }


  return (
    <div className='w-[90%]  m-auto py-5 mb-5'>
      <div className="w-full relative">
        <div className='w-full mt-10'>
          <CoursePlayer
            videoUrl={courseData.demoUrl}
            title={courseData.title}
          />
        </div>
        <div className='flex items-center'>
          <h1 className='pt-5 text-[25px]'>
            {courseData.price === 0 ? "Free" : courseData.price + " USD"}
          </h1>
          <h5 className='pl-3 text-[20px] mt-2 line-through opacity-80'>
            {courseData.EstimatedPrice + " USD"}
          </h5>
          <h4 className='pl-5 pt-4 text-[22px]'>
            {discountPercentagePrice}% OFF
          </h4>
        </div>
        <div className='flex items-center'>
          <div
            className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-white rounded mt-5 mb-3  cursor-pointer'>
            Buy Now {courseData.price + "$"}
          </div>
        </div>
        <div className='flex items-center'>
          <input type="text"
            name=""
            id=""
            placeholder="Enter Coupon Code"
            className={`${styles.input} 800px:w-[180px] h-[40px] rounded border px-2 outline-none mt-5 font-Poppins`}
          />
          <div className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-white rounded mt-5 mb-3 ml-4 cursor-pointer'>
            Apply
          </div>
        </div>
        <p className='pb-1'>Source Code Included</p>
        <p className='pb-1'>Full Lifetime Access</p>
        <p className='pb-1'>Certification on Completion</p>
        <p className='pb-1'>Premius Support</p>
      </div>
      <div className='w-full'>
        <div className='w-full 800px:pr-5'>
          <h1 className='text-[25px] font-Poppins font-[600]'>
            {courseData.name}
          </h1>
          <div className='flex items-center justify-between pt-3'>
            <div className='flex items-center'>
              <Ratings rating={3} />
              <h5>0 Reviews</h5>
            </div>
            <h5>0 Students</h5>
          </div>
          <br />
        </div>

        <br />
        <br />
        <div className='w-full'>
          <h1 className='text-[25px] font-Poppins font-[600]'>
            Course Details
          </h1>
          {
            courseData.description
          }
        </div>
        <div className='w-full flex justify-between'>

          <div className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 mb-3 cursor-pointer'
            onClick={handlePrev}>
            Prev
          </div>
          <div className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 mb-3 cursor-pointer'
            onClick={handleOptions}
          >
            Next
          </div>

        </div>
      </div>

    </div >
  )
}

export default CoursePreview