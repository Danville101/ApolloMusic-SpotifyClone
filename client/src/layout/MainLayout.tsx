import React, { useContext } from 'react'
import LeftNav from '@/components/LeftNav'
import {MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos} from "react-icons/md"
import TopNav from '@/components/TopNav'
import LoginModal from '@/components/LoginModal'
import { useState } from 'react'
import { MusicContext } from '@/context/AudioContext'
import Login from '@/pages/login'



const MainLayout = ({children}:any) => {
  const { loginModel, setLoginModel, modalTrackImage}:any = useContext(MusicContext)
  return (
    <div className='flex flex-col '>
         <div className='flex flex-row h-full space-x-2 '>
          <div className='relative '>
            <div className='fixed h-full left-2'>
          <LeftNav />  
</div>

       
          </div>



    
        <main className='bg-[#121212] rounded-md  w-[80vw] fixed left-[19vw]'>
        
          <div className='fixed top-0 w-[80vw] z-50 '>
             <TopNav/>
          </div>
                

           
 <div className='w-[80vw] h-screen overflow-scroll pb-40'>
    {children}
 </div>

          
        </main> 
        <div className={`${loginModel? "":"hidden"}`}>
                  <LoginModal trackImage={modalTrackImage}/>
        </div>

    </div>
 
<div className='fixed bottom-0'>

</div>



    </div>
  )
}

export default MainLayout


