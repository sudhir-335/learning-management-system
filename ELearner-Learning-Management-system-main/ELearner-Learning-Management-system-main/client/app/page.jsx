'use client'
import React, { useState } from 'react'
import Heading from './utils/Heading'
import Header from './components/Header'
import Hero from './components/Hero'
const Page = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0)
  const [route, setRoute] = useState('Login')
  return (
    <div>
      <Heading
        title="ELearner"
        description="ELearner students favourite online learning platform"
        keywords="Programming,MERN,Redux" />
      <Header
        open={open}
        activeItem={activeItem}
        setOpen={setOpen}
        setRoute={setRoute}
        route={route}
      />
      <Hero />
    </div>
  )
}

export default Page