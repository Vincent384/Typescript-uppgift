'use client'
import { registerValidate } from '@/app/components/registerValidate';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';


const Register = () => {
    const router = useRouter()
    const [form, setForm] = useState<RegisterForm>({
        userName:'',
        email:'',
        password:''
    })
    
    const [error, setError] = useState<RegisterForm>({
        userName:'',
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
    
   async function onSubmitHandler(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        if(!registerValidate(form,setError)){
            if(error.userName){
                toast.error(error.userName)
                return
            }
            if(error.email){
                toast.error(error.email)
                return
            }
            if(error.password){
                toast.error(error.password)
                return
            }
            return
          }
          
          
          const oldStorage = localStorage.getItem('registered')
          let allUser:User[] = []
          
          console.log(oldStorage)
          if(oldStorage !==  null){
              allUser = JSON.parse(oldStorage)
            }
            
            const userExixts = allUser.some((user) => user.email === form.email)       
            
            if(userExixts){
                toast.error('User already exixts with this email')
                return
            }
            
            
            const newUser:User = ({
              userId:crypto.randomUUID(),
              userName:form.userName,
              email:form.email,
              password:form.password
            })
            
            allUser.push(newUser)
            localStorage.setItem("registered", JSON.stringify(allUser)) 
            toast.success('Account created')

    }
      return (
        <div className='h-screen bg-blue-900 p-10 flex justify-center'>
            <form onSubmit={onSubmitHandler} className='flex flex-col justify-center m-auto w-[500px] bg-white/95 rounded-lg p-10'>
                <h1 className='text-center font-bold text-xl mb-3'>Register</h1>
                <label className=' font-bold'>User Name</label>
                <input value={form.userName} onChange={onChangeHandler} className='border py-2 px-2 rounded-lg my-3' name='userName' type="text" placeholder='User Name' />
                <label className=' font-bold'>Email</label>
                <input value={form.email} onChange={onChangeHandler} className='border py-2 px-2 rounded-lg my-3' name='email' type="email" placeholder='Email' />
                <label className=' font-bold'>Password</label>
                <input value={form.password} onChange={onChangeHandler} className='border py-2 px-2 rounded-lg my-3' name='password' type="password" placeholder='Password' />
                <button className='py-2 px-4 bg-emerald-500 text-white container rounded-md hover:bg-emerald-600 transition-colors'>Register</button>
                <Link href={'/login'}><p className='text-blue-600 hover:text-blue-900 transition-colors mt-5'>Do you have already an account?</p></Link>
            </form>
            <Toaster reverseOrder={false} />
            </div>
            
      )
    }

export default Register