import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, LockOpen } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';



type Thread = {
  id: string;
  category: string;
  title: string;
  description: string;
  creationDate: string;
  locked?:boolean
};

const LandingPage: React.FC = () => {
  const router = useRouter();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [checkUser, setCheckUser] = useState<boolean>(false)

  useEffect(() => {
    function getData() {
      const keys = Object.keys(localStorage);
      let threads = JSON.parse(localStorage.getItem("forum/threads")|| "[]" ) || []
      if(!Array.isArray(threads)){
        threads = []
      }
  
      setThreads(threads);

    }
    function getUser(){
      const getData = localStorage.getItem('loggedIn')
      const checkUser = JSON.parse(getData as string || 'null')
      if(checkUser){
        setCheckUser(false)
      }else{
        setCheckUser(true)
      }
    } 


      getUser()
      getData();
  }, [checkUser]);

  const handleNavigation = (id: string) => {

    const getLockedThreads = localStorage.getItem('lockedThreads')
    let allThreads:Thread[] = []

    if(getLockedThreads !==  null){
     allThreads = JSON.parse(getLockedThreads)
    }
    
    const findLockedThreads = allThreads.findIndex((thread)=>(
      thread.id === id
    ))

    if(allThreads[findLockedThreads].locked === true){
      toast.error('This thread is locked')
      return
    }

    router.push('/thread/' + id);
  };
  
  function onSetLockHandler(id:string){
    try {
      
      const updatedThreads = threads.map((thread) =>(
        thread.id === id 
        ? {...thread,locked:!thread.locked}
        : thread
      ))
      
      localStorage.setItem('lockedThreads',JSON.stringify(updatedThreads))
  setThreads(updatedThreads)

} catch (error) {
  console.log(error)
}
}
  

return (
  <div>
    <div className='w-[700px] m-auto'>
      <h1 className='text-white font-bold bg-blue-400 p-5 rounded-lg mt-10 text-3xl'>Threads</h1>
      <div>
        <div className='flex justify-end m-5'>
          <Link href={'/create'}>
            <button className='bg-slate-800 p-2 px-4 text-white rounded-lg'>Create Thread</button>
          </Link>
        </div>
        <div>
          {threads.map((thread) => {
            const lockColour = thread.locked ? 'bg-red-300' : 'bg-slate-300';
            return (
              <div
                className={`${lockColour} rounded-xl flex flex-col p-5 m-2 items-center justify-center gap-5`}
                key={thread.id}
              >
                <ul className='CreationDate'>
                  <li>{new Date(thread.creationDate).toLocaleDateString()}</li>
                  <li>{new Date(thread.creationDate).toLocaleTimeString()}</li>
                </ul>
                <div className='flex items-center justify-center'>
                  <h2
                    onClick={() => handleNavigation(thread.id)}
                    className='text-center text-2xl font-bold mt-2 p-5 cursor-pointer'
                  >
                    {thread.title}
                  </h2>
                  <h3 className='mt-2 p-5'>{thread.category}</h3>
                </div>
                <div className='flex justify-center items-center'>
                  <p className="text-center text-lg mt-2 p-5">{thread.description}</p>
                  {!checkUser && (
                    <div onClick={() => onSetLockHandler(thread.id)}>
                      {thread.locked ? (
                        <LockOpen className='cursor-pointer text-red-600' />
                      ) : (
                        <Lock className='cursor-pointer text-gray-600' />
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
);
};
export default LandingPage;