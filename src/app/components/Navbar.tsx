'use client'
import { set } from 'lodash'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';


export const Navbar = () => {

  const [checkUser, setCheckUser] = useState<boolean>(true)

useEffect(() => {
function getUser(){
    const getData = localStorage.getItem('loggedIn')
    const checkUser = JSON.parse(getData as string)
    if(checkUser){
      setCheckUser(false)
    }else{
      setCheckUser(true)
    }
  } 
getUser()

}, [])


  function onLogOutHandler(){
      localStorage.removeItem('loggedIn')
      toast.success('Logged out successfully')
      setCheckUser(true)
  } 

  return (
    <div className='bg-slate-400'>
        <nav className='flex justify-between items-center p-5'>
          <Link href={'/'}><button className='text-white font-bold rounded-lg bg-blue-400 p-2'>Threads</button></Link>
          {
            checkUser && 
            <Link href={'/login'}><button className='py-2 px-4 bg-emerald-600 rounded-md text-white font-bold'>Login</button></Link>            
          }
          {
            !checkUser &&
            <Link href={'/login'}><button onClick={onLogOutHandler} className='py-2 px-4 bg-emerald-600 rounded-md text-white font-bold'>Log out</button></Link>
          }
        <Toaster reverseOrder={false} />

        </nav>
    </div>
  )
}
