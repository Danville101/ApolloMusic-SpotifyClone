import React, { useContext, useState, useEffect } from 'react'
import MainLayout from '../../layout/MainLayout'
import Image from 'next/image'
import {BsPlayFill} from "react-icons/bs"
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'
import {CiClock2} from "react-icons/ci"
import { MusicContext } from '../../context/AudioContext'
import { Track, Tracks } from '../../../interfaces'



const Genre = () => {
 // , setTrackAdded}
  const { trackAdded , setTrackAdded}:any = useContext(MusicContext)
  const router = useRouter()

  const genre = router.query.genre as string
  const [song, setSong] = useState<any >([])

  const [genres, setGenres] = useState([])
  const [loading, setLoading ] = useState(true)

  useEffect(()=>{
    fetch(`http://localhost:5221/api/track/${genre}`).then( async(res)=>{

    const data =  await res.json()

    setSong(data)
    setLoading(false)
    })
     
  },[genre])




     const [info, setInfo]=useState<any>("")
     const colourPicker: {
      [key: string]: string;
      "Hip Hop": string;
      Pop: string;
      Dancehall: string;
      "R&B": string;
      Rock: string;
      Soul: string;
      Afro: string;
  } = {
    "Hip Hop" :"#E03400",
    Pop: "#283DA3", 
   Dancehall: "#7358FF", 
   "R&B":"#1E8A07",
   
   Rock: "#E8245B",
   
   Soul :"#166952",
   
    Afro:"#2472EA" 
  };
   
      
       const Addtrack = (e:any)=>{

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
   
  

 

        if(loading) return <div></div>
        
        return (
          <div className='pt-2 '>
    
  
      
         
          <MainLayout>
      
      <div
        className="flex   bg-fixed    bg-no-repeat bg-cover  bg-center  h-[50vh]  pl-20  rounded-md "
        style={{backgroundColor: colourPicker[genre]}}
      >
       
      </div> 
      <div className="pl-5 text-6xl font-bold text-white rounded-xl -translate-y-52">
        <p className='text'>
              { router.query.genre}
        </p>
      
        </div>
        
      
      <div className='px-4 -mt-8'>
        
         <div className='flex items-center space-x-2'>
        <button className='flex items-center justify-center w-12 h-12 rounded-full bg-brandColor'>
            <BsPlayFill className="w-8 h-8 text-black"/>
           </button>
      
           <button className='px-4 py-2 text-sm border rounded-full border-white/50'>
            Follow
           </button>
        </div>

  <div className='w-full items-center flex border-b border-[#4C4C50]   pb-2 px-4 mb-4 mt-12'>
     <p className='text-sm' >#</p>
     <span className='w-[30vw]  flex ml-4'>
             <p className='text-sm'>Title</p>
     </span>
     <span className='w-[10vw] flex items-center justify-center'>
             <p className='text-sm '>Album</p>
     </span>
  

     <span className='w-[30vw] flex items-center justify-center'>
             <CiClock2/>
     </span>
     <p className='text-sm' >Date added</p>
  </div>
{song.map((e:Track,i:number)=>(
  
<div className='w-full items-center flex  group hover:bg-[#b3b3b3]/10 rounded-xl pb-2 px-4 py-2 hover:cursor-pointer' key={i}  >
     <p className='w-6 h-6 group-hover:hidden' >{i+1}</p>
     <BsPlayFill className="hidden w-6 h-6 text-white group-hover:block" onMouseEnter={()=>setInfo(e)} onClick={Addtrack} />
     <div className='w-[30vw]  flex items-center space-x-2'>
     <div className="relative flex items-center justify-center flex-shrink-0 w-10 h-10 mx-2 bg-black lg:mx-0 rounded-xl">

<Image src={e.trackImage}  quality={100}
fill
sizes="100vw"
style={{
objectFit: 'cover',
}} alt="trackImage " className='rounded-md'/>


</div>
<div className='flex flex-col '>
    <p className='text-sm hover:underline' >{e.title}</p> 
    <p className='text-xs font-thin hover:underline'  >
     {e.artist}
    </p>
     
</div>
          
     
     
     </div>
     <div className='w-[10vw] flex items-center justify-center'>
             <p className='text-sm'>Album</p>
     </div>

     <span className='w-[30vw] flex items-center justify-center'>
     <p className='text-sm text-left' >{String(e.duration).substring(3,8)}</p>
     </span>
 
     <p className='text-sm' >{String(e.createdDate).substring(0,10)}</p>
  </div>

))}
  
 

  
      </div>
      
      
      
                
          </MainLayout>
       </div>
        )
}

export default Genre

