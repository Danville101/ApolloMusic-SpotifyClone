import React, { useEffect, useState } from 'react'
import {BsPlayFill} from "react-icons/bs"
import Image from 'next/image'
import { TrackProp } from '../../interfaces'
import { useContext } from 'react'
import { MusicContext } from '@/context/AudioContext'
import Cookies from 'js-cookie'

const TrackIcon = ({track}:TrackProp) => {
 const {setModalTrackImage, setLoginModel, setTrackAdded} = useContext(MusicContext)
 const [info, setInfo]=useState<any>("")

 const loggedIn = Cookies.get("Logged_In")
 const notLoggeInHandler =()=>{
  setModalTrackImage(track.trackImage)
  setLoginModel(true)
 }

 const addtrackHandler=(e)=>{
  if(loggedIn=="true"){
    addtrack(e)
  }else{
    notLoggeInHandler()
  }
 }
      
 const addtrack = (e:any)=>{

  e.preventDefault()
    fetch("http://localhost:5221/api/Current",{
       method: 'PUT',
       mode: 'cors',
       credentials: 'include',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         tracks:[
          info
         ]
       })
   }).then((res)=>{
    setTrackAdded(info.title)
    localStorage.setItem("CurrentTime", "0") 
    localStorage.setItem("MemoTime", "0") 
    localStorage.setItem("play","true")
    
         })




 }



  return (
     <button className="flex items-center w-48 py-2 bg-[#181818] h-72 rounded-xl s flex-col group hover:bg-[#282828] duration-700"  onClick={(e)=>addtrackHandler(e)}  onMouseEnter={()=>setInfo(track)}>
     <div className="relative flex items-center justify-center flex-shrink-0 w-40 h-40 mx-2 bg-black lg:mx-0 rounded-xl">
      <Image src={track.trackImage}  quality={100}
      fill
      sizes="100vw"
      style={{
        objectFit: 'cover',
      }} alt="trackImage " className='rounded-xl'/>
     <div className='absolute z-30 flex items-center justify-center w-10 h-10 duration-700 translate-y-2 rounded-full opacity-0 right-2 bg-brandColor bottom-2 group-hover:opacity-100 group-hover:translate-y-0'>
      <BsPlayFill className="w-8 h-8 text-black"/>
     </div>
     </div>
    
<div className='w-full px-4'>
<div className='flex flex-col flex-wrap items-start mt-2 space-y-2'>
                 <p>{track.title}</p>
              <p className='text-xs font-light text-left text-white/50 '>Peach djhbfdsibrfi fbjhds jhbdsjh fhjbdfjhdfbshsdb </p>   
                
     </div>
     

</div>
     
     </button>
  )
}

export default TrackIcon




