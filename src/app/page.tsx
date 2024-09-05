'use client'
import React, { useEffect } from 'react';
import LandingPage from './components/Page';
import { useRouter } from 'next/navigation';

const App: React.FC = () => {
  // const router = useRouter()

  // useEffect(() => {
  //   function getAuth(){
  //     const authStorage = localStorage.getItem('auth')

  //     if(!authStorage || authStorage === null){
  //       router.push('/login')
  //     }
  //   }
  //   getAuth()


  // }, [])
  
  return (
    <main>
      <div className='header'>
      <LandingPage />
      </div>
    </main>
  );
};

export default App;