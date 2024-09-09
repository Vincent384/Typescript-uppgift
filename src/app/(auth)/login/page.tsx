'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';


const Login = () => {
const router = useRouter()


const [form, setForm] = useState<LoginForm>({
    email:'',
    password:''
})

const [error, setError] = useState<LoginForm>({
    email:'',
    password:''
})

function onChangeHandler(e:React.ChangeEvent<HTMLInputElement>){
const {name,value} = e.target
    
setForm((prev) =>{
        return {
            ...prev,
            [name]:value
        }
    })

}

function onSubmitHandler(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()


      let allRegistered = []
     const getRegistered = localStorage.getItem('registered') 
        
        allRegistered = JSON.parse(getRegistered as string)

        if(allRegistered === null){
            return toast.error('Could not find any with that mail. Please register')
        }

    const user = allRegistered.find((prev: { email: string; }) => prev.email === form.email)
    
    if(!user){
        toast.error('Password or email is incorrect')
        return
    }
    
    if (user.password !== form.password) {
        toast.error('Password or email is incorrect')
        console.log('hej')
        return
    }

    toast.success('Login successful')
    
    localStorage.setItem('loggedIn',JSON.stringify(user))
    
    setTimeout(() => {
        router.push('/')      
    }, 2000);
}
  return (
    <div className='h-screen bg-blue-900 p-10 flex justify-center'>
        <form onSubmit={onSubmitHandler} className='flex flex-col justify-center m-auto w-[500px] bg-white/95 rounded-lg p-10'>
            <h1 className='text-center font-bold text-xl mb-3'>Login</h1>
            <label className=' font-bold'>Email</label>
            <input value={form.email} onChange={onChangeHandler} className='border py-2 px-2 rounded-lg my-3' name='email' type="email" placeholder='Email' />
            <label className=' font-bold'>Password</label>
            <input value={form.password} onChange={onChangeHandler} className='border py-2 px-2 rounded-lg my-3' name='password' type="password" placeholder='Password' />
            <button className='py-2 px-4 bg-emerald-500 text-white container rounded-md hover:bg-emerald-600 transition-colors'>Login</button>
            <Link href={'/register'}><p className='text-blue-600 hover:text-blue-900 transition-colors mt-5'>Have you not a account?</p></Link>
        </form>
        <Toaster reverseOrder={false} />
        </div>
        
  )
}

export default Login