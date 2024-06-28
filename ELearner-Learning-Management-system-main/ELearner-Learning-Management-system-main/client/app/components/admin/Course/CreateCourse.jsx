"use client"
import React, { useEffect, useState } from 'react'
import CourseInfo from './CourseInfo';
import CourseOptions from './CourseOptions';
import CourseData from './CourseData';
import CourseContent from './CourseContent';
import CoursePreview from './CoursePreview';
import { useCreateCourseMutation } from '../../../../redux/features/courses/coursesApi';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';
function CreateCourse() {
  const [createCourse, { isLoading, isSuccess, error }] = useCreateCourseMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Created Successfully")
      redirect("/admin/all-courses")
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error;
        toast.error(errorMessage.data.message)
      }
    }

  }, [isLoading, isSuccess, error])
  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState([{ title: "" }])
  const [prerequisites, setPrerequisites] = useState([{ title: "" }])
  const [courseContent, setCourseContent] = useState([{
    title: "",
    videoUrl: "",
    description: "",
    videoSection: "Untitled Section",
    links: [{
      title: "", url: ""
    }],
    suggestions: ""
  }])
  const [courseData, setCourseData] = useState({});
  const handleSubmit = async (e) => {
    // Format benefits Array
    const formattedBenefits = benefits.map(benefit => ({ title: benefit.title }))
    // Format prerequisites Array
    const formattedPrerequisites = prerequisites.map(prerequisite => ({ title: prerequisite.title }))

    // Format courseContent Array
    const formattedCourseContent = courseContent.map(content => ({
      title: content.title,
      videoUrl: content.videoUrl,
      description: content.description,
      videoSection: content.videoSection,
      links: content.links.map(link => ({ title: link.title, url: link.url })),
      suggestions: content.suggestions
    }))

    // Prepare our data object
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      thumbnail: courseInfo.thumbnail,
      totalVideos: courseContent.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseContent: formattedCourseContent
    };
    setCourseData(data)
  };

  const handleCourseCreate = async () => {
    const data = courseData
    console.log(data);
    if (!isLoading) {
      await createCourse(data)
    }
  }


  // console.log(courseData)
  return (
    <div className='w-full flex min-h-screen'>
      <div className='w-[80%]'>
        {
          active === 0 && (
            <CourseInfo
              courseInfo={courseInfo}
              setCourseInfo={setCourseInfo}
              setActive={setActive}
              active={active}
            />
          )
        }
        {
          active === 1 && (
            <CourseData
              benefits={benefits}
              setBenefits={setBenefits}
              prerequisites={prerequisites}
              setPrerequisites={setPrerequisites}
              active={active}
              setActive={setActive}
            />
          )
        }
        {
          active === 2 && (
            <CourseContent
              active={active}
              setActive={setActive}
              courseContent={courseContent}
              setCourseContent={setCourseContent}
              handleSubmit={handleSubmit}
            />
          )
        }
        {
          active === 3 && (
            <CoursePreview
              active={active}
              setActive={setActive}
              courseData={courseData}
              handleCourseCreate={handleCourseCreate}
            />
          )
        }
      </div>
      <div className='w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0'>
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div >
  )
}

export default CreateCourse