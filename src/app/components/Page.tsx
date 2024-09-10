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
  creator?:User,
  locked?:boolean
};

const LandingPage: React.FC = () => {
  const router = useRouter();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [checkUser, setCheckUser] = useState<boolean>(false)
  const [lockedColor, setLockedColor] = useState(false)

  useEffect(() => {
    function getData() {
      let threads = JSON.parse(localStorage.getItem("forum/threads") || "[]") || [];
      if (!Array.isArray(threads)) {
        threads = [];
      }
      setThreads(threads);
    }
  
    function getUser() {
      const getData = localStorage.getItem('loggedIn');
      const checkUser = JSON.parse(getData as string || 'null');
      setCheckUser(!checkUser);
    }
  
    getUser();
    getData();
  }, [checkUser]);

  const handleNavigation = (id: string) => {

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

            return (
              <div
                className={`bg-slate-300 rounded-xl flex flex-col p-5 m-2 gap-5 `}
                key={thread.id}
              >
                <div>
                  <span className='text-white font-bold rounded-lg bg-emerald-600 p-2'>
                      {thread.creator?.userName}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                {
                  thread.category === 'QNA' ?
                  <span className='text-white font-bold rounded-lg bg-orange-400 p-2'>{thread.category}</span>
                  : 
                  <span className='text-white font-bold rounded-lg bg-blue-400 p-2'>{thread.category}</span>
                }
                  <div className='flex flex-col'>
                    <span>{new Date(thread.creationDate).toLocaleDateString()}</span>
                    <span>{new Date(thread.creationDate).toLocaleTimeString()}</span>
                  </div>
                </div>
                <div className='flex items-center justify-center'>
                  <h2
                    onClick={() => handleNavigation(thread.id)}
                    className='text-center text-2xl font-bold mt-2 p-5 cursor-pointer'
                  >
                    {thread.title}
                  </h2>
                  {
                    thread.locked && (
                      <span>Locked</span>
                    )
                  }
                </div>
                <div className='flex justify-center items-center'>
                  <p className="text-center text-lg mt-2 p-5">{thread.description}</p>
                  {!checkUser && (
                    <div onClick={() => onSetLockHandler(thread.id)}>
                      {thread.locked ? (
                        <Lock className='cursor-pointer text-red-600' />
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