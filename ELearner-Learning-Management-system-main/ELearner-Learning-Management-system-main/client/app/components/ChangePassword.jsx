import React, { useEffect, useState } from 'react'
import { styles } from "../../app/styles/style"
import { useUpdatePasswordMutation } from '@/redux/features/user/userApi'
import toast from 'react-hot-toast'
function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [updatePassword, { isSuccess, isError, isLoading, error }] = useUpdatePasswordMutation()
  const passwordChangeHandler = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Password does not match')
    }
    else {
      await updatePassword({ oldPassword, newPassword })
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Password updated successfully')
    }
    if (error) {
      if ("data" in error) {
        const errorData = error
        toast.error(errorData.data.message)
      }
    }
  }, [isSuccess, isError])

  const handleSubmit = (e) => {
    e.preventDefault()
    passwordChangeHandler(e)
  }
  return (
    <>
      <div className='w-full pl-7 px-2 800px:pl-0 800px:px-5'>
        <h1 className='block text=[25px] 800px:text-[30px] font-Poppins text-center font-[500] text-black dark:text-[#fff] pb-2'>
          Change Password
        </h1>
        <div className='w-full'>
          <form aria-required onSubmit={handleSubmit} className='flex flex-col items-center'>
            <div className='w-[100%] 800px:w-[60%] mt-5'>
              <div className='w-[100%]'>
                <label className={`${styles.label} block pb-2`}>Enter Your Old PassWord</label>
                <input
                  type='password'
                  className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className='w-[100%]'>
                <label className={`${styles.label} block  pb-2 mt-2`}>Enter Your New PassWord</label>
                <input
                  type='password'
                  className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className='w-[100%]'>
                <label className={`${styles.label} block pb-2 mt-2`}>Enter Your Confirm PassWord</label>
                <input
                  type='password'
                  className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
        </div>
        <br />
      </div>
    </>
  )
}

export default ChangePassword