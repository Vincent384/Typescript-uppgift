'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';


export const Navbar = () => {

  const [loggedUser, setLoggedUser] = useState<User | null>(null)
  const router = useRouter()

useEffect(() => {
function getUser(){
    const getData = localStorage.getItem('loggedIn')
    const user:User = JSON.parse(getData as string)
    if(user){
      setLoggedUser(user)
    }
  } 

getUser()

}, [])


  function onLogOutHandler(){
      localStorage.removeItem('loggedIn')
      toast.success('Logged out successfully')
      setLoggedUser(null)
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
            !loggedUser && 
            <Link href={'/login'}><button className='py-2 px-4 bg-yellow-600 rounded-md text-white font-bold hover:bg-yellow-700 transition-colors'>Login</button></Link>            
          }
          {
            loggedUser &&
            <Link href={'/login'}><button onClick={onLogOutHandler} className='py-2 px-4
             bg-yellow-600 rounded-md text-white font-bold hover:bg-yellow-700 transition-colors'>Log out</button></Link>
          }
          </div>
        <Toaster reverseOrder={false} />

        </nav>
    </div>
  )
}
