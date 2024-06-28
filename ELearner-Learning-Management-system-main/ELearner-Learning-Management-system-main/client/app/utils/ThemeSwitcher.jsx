"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { BiMoon, BiSun } from 'react-icons/bi'
function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  useEffect(() => setMounted(true), [])

  if (!mounted) { return null; }
  return (
    <div className='flex items-center justify-center mx-4'>
      {
        theme === 'light' ? (
          <BiMoon
            onClick={() => {
              console.log('clicked')
              return setTheme('dark')
            }
            }
            className='cursor-pointer'
            fill='black'
            size={25}
          />
        ) : (
          <BiSun
            onClick={() => {
              console.log('clicked')
              setTheme('light')
            }}
            className='cursor-pointer'
            size={25}
          />
        )
      }
    </div>
  )
}

export default ThemeSwitcher