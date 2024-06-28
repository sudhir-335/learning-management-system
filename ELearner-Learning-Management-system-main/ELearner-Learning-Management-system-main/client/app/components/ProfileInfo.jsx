import React, { useEffect, useState } from 'react'
import { styles } from "../../app/styles/style"
import { AiOutlineCamera } from 'react-icons/ai';
import avatarIcon from "../../public/assets/user.svg"
import Image from 'next/image';
import { useEditProfileMutation, useUpdateAvatarMutation } from '@/redux/features/user/userApi';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import toast from 'react-hot-toast';



function ProfileInfo({ avatar, user }) {
  const [name, setName] = useState(user && user.name)
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [loadUser, setLoadUser] = useState(false)
  const { } = useLoadUserQuery(undefined, { skip: !loadUser ? true : false })
  const [editProfile, { isSuccess: success, error: updateError }] = useEditProfileMutation();

  const imageHandler = async (e) => {
    const fileReader = new FileReader()

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result
        updateAvatar(avatar)
      }
    }
    fileReader.readAsDataURL(e.target.files[0])
  }

  useEffect(() => {
    if (isSuccess || success) {
      setLoadUser(true)
    }
    if (error || updateError) {
      console.log(error)
    }
    if (success) {
      toast.success("Profile updated successfully")
    }
  }, [isSuccess, error, success, updateError])




  const handleSubmit = async (e) => {
    e.preventDefault()
    if (name !== "") {
      await editProfile(name)
    }
  }

  return (
    <>
      <div className='w-full flex justify-center'>
        <div className="relative">
          <Image
            src={user.avatar || avatar ? user.avatar.url || avatar : avatarIcon}
            alt="avatar"
            width={120}
            height={120}
            className='w-[120px] h-[120px] rounded-full cursor-pointer border-[3px] border-[#37a39a]'
          />

          <input
            type='file'
            name='avatar'
            id='avatar'
            className='hidden'
            onChange={imageHandler}
            accept='image/*'
          />
          <label
            htmlFor='avatar'>
            <div className='w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center
          justify-center cursor-pointer'>
              <AiOutlineCamera
                size={20}
                className='z-1'
              />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className='w-full pl-6 800px:pl-10'>
        <form onSubmit={handleSubmit}>
          <div className='800px:w-[50%] m-auto block pb-4'>
            <div className='w-[100%]'>
              <label className={`${styles.label} block pb-2`}>Full Name</label>
              <input
                type='text'
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='w-[100%]'>
              <label className={`${styles.label} block pb-2 mt-2`}>Email Address</label>
              <input
                type='text'
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                readOnly
                value={user.email}
              />
            </div>
            <input
              type="submit"
              className='w-full 800px:w-[250px] h-[40px] border  border-[#37a39a] text-center dark:text-white text-black rounded-[3px] mt-8 cursor-pointer'
              required
              value="update"
            />
          </div>
        </form>
        <br />
      </div>
    </>

  )
}

export default ProfileInfo;