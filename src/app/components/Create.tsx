'use client'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { validate } from './validate'
import toast, { Toaster } from 'react-hot-toast'

export const Create = () => {
  const [form, setForm] = useState<SubmitForm>({
    title: '',
    description: ''
  })
  
  const [error, setError] = useState<ErrorForm>({
    title:'',
    description:'',
    selection:''
  })
  const [selection, setSelection] = useState<ThreadCategory | string>('')
  const [loggedUser, setLoggedUser] = useState<User | null>(null)

  const router = useRouter()

  useEffect(() => {
    function getUser(){
      const findUser = localStorage.getItem('loggedIn')
      if(!findUser){
        return
      }
      const user:User = JSON.parse(findUser)
      setLoggedUser(user)
    }
    getUser()
  }, [])
  

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.target

    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }


  function onSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()

    if(!loggedUser){
      toast.error('You need to log in to create a post')
      return
    }

    if(!validate(form,selection,setError)){
      return
    }
    try {
      const newSubject:Thread = {
        id:crypto.randomUUID(),
        category:selection as ThreadCategory,
        title:form.title,
        description: form.description,
        creationDate:new Date,
        locked:false,
        creator: loggedUser
      }

       const oldStorage = localStorage.getItem('forum/threads')
        let allThreads = []

        if(oldStorage !==  null){
         allThreads = JSON.parse(oldStorage)
        }

        allThreads.push(newSubject)

  
         localStorage.setItem("forum/threads", JSON.stringify(allThreads))
      
        router.push('/')
    } catch (error) {
      
    }
    

  }

  return (
    <div>
    <form onSubmit={onSubmit} className='form-container'>
      <div className='my-5'>
        <label className='form-label' htmlFor="">Title</label>
        <input
          value={form.title}
          name='title'
          placeholder='Title'
          onChange={onChangeHandler}
          className='form-input'
        />
      </div>
    
      <label className='form-label'>Thread/QNA</label>
      <select onChange={e => setSelection(e.target.value)} className='form-select'>
        <option value="" disabled selected>select</option>
        <option value="THREAD">THREAD</option>
        <option value="QNA">QNA</option>
      </select>
  
      <div className='my-5'>
        <label className='form-label'>Description</label>
        <textarea
          value={form.description}
          name='description'
          onChange={onChangeHandler}
          className='form-textarea'
        />
      </div>
  
      <button type='submit' className='form-button'>Submit</button>
  
      {error.title && <p className='error-message'>{error.title}</p>}
      {error.selection && <p className='error-message'>{error.selection}</p>}
      {error.description && <p className='error-message'>{error.description}</p>}
      <Toaster reverseOrder={false}/> 

    </form>
  </div>
  )
}
