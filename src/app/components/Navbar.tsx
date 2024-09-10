'use client'
import { set } from 'lodash'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';


export const Navbar = () => {

  const [checkUser, setCheckUser] = useState<boolean>(true)
  const [loggedUser, setLoggedUser] = useState<User | null>(null)

useEffect(() => {
function getUser(){
    const getData = localStorage.getItem('loggedIn')
    const user:User = JSON.parse(getData as string)
    if(user){
      setCheckUser(false)
      setLoggedUser(user)
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
          <div className=''>
          {
              loggedUser && (
                <span className='text-white font-bold rounded-lg bg-emerald-600 p-2 mr-3'>{loggedUser.userName}</span>
              )
            }
          {
            checkUser && 
            <Link href={'/login'}><button className='py-2 px-4 bg-yellow-600 rounded-md text-white font-bold hover:bg-yellow-700 transition-colors'>Login</button></Link>            
          }
          {
            !checkUser &&
            <Link href={'/login'}><button onClick={onLogOutHandler} className='py-2 px-4
             bg-yellow-600 rounded-md text-white font-bold hover:bg-yellow-700 transition-colors'>Log out</button></Link>
          }
          </div>
        <Toaster reverseOrder={false} />

        </nav>
    </div>
  )
}
