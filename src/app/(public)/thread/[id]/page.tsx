"use client"
import { Navbar } from '@/app/components/Navbar';
import { useParams, useRouter } from 'next/navigation';
import React from 'react'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';


type Comment = {
    content: string;
    creator: string;
    isAnswer?: boolean
}

type Data = {
    id: string;
    category: string;
    title: string;
    description: string;
    creationDate: string;
    comments: Comment[];
  };

function Thread() {
    const [data, setData] = useState<Data>({
      id: "",
      category: "",
      title: "",
      description: "",
      creationDate: "",
      comments: [],
    });
  
    const [threadId, setThreadId] = useState<string>("");
    const [loggedUser, setLoggedUser] = useState<User | null>(null)
    const [newComment, setNewComment] = useState<string>("");
    const {id} = useParams()
    
    
    const key = "forum/threads"; 
  
    useEffect(() => {
      const getIdFromUrl = () => {
        const urlParts = window.location.pathname.split("/");
        return urlParts[urlParts.length - 1];
      };
  
      const id = getIdFromUrl();
      setThreadId(id);
  
      const localData = localStorage.getItem(key);
  
      if (localData) {
        try {
          const parsedArray = JSON.parse(localData) as Data[];
          const threadData = parsedArray.find((thread) => thread.id === id);
  
          if (threadData) {
            setData({ ...threadData, comments: threadData.comments || [] });
          } else {
            console.error("Thread not found.");
          }
        } catch (error) {
          console.error("Failed to parse data from localStorage", error);
        }
      }

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


  
    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewComment(e.target.value);
    };
    
    const handleCommentSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      if(!loggedUser){
        toast.error('You need to Login to be able to comment')
        return 
      }      
     
      const getLockedThreads = localStorage.getItem('forum/threads')
      let allThreads:Thread[] = []
  
      if(getLockedThreads !==  null){
       allThreads = JSON.parse(getLockedThreads)
      }
      
      const findLockedThreads = allThreads.findIndex((thread)=>(
        thread.id === id
      ))
  
      if(findLockedThreads !== -1 && allThreads[findLockedThreads].locked === true){
        toast.error('This thread is locked and cannot accept new comments.')
        return
      }

      
      if (newComment.trim() === "") return;
  
      const updatedComments: Comment[] = [
        ...data.comments,
        { content: newComment, creator: loggedUser.userName },
      ];
  
      const updatedData = {
        ...data,
        comments: updatedComments,
      };
  
      const localData = localStorage.getItem(key);
  
      if (localData) {
        try {
          const parsedArray = JSON.parse(localData) as Data[];
          const threadIndex = parsedArray.findIndex(
            (thread) => thread.id === threadId
          );
  
          if (threadIndex !== -1) {
            parsedArray[threadIndex] = updatedData;
            localStorage.setItem(key, JSON.stringify(parsedArray));
          } else {
            console.error("Thread not found during update.");
          }
        } catch (error) {
          console.error("Failed to update data in localStorage", error);
        }
      }
  
      setData(updatedData);
      setNewComment("");
    };

    function markAsAnswer(index: number){
      const updatedComments = data.comments.map((comment,i)=> ({
        ...comment,
        isAnswer:i=== index
      }))

      const updatedData = {
        ...data,
        comments:updatedComments
      }
      const localData = localStorage.getItem(key);
      if (localData) {
        try {
          const parsedArray = JSON.parse(localData) as Data[];
          const threadIndex = parsedArray.findIndex((thread) => thread.id === threadId);
          if (threadIndex !== -1) {
            parsedArray[threadIndex] = updatedData;
            localStorage.setItem(key, JSON.stringify(parsedArray));
            setData(updatedData);
          } else {
            console.error("Thread not found during update.");
          }
        } catch (error) {
          console.error("Failed to update data in localStorage", error);
        }
      }

    }

  return (
    <>
    <Navbar/>
    <div className='flex justify-center items-center'>
        <div className="d-thread-container">
            <div className="d-thread-container-top">
              <div className="d-thread-container-top-width">
                <Toaster reverseOrder={false}/> 
                {
                  data.category === 'QNA' ?
                  <span className='text-white font-bold rounded-lg bg-orange-400 p-2'>{data.category}</span>
                  : 
                  <span className='text-white font-bold rounded-lg bg-blue-400 p-2'>{data.category}</span>
                }
              </div>
                <h2 className='d-thread-title'>{data.title}</h2>
            </div>
            <div className="d-thread-container-center">
                <p className='d-thread-text'>
                    {data.description}
                </p>
            </div>
            <div className="d-thread-container-create-comment">
                <form onSubmit={handleCommentSubmit} className='d-thread-container-create-comment'>
                    <div className="d-thread-container-create-comment-input">
                        <label htmlFor="commentField" className='d-thread-label'>Write a comment</label>
                        <input type="text" value={newComment} onChange={handleCommentChange} id='commentField' />
                    </div>
                    <div className="d-thread-container-create-comment-btn">
                        <button type='submit' id='postCommentBtn'>Post</button>
                    </div>
                </form>
            </div>
            <div className="d-thread-container-bottom">
                {data.comments.map((comment, index) => (
                        <div key={index} className="bg-blue-200 p-5 rounded-lg my-3">
                            <span className='bg-slate-700 text-white p-2 '>{comment.creator}</span>
                            <div className='flex justify-between items-center mt-3'>
                              <p className=''>{comment.content}</p>
                              {data.category === 'QNA' && loggedUser && (
                                <button
                                onClick={() => markAsAnswer(index)}
                                    className={`px-2 py-2 bg-emerald-700 text-white font-bold rounded-lg ${comment.isAnswer ? 'active' : ''}`}
                                  >
                                    {comment.isAnswer ? '✔ Answer' : 'Mark as Answer'}
                                  </button>
                                )}    
                          </div>

                            </div>
                    ))}
            </div>
        </div>
    </div>
                                </>
  )
}

export default Thread