import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
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
  const [lockThread, setLockThread] = useState<boolean>(false)
  let lockColour = ''

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
    if(lockThread){
      toast.error('The thread is locked')
      return
    }
    router.push('/thread/' + id);
  };

function onSetLockHandler(){
  
  
}
  

  return (
    <div>
      <div className='w-[700px] m-auto'>
      <h1 className='text-white font-bold bg-blue-400 p-5 rounded-lg mt-10 text-3xl'>Threads</h1>
        <div className=''>
          <div className='flex justify-end m-5'>
            <Link href={'/create'}>
              <button className='bg-slate-800 p-2 px-4 text-white rounded-lg'>Create Thread</button>
            </Link>
          </div>
          <div className="">
            {threads.map((thread, index) => (
              <div className={`${lockColour} rounded-xl flex flex-col p-5 m-2 items-center justify-center gap-5`} key={`${thread.id}-${index}`}>
                    <ul className='CreationDate'>
                      <li className=''>{new Date(thread.creationDate).toLocaleDateString()}</li>
                      <li className=''>{new Date(thread.creationDate).toLocaleTimeString()}</li>
                    </ul>
                <div className=' '>
                    <h2 onClick={() => handleNavigation(thread.id)} className='text-center text-xl font-bold mt-2 p-5 cursor-pointer'>{thread.title}</h2>
                </div>
                <div className='flex justify-center items-center'>
                  <p className="text-center text-lg mt-2 p-5">{thread.description}</p>
                  {
                    !checkUser &&
                    <Lock onClick={onSetLockHandler} className='cursor-pointer' /> 
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;