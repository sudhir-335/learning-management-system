import React from 'react'
import { styles } from "../../../styles/style"
import { AddCircle } from '@mui/icons-material'
import toast from 'react-hot-toast'

function CourseData({ benefits, setBenefits, prerequisites, setPrerequisites, active, setActive }) {

  const handleBenefitChange = (index, value) => {
    const newBenefits = [...benefits]
    newBenefits[index].title = value
    setBenefits(newBenefits)
  }
  const handlePrerequisitesChange = (index, value) => {
    const newPrerequisites = [...prerequisites]
    newPrerequisites[index].title = value
    setPrerequisites(newPrerequisites)
  }

  const handlePrev = () => {
    setActive(active - 1)
  }

  const handleOptions = () => {
    if (benefits[benefits.length - 1].title !== "" && prerequisites[prerequisites.length - 1].title !== "") {
      setActive(active + 1)
    }
    else {
      toast.error('Please fill all the fields')
    }
  }

  return (
    <div className='w-[80%] m-auto mt-24 block'>
      <div>
        <label htmlFor="email" className={`${styles.label}`}>
          What are the benefits for student in this course?
        </label>
        <br />
        {
          benefits.map((benefit, index) => (
            <input type="text"
              key={index}
              name='Benefit'
              placeholder='You will  be able to build a full stack web LMS Platform'
              required
              className={`${styles.input} my-2`}
              value={benefit.title}
              onChange={(e) => handleBenefitChange(index, e.target.value)}
            />
          ))
        }
        <AddCircle
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px", height: "30px" }}
          onClick={() => setBenefits([...benefits, { title: "" }])}
        />
      </div>
      <div>
        <label htmlFor="email" className={`${styles.label}`}>
          What are the prerequisites for this course?
        </label>
        <br />
        {
          prerequisites.map((prerequisites, index) => (
            <input type="text"
              key={index}
              name='Prerequisites'
              placeholder='You will need a basic knowledge of MERN Stack'
              required
              className={`${styles.input} my-2`}
              value={prerequisites.title}
              onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
            />
          ))
        }
        <AddCircle
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px", height: "30px" }}
          onClick={() => setPrerequisites([...prerequisites, { title: "" }])}
        />
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
  )
}

export default CourseData