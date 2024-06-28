import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BiSearch } from 'react-icons/bi'
function Hero(props) {
  return (
    <div className='w-full 1000px:flex items-center'>

      <div className='absolute  left-[50px] top-[100px] 1000px:top-[unset] 1500px:w-[700px] 1500px:h-[700px] 1100px:w-[600px] 1100px:w-[600px]  h-[75vh] w-[75vh] hero-animation rounded-full  bg-gray-500 opacity-50 z-0 animate-spin'></div>
      <div className='1000px:w-[40%]  flex 1000px:min-h-screen items-center justify-end pr-[50px] pt-[70px] 1000px:pt-[0] z-10'>
        <Image
          src={require('../../public/assets/banner-img-1.png')}
          alt='hero'
          className='object-contain 1100px:max-w-[50%]  w-[70%] 1500px:max-w-[85%] h-[auto] z-[10]'
        />
      </div>
      <div className='1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]'>
        <h2 class="dark:text-white text-[#000000c7] text-[30px] sm:text-[20px] md:text-[50px] font-semibold font-Josefin  w-[65%] leading-[65px] 1800px:leading-[75px] py-2 px-2">
          Improve Your Online Learning Experience Better Instantly
        </h2>
        <p className='dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%] px-4 py-2'>
          We have 40K+ online courses And 500K+ online registered student.
          <br />
          Find your desired courses from them.
        </p>
        <br />
        <div className='1500px:w-[55%] 1100px:w-[78%] w-[65%] ml-5 h-[50px] bg-transparent relative'>
          <input type="search"
            placeholder='Search courses...'
            className='bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin'
          />
          <div className='absolute flex items-center justify-center w-[50px] h-[50px] cursor-pointer right-0 top-0
          bg-[#39c1f3] rounded-r-[5px]'>
            <BiSearch className='text-white' size={30} />
          </div>
        </div>
        <br />
        <div className='1500px:w-[55%] 1100px:w-[78%] w-[70%] ml-5 px-10 flex items-center'>
          <Image
            src={require("../../public/assets/client-1.jpg")}
            alt='client1'
            className='rounded-full ml-[-20px]' />
          <Image
            src={require("../../public/assets/client-2.jpg")}
            alt='client1'
            className='rounded-full ml-[-20px]' />
          <Image
            src={require("../../public/assets/client-3.jpg")}
            alt='client1'
            className='rounded-full ml-[-20px]' />
          <p className='font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] font-'>
            500K+ students have already trusted us.{" "}
            <Link href={"/courses"}
              className='dark:text-[#46e256] text-[crimson]'>
              View courses
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Hero