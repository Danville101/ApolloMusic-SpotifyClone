"use client"
import React, { useState, useEffect, useRef, useContext } from 'react'
import {CiShuffle} from "react-icons/ci"
import { MdSkipPrevious, MdSkipNext, MdOutlineRepeatOne, MdOutlineRepeat } from 'react-icons/md'
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai'
import { BsRepeat, BsRepeat1 } from 'react-icons/bs'
import {ImVolumeLow, ImVolumeMedium, ImVolumeHigh, ImVolumeMute2} from "react-icons/im"
import {} from "react-icons/md"
import Image from 'next/image';
import { MusicContext } from '@/context/AudioContext'
import { useRouter } from 'next/router'
import { Track } from '../../interfaces'




const PlayBar = ({tracks}:any) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const { trackAdded , setTrackAdded}:any = useContext(MusicContext)
  const [data, setData] = useState<any>("")
  const [isLoading, setLoading] = useState(true)
  const [acutalTime, setAcutallTime] = useState(0)
  const router = useRouter()
  const [currentPlay, setCurrentPlay]=useState(0)
  
  
  useEffect(() => {


  if(audioRef.current){
    
    audioRef.current.addEventListener("loadeddata",()=>{
      if(audioRef.current){
           audioRef.current.currentTime = Number(localStorage.getItem("CurrentTime"))
      audioRef.current.play()
      }

      
    })

    
  }

  },[audioRef])
  


  useEffect(() => {
    
    fetch('http://localhost:5221/api/current',{
      credentials: "include",
      mode: "cors"
    })
      .then((res) => res.json())
      .then((response) => {
        setData(response.tracks[currentPlay])
   
        setLoading(false)
        if(audioRef.current){
                  audioRef.current.currentTime = 0
        }

        setAcutallTime(0)
        setIntialStart(0)
        
      

      }).then(()=>{
      setAcutallTime(Number(localStorage.getItem('CurrentTime')))
   setIntialStart(Number(localStorage.getItem('CurrentTime')))    ///Fixed raloding issued
      })
 
      
  }, [trackAdded, currentPlay])

     const [mute , setMute]= useState(false)
     const [volume , setVolume]= useState(0.5)


     
     const [play, setPlay] = useState(false)
     //const timmy = new Date(data.duration)
     const endTime = String(data.duration).substring(3,8)




     let [timeInSec, setTimeinSec]  = useState("0:00")

     let [intialStart, setIntialStart] =useState(0)

     const divStyle = {
          width:  
               `${(acutalTime/data.durationInSec) *100}%`
          ,
          
        };
     const divStyle2 = {
          width: `${volume*100}%`
          ,
          
        };
     
        function secondsToTime(seconds:number) {
          const minutes = Math.floor((seconds % 3600) / 60);
          const remainingSeconds = seconds % 60;
        
          const formattedTime = `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
            setTimeinSec(formattedTime);
        }
      


  const handlePlay =()=>{
    if(intialStart < data.durationInSec){
   localStorage.setItem("play","true")
     setPlay(true)
    }
    if(intialStart -1 == data.durationInSec){
      localStorage.setItem("CurrentTime", "0") 
      localStorage.setItem("MemoTime", "0") 
      localStorage.setItem("play","true")
      setIntialStart(0)
      setPlay(true)
    }


 
     
  }
   const handlePrevious=()=>{
      localStorage.setItem("CurrentTime", "0") 
      localStorage.setItem("MemoTime", "0") 
      localStorage.setItem("play","true")
      setIntialStart(0)
      if(audioRef.current){
            audioRef.current.currentTime = 0
      }
  

    }


    const handdleNext=()=>{
      localStorage.setItem("CurrentTime", "0") 
      localStorage.setItem("MemoTime", "0") 
      localStorage.setItem("play","true")
      setIntialStart(0)
      if( audioRef.current){
           audioRef.current.currentTime = 0   
      }
      setCurrentPlay(currentPlay +1)
     
      
    }

  const handlePause =()=>{
     localStorage.setItem("play","false")
     setPlay(false)
     
  }

  const [seekOn, setSeekOn]= useState(false)

   const seekRef = useRef(null)
  const [seekTime,setSeekTime]=useState(0)

  const handleSeek =(event:any)=>{
    if( audioRef.current){
        audioRef.current.currentTime = event.target.value;
    }
     secondsToTime(Number(event.target.value))
     setIntialStart(Number(event.target.value))
     setAcutallTime(Number(event.target.value))
     setSeekTime(Number(event.target.value))
     setSeekOn(true)
     
  }
        
  const handleVolume =(event:any)=>{
    
    if( audioRef.current){
           audioRef.current.volume = event.target.value;
    }

     setVolume(event.target.value);
  
   
     
  }





  
   const handleMute =()=>{
     setMute(true)
     if( audioRef.current){
     audioRef.current.muted = true
     }     
   }
   const handleNotMute =()=>{
     setMute(false)
     if( audioRef.current){
     audioRef.current.muted = false}
     setVolume(0.1)
     if( audioRef.current){
     audioRef.current.volume  = 0.1}
     
   }

   const [looped, setLooped]=useState(false)

   const handleRepeat=()=>{
 setLooped(true)
 if(audioRef.current){
     audioRef.current.loop = true
 }
 
   }
   const handleRepeatFalse=()=>{
 setLooped(false)
 if(audioRef.current){
  audioRef.current.loop = false
 }
    
   }


   
 const [milli, setMilli] = useState(0)
/*Start from here */
  
 useEffect(() => {
  // This function will be called after the component is mounted

  if(localStorage.getItem("play") == "true"){
    if(audioRef.current){
      
      audioRef.current.play()
    // audioRef.current.currentTime = Number(localStorage.getItem("CurrentTime"))
      
    }
    setPlay(true)
  }

  if(localStorage.getItem("play") == "false"){
    if(audioRef.current){
      audioRef.current.pause()
      //audioRef.current.currentTime = Number(localStorage.getItem("CurrentTime"))
    
    }
      setPlay(false)
  }


 
  if( intialStart -1 !== data.durationInSec && localStorage.getItem("play") == "true"){
    const intervalId = setInterval(() => {
      // Update the state variable 'count' every second
      setIntialStart((prevCount) => prevCount + 1);     

     if(intialStart< Number(localStorage.getItem("CurrentTime"))){
      setIntialStart(Number(localStorage.getItem("CurrentTime")))
 
     }
     
     if(intialStart>= Number(localStorage.getItem("CurrentTime")))
     {
localStorage.setItem("CurrentTime", String(intialStart)) /// Coausing Relaod 
    

     }
      
    }, 1000);

   
    // Return a cleanup function to stop the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  
 
  }

  if(intialStart -1 == data.durationInSec){
    localStorage.setItem("play","false")
    setPlay(false)
  }
  
 


  
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [ intialStart, play])


  useEffect(()=>{
    secondsToTime(Number(localStorage.getItem("CurrentTime")))
    setAcutallTime(Number(localStorage.getItem("CurrentTime")))

    if(seekOn){
      localStorage.setItem("CurrentTime", String(seekTime))

    }





  },[intialStart, seekOn,seekTime])


  
// LocalStorage




  useEffect(()=>{
    if(looped && intialStart==data.durationInSec && play){
      setIntialStart(0)

    }
  },[data.durationInSec, intialStart, looped, play])
        

   

       if (isLoading) return (
        <div className={`flex items-center justify-between w-screen h-20 px-4 bg-black ${router.asPath.includes("login")|| router.asPath.includes("signup")?"hidden":""}`}>
 
        <div className='flex items-center space-x-4'>
     <div className="relative flex items-center justify-center flex-shrink-0 w-16 h-16 mx-2 bg-black lg:mx-0 rounded-xl">
  
  
  
        
            </div>
  
            <div className='flex flex-col space-y-1'>
  
  </div>
  
        </div>
  
         
  
           
  
  
            <div className='flex flex-col items-center ' >
                 <div className='flex items-center mt-4 space-x-4' >
                  <button>
                     <CiShuffle className="text-white duration-700 w-7 h-7 opacity-60 hover:opacity-100 " />
                  </button>
                     <button>
                                          <MdSkipPrevious className="text-white duration-700 w-7 h-7 opacity-60 hover:opacity-100 "  />
  
                     </button>
                      <div>
                      
                               
                                
                          
                              
                             <AiFillPauseCircle className={`w-12 h-12  hover:cursor-pointer text-[#b3b3b3]`} />   
                      </div>
                 <button>
                                      <MdSkipNext className="text-white duration-700 w-7 h-7 opacity-60 hover:opacity-100 " />
  
                 </button>
  
                 <button className={` ${looped?"hidden":""}`}>
                                      <MdOutlineRepeat className={`w-8 h-8  text-white opacity-60 hover:opacity-100 duration-700  `}/>
                                      
  
                 </button>
                 <button className={`${looped?"":"hidden"} `}>
                        <MdOutlineRepeatOne className={`w-8 h-8  text-brandColor  duration-700 `}/>
                 </button>
                
                 </div>
                 <div className='flex items-center mb-4 space-x-2 hover:cursor-pointer'>
      <p className='text-xs text-[#b3b3b3]'>-:--</p>
                      <div className='relative flex items-center justify-center group '>
   <div className='h-1 w-[40vw] bg-[#b3b3b3] bg-opacity-25 rounded-full group-hover:hidden '>
                     
                 </div>                          <div className={`h-1  bg-white rounded-full flex items-center justify-end group-hover:bg-brandColor group-hover:z-50 absolute left-0 hover:cursor-pointer`} style={divStyle}> </div>
  
   
  
  
  
        
                      </div>
                    
                      <p className='text-xs text-[#b3b3b3]'>-:--</p>
                  
                 </div>
               
  <div className='flex items-center '>
   
      
  
      
                 
  </div>
          
            </div>
            <div className='flex items-center space-x-1'> 
            <ImVolumeLow onClick={handleMute} className={`${mute || volume==0  || volume > 0.2 ? "hidden":""}`}/>
            <ImVolumeMedium onClick={handleMute} className={`${mute || volume==0  || volume < 0.3 || volume > 0.5? "hidden":""}`}/>
            <ImVolumeHigh onClick={handleMute} className={`${mute || volume==0 || volume < 0.6 ? "hidden":""}`}/>
  
  
  
            <ImVolumeMute2 onClick={handleNotMute} className={`${mute || volume==0? "":"hidden"}`} />
  
  
  
  
            
   
  
  
  
  
                 <div className='relative flex items-center justify-center group '>
   <div className='h-1 w-[10vw] bg-[#b3b3b3] bg-opacity-25 rounded-full group-hover:hidden '>
                     
                 </div>                          <div className={`h-1  bg-white rounded-full flex items-center justify-end group-hover:bg-brandColor group-hover:z-50 absolute left-0 hover:cursor-pointer`} style={divStyle2}> </div>
  
                              <input  
         className=' group-hover:flex items-center justify-end h-1  rounded-full bg-transparent  w-[10vw]  appearance-none accent-white hidden hover:cursor-pointer z-50'
                type="range"
                min="0"
                max="1"
                step="0.1"
                defaultValue="0.2"
                onChange={(event)=>handleVolume(event)}
                value={volume}
        />
  
  
  
        
                      </div>
  
  
  
  
  
  
                 
            </div>
          
       </div>
       )
       
       

  return (
    <div className={`flex flex-col w-screen `}>

     <div>
      
     </div>
     <div className='flex items-center justify-between w-full h-20 px-4 bg-black'>

      <div className='flex items-center space-x-4'>
   <div className="relative flex items-center justify-center flex-shrink-0 w-16 h-16 mx-2 bg-black lg:mx-0 rounded-xl">

          <Image src={data.trackImage}  quality={100}
      fill
      sizes="100vw"
      style={{
        objectFit: 'cover',
      }} alt="trackImage " className='rounded-md'/>

      
          </div>

          <div className='flex flex-col space-y-1'>
  <p className='text-sm font-semibold'>{data.artist}</p>
  <p  className='text-xs font-thin'>{data.title}</p>
</div>

      </div>

       

         


          <audio controls  ref={audioRef} className='hidden' preload="metadata" src={data.song} 
              
          >


</audio>

          <div className='flex flex-col items-center '>
               <div className='flex items-center mt-4 space-x-4' >
                <button>
                   <CiShuffle className="text-white duration-700 w-7 h-7 opacity-60 hover:opacity-100 " />
                </button>
                   <button>
                                        <MdSkipPrevious className="text-white duration-700 w-7 h-7 opacity-60 hover:opacity-100 " onClick={handlePrevious} onDoubleClick={()=>setCurrentPlay(currentPlay -1)}/>

                   </button>
                    <div>
                    
                               <AiFillPlayCircle className={`w-12 h-12 ${play?"hidden":"block"} hover:cursor-pointer`} onClick={handlePlay}/> 
                        
                            
                           <AiFillPauseCircle className={`w-12 h-12 ${play?"block":"hidden"} hover:cursor-pointer`} onClick={handlePause}/>   
                    </div>
               <button>
                                    <MdSkipNext className="text-white duration-700 w-7 h-7 opacity-60 hover:opacity-100 " onClick={handdleNext}/>

               </button>

               <button onClick={handleRepeat} className={` ${looped?"hidden":""}`}>
                                    <MdOutlineRepeat className={`w-8 h-8  text-white opacity-60 hover:opacity-100 duration-700  `}/>
                                    

               </button>
               <button onClick={handleRepeatFalse} className={`${looped?"":"hidden"} `}>
                      <MdOutlineRepeatOne className={`w-8 h-8  text-brandColor  duration-700 `}/>
               </button>
              
               </div>
               <div className='flex items-center mb-4 space-x-2 hover:cursor-pointer'>
    <p className='text-xs'>{timeInSec}</p>
                    <div className='relative flex items-center justify-center group '>
 <div className='h-1 w-[40vw] bg-[#b3b3b3] bg-opacity-25 rounded-full group-hover:hidden '>
                   
               </div>                          <div className={`h-1  bg-white rounded-full flex items-center justify-end group-hover:bg-brandColor group-hover:z-50 absolute left-0 hover:cursor-pointer`} style={divStyle}> </div>

                            <input  
       className=' group-hover:flex items-center justify-end h-1  rounded-full bg-transparent  w-[40vw]  appearance-none accent-white hidden hover:cursor-pointer z-50'
        type="range"
        min="0"
        step="1"
        max={`${data.durationInSec}`}
        value={acutalTime}
        onChange={(event) => handleSeek(event)}

        onMouseUp={()=>setSeekOn(false)}

        ref={seekRef}
      />



      
                    </div>
                  
                 <p className='text-xs'>{endTime} </p>
                
               </div>
             
<div className='flex items-center '>
 
    

    
               
</div>
        
          </div>
          <div className='flex items-center space-x-1'> 
          <ImVolumeLow onClick={handleMute} className={`${mute || volume==0  || volume > 0.2 ? "hidden":""}`}/>
          <ImVolumeMedium onClick={handleMute} className={`${mute || volume==0  || volume < 0.3 || volume > 0.5? "hidden":""}`}/>
          <ImVolumeHigh onClick={handleMute} className={`${mute || volume==0 || volume < 0.6 ? "hidden":""}`}/>



          <ImVolumeMute2 onClick={handleNotMute} className={`${mute || volume==0? "":"hidden"}`} />




          
 




               <div className='relative flex items-center justify-center group '>
 <div className='h-1 w-[10vw] bg-[#b3b3b3] bg-opacity-25 rounded-full group-hover:hidden '>
                   
               </div>                          <div className={`h-1  bg-white rounded-full flex items-center justify-end group-hover:bg-brandColor group-hover:z-50 absolute left-0 hover:cursor-pointer`} style={divStyle2}> </div>

                            <input  
       className=' group-hover:flex items-center justify-end h-1  rounded-full bg-transparent  w-[10vw]  appearance-none accent-white hidden hover:cursor-pointer z-50'
              type="range"
              min="0"
              max="1"
              step="0.1"
              defaultValue="0.5"
              onChange={(event)=>handleVolume(event)}
              value={volume}
      />



      
                    </div>






               
          </div>
        
     </div>
     <div className='w-full h-4 bg-brandColor'></div>
    </div>
  )
}

export default PlayBar

