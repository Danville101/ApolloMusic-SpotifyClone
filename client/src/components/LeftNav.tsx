import React, { useEffect, useState } from 'react'
import{FaHome, FaSearch} from "react-icons/fa"
import {GoHomeFill} from "react-icons/go"
import {AiOutlineSearch, AiOutlinePlus} from "react-icons/ai"
import {BiSearch} from "react-icons/bi"
import{VscLibrary} from "react-icons/vsc"
import Link from 'next/link'
import { Player } from '../../Audio'
import Image from 'next/image'
const LeftNav = () => {

      
  const [play, setPlay] = useState(false)
  const [duation, setDuration] = useState(0)
  const [currentTime , seCurrentTime] = useState(0)
  const [seek, setSeek] = useState(0)

  useEffect(() => {
      const player = Player.getInstance()  
 player.ContentPlayer("http://localhost:5221/tracks/638267119193418580.mp3")


// const player2 = Player.getInstance()  

setDuration(player.duation)
seCurrentTime(player.currentTime)
player.Seek(seek)


  }, [play, seek])


  const playHanddle=()=>{
       localStorage.setItem("play", "true")
       setPlay(true)
  }
  
  return (

    <div className='flex flex-col h-screen space-y-2 w-[18.5vw]'>
         
     <div className='bg-[#121212]  rounded-md px-4 flex-col space-y-4 py-4 '>

      <Link href={'/'} className='flex items-center space-x-4'>
        <GoHomeFill  className="w-6 h-8 "/>   
          <p>Home</p>
      </Link>
      <Link href={"/search"} className='flex items-center space-x-3'>
        <BiSearch  className="h-8 w-7 "/>   
      <p>Search</p>
      </Link>
     
    
     </div>

     
     <div className='bg-[#121212]  rounded-md px-4 flex-col space-y-4 py-4 flex-grow '>

<div className='flex items-center justify-between'>
<button className='flex items-center space-x-4'>
        <VscLibrary  className="w-6 h-8 "/>   
          <p>Your Library</p>
      </button>
          <AiOutlinePlus  className="w-4 h-4 "/> 
</div>
      


      
      <div className='flex flex-col space-y-4 bg-[#252525] rounded-md -mx-2 px-4 h-32 py-2 justify-center items-center  xl:justify-normal xl:items-start'>
   <div className='flex-col hidden space-y-2 xl:flex'>
          <p className='text-sm font-semibold '>Create your first playlist</p>
      <p className='text-xs'>It&apos;s easy, we&apos;ll help you</p>
   </div>


      <button className='hidden w-32 py-2 text-sm text-black bg-white rounded-full hover:scale-110 xl:block'>Create playlist</button>


      <button className='flex items-center justify-center text-sm text-black bg-white rounded-full w-14 h-14 hover:scale-110 xl:hidden'>
        <Image src={"/playlist.svg"} width={40} height={40} alt='' />
      </button>
      </div>
      
      <div className='flex flex-col space-y-4 bg-[#252525] rounded-md -mx-2 px-4 h-32 py-2 justify-center items-center  xl:justify-normal xl:items-start '>
   <div className='flex-col hidden space-y-2 xl:flex'>
          <p className='text-sm font-semibold'>Let&apos;s find some podcasts</p>
      <p className='text-xs'>We&apos;ll keep you updated on new episods</p>
   </div>


      <button className='hidden w-20 py-2 text-sm text-black bg-white rounded-full xl:w-36 hover:scale-110 xl:block'>Browse podcasts</button>

      <button className='flex items-center justify-center text-sm text-black bg-white rounded-full w-14 h-14 hover:scale-110 xl:hidden'>
        <Image src={"/podcast.svg"} width={28} height={28} alt='' />
      </button>
      </div>


     
    
     </div>






     
    </div>
  )
}

export default LeftNav