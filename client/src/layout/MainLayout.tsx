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



    
        <main className='bg-[#121212] rounded-md  lg:w-[80vw] fixed md:left-[19vw]  left-[11vw] w-full '>
        
          <div className='fixed top-0 w-[88vw] z-50 md:w-[80vw] '>
             <TopNav/>
          </div>
                

           
 <div className='w-[87vw] h-screen overflow-auto pb-40'>
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


