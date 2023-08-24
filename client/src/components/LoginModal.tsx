import React, { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MusicContext } from '@/context/AudioContext'


interface MovieProps {
     trackImage: string;
   
 }
 

const LoginModal = ({trackImage}:MovieProps) => {

     const { loginModel, setLoginModel, modalTrackImage}:any = useContext(MusicContext)
     
  return (
    <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black/80'>
     <div className='flex flex-col items-center space-y-4'>
   <div className='w-[48rem] h-96 flex  items-center space-x-8 bg-gradient-to-r from-brandColor/50  from-50% rounded-md px-12' >
     <div className="relative flex items-center justify-center flex-shrink-0 mx-2 bg-black w-72 h-72 lg:mx-0 rounded-xl">

<Image src={trackImage}  quality={100}
fill
sizes="100vw"
style={{
objectFit: 'cover',
}} alt="trackImage " className='rounded-md'/>


</div>

<div className='flex flex-col items-center space-y-8'>
     <p className='text-4xl text-center'>Start listening with a free Spotify account</p>

     <div className='flex flex-col items-center space-y-4'>
          <Link href={"/signup"}>         <button type='submit' className='w-40 px-1 py-4 text-black duration-500 rounded-full bg-brandColor hover:opacity-70 active:scale-90 bottom-4 hover:cursor-pointer'  data-testid="submit" >Sign up for free</button>

          </Link>
     
     <button type='submit' className='w-40 px-1 py-4 text-white duration-500 border rounded-full hover:opacity-70 active:scale-90 bottom-4 hover:cursor-pointer'  data-testid="submit" >Download app</button>
     
  
     </div>
     <div className='flex items-center space-x-2 whitespace-nowra2'>
           <p className='text-sm font-light'>Already have an account?
</p>    <Link className='text-sm font-bold' href={"/login"}>Log in</Link>
     </div>

    
     
</div>
     </div>
     <button className='text-white/50 hover:text-white ' onClick={()=>setLoginModel(false)}>Close</button>
          
     </div>

  
    </div>
  )
}

export default LoginModal