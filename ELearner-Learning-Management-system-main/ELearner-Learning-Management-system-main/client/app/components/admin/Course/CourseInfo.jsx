"use client"
import React, { useState } from 'react'
import { styles } from "../../../styles/style"
function CourseInfo({ courseInfo, setCourseInfo, setActive, active }) {
  const [dragging, setDragging] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    setActive(active + 1)
    console.log(courseInfo)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {

      const reader = new FileReader()
      reader.onloadend = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }


  const handleDragOver = (e) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    // setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result })
      }
      reader.readAsDataURL(file)
    }
    setDragging(false)
  }
  return (
    <div className='w-[80%] m-auto mt-16'>
      <form onSubmit={handleSubmit}>
        <div className='mb-5'>
          <label htmlFor="" className={`${styles.label} `}>
            Course Name
          </label>
          <input
            type="name"
            name=''
            required
            value={courseInfo.name}
            onChange={(e) => setCourseInfo({ ...courseInfo, name: e.target.value })}
            id='name'
            placeholder="Mern Stack With Next.js"
            className={`${styles.input}`}
          />
        </div>
        {/* <br /> */}
        <div className='mb-5'>
          <label htmlFor="" className={`${styles.label}`}>
            Course Description
          </label>
          <textarea name="" id="" cols={30} rows={8} className={`${styles.input} !h-min !py-2`}
            placeholder='Write Something Amazing .....'
            value={courseInfo.description}
            onChange={(e) => setCourseInfo({ ...courseInfo, description: e.target.value })}>
          </textarea>
        </div>
        {/* <br /> */}
        <div className='w-full flex justify-between mb-5'>
          <div className='w-[45%]'>
            <label htmlFor="" className={`${styles.label}`}>
              Course Price
            </label>
            <input
              type="number"
              name=''
              required
              value={courseInfo.price}
              onChange={(e) => setCourseInfo({ ...courseInfo, price: e.target.value })}
              id='price'
              placeholder="29"
              className={`${styles.input}`}
            />
          </div>
          <div className='w-[50%]'>
            <label htmlFor="" className={`${styles.label} w-[50%]`}>
              Estimated Price (Optional)
            </label>
            <input
              type="number"
              name=''
              value={courseInfo.extimatedPrice}
              onChange={(e) => setCourseInfo({ ...courseInfo, extimatedPrice: e.target.value })}
              id='price'
              placeholder="79"
              className={`${styles.input}`}
            />
          </div>
        </div>
        {/* <br /> */}
        <div className='w-full flex justify-between mb-5'>
          <div className='w-[45%]'>
            <label htmlFor="" className={`${styles.label}`}>
              Course Level
            </label>
            <input
              type="text"
              name=''
              required
              value={courseInfo.level}
              onChange={(e) => setCourseInfo({ ...courseInfo, level: e.target.value })}
              id='price'
              placeholder="Beginner/Intermediate/Advanced"
              className={`${styles.input}`}
            />
          </div>
          <div className='w-[50%]'>
            <label htmlFor="" className={`${styles.label} w-[50%]`}>
              Demo URL
            </label>
            <input
              type="text"
              name=''
              required
              value={courseInfo.demoUrl}
              onChange={(e) => setCourseInfo({ ...courseInfo, demoUrl: e.target.value })}
              id='price'
              placeholder="3erty6"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className={`${styles.label}`}>
            Course Tags
          </label>
          <input
            type="text"
            name=''
            required
            value={courseInfo.tags}
            onChange={(e) => setCourseInfo({ ...courseInfo, tags: e.target.value })}
            id='tags'
            placeholder="MERN ,Next.js,Socket.io,Tailwind Css,LMS"
            className={`${styles.input}`}
          />
        </div>

        <br />
        <div className='w-full mb-10'>
          <input
            type="file"
            id='file'
            onChange={handleFileChange}
            className='hidden'
            accept='image/*' />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${dragging ? "bg-blue-500" : "bg-transparent"}`
            }
            onDragOver={handleDragOver}
            onDragLeave={handleDragEnter}
            onDrop={handleDrop}>
            {
              courseInfo.thumbnail ? (
                <img src={courseInfo.thumbnail} alt="" className='max-h-full w-full object-cover' />
              ) : (
                <span className='text-black dark:text-white'>
                  Drag and Drop or Click to Upload Thumbnail
                </span>
              )
            }
          </label>
        </div>
        {/* <br /> */}
        <div
          className='w-full flex items-center justify-end'>
          <input type="submit"
            value="Next"
            className='w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-3 mb-3 cursor-pointer' />
        </div>
      </form >
    </div >
  )
}

export default CourseInfo