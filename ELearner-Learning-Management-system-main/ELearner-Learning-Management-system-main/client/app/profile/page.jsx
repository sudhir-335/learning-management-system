"use client"

import React, { useState } from 'react'
import Protected from '../hooks/useProtected'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import Profile from "../components/Profile"
import { useSelector } from 'react-redux'
function page() {

  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5)
  const [route, setRoute] = useState('Login')
  const { user } = useSelector(state => state.auth)
  return (
    <div>
      <Protected>
        <Heading
          title={user ? `Welcome ${user.name} on ELearner` : "Welcome on ELearner "}
          description="ELearner students favourite online learning platform"
          keywords="Programming,MERN,Redux" />
        <Header
          open={open}
          activeItem={activeItem}
          setOpen={setOpen}
          setRoute={setRoute}
          route={route}
        />
        <Profile user={user} />
      </Protected>
    </div>
  )
}

export default page