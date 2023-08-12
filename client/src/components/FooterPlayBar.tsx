import React, { useState, useEffect, useRef, useContext , useMemo} from 'react'
import {CiShuffle} from "react-icons/ci"
import { MdSkipPrevious, MdSkipNext, MdOutlineRepeatOne, MdOutlineRepeat } from 'react-icons/md'
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai'
import { BsRepeat, BsRepeat1 } from 'react-icons/bs'
import {ImVolumeLow, ImVolumeMedium, ImVolumeHigh, ImVolumeMute2} from "react-icons/im"
import {} from "react-icons/md"
import Image from 'next/image';
import { MusicContext } from '@/context/AudioContext'
import { useRouter } from 'next/router'

import useAudio from '../../Audio'

const FooterPlayBar = ({tracks}:any) => {
 //const  [playing, toggle,currentTime,duration] = useAudio("http://localhost:5221/tracks/638263608576213880.mp3") 
  const { trackAdded , setTrackAdded}:any = useContext(MusicContext)
  const [data, setData] = useState("")
  const [isLoading, setLoading] = useState(true)
  const [acutalTime, setAcutallTime] = useState(0)
  const router = useRouter()
  


  useEffect(() => {
    fetch('http://localhost:5221/api/current',{
      credentials: "include",
      mode: "cors"
    })
      .then((res) => res.json())
      .then((response) => {
        setData(response.tracks[0])
        setLoading(false)
        localStorage.setItem("DurationInSec", response.tracks[0].DurationInSec)

      })
      
      
  }, [trackAdded])


  let  [playing, toggle,currentTime,duration, seek, setCurrentTime,setSeek, setPlaying] = useAudio("http://localhost:5221/tracks/638267119193418580.mp3") 


     const [mute , setMute]= useState(false)
     const [volume , setVolume]= useState(0.5)

     const audioRef = useRef(null)
     
     const [play, setPlay] = useState(false)
     //const timmy = new Date(data.duration)
     const endTime = String(data.duration).substring(3,8)




     let [timeInSec, setTimeinSec]  = useState("0:00")

     let [intialStart, setIntialStart] =useState(0)

     const divStyle = {
          width:  
               `${  (Number(localStorage.getItem("CurrentTime"))/duration) *100}%`
          ,
          
        };
     const divStyle2 = {
          width: `${volume*100}%`
          ,
          
        };
     
        function secondsToTime(seconds) {
          const minutes = Math.floor((seconds % 3600) / 60);
          const remainingSeconds = seconds % 60;
        
          const formattedTime = `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
            setTimeinSec(formattedTime);
        }
      

  
  const handlePlay =()=>{
   
   localStorage.setItem("play","true")
   setPlaying(true)

    }
  
     

  const handlePause =()=>{
     localStorage.setItem("play","false")
     setPlaying(false)
     
  }

  const [seekOn, setSeekOn]= useState(false)

   const seekRef = useRef(null)
  const [seekTime,setSeekTime]=useState(0)

  const handleSeek =(event:any)=>{
    setSeek( event.target.value);
     setCurrentTime(event.target.value)
  
 
     
  }
        
  const handleVolume =(event:any)=>{
     audioRef.current.volume = event.target.value;
     setVolume(event.target.value);
  
   
     
  }
   const handleMute =()=>{
     setMute(true)
     audioRef.current.muted = true
     
   }
   const handleNotMute =()=>{
     setMute(false)
     audioRef.current.muted = false
     setVolume(0.1)
     audioRef.current.volume  = 0.1
     
   }

   const [looped, setLooped]=useState(false)

   const handleRepeat=()=>{
 setLooped(true)
    audioRef.current.loop = true
   }
   const handleRepeatFalse=()=>{
 setLooped(false)
    audioRef.current.loop = false
   }


   
 const [milli, setMilli] = useState(0)

 useEffect(() => {
  if(audioRef.current && localStorage.getItem("play")=="true"){
    handlePlay()
  }


}, [trackAdded])



  
 useEffect(() => {
  // This function will be called after the component is mounted

  if(localStorage.getItem("play") == "true"){
    if(audioRef.current){
      audioRef.current.play()
    

      if(audioRef.current.currentTime< Number(localStorage.getItem("MemoTime"))){
          audioRef.current.currentTime = Number(localStorage.getItem("MemoTime"))
      }
      
    
      
    }
    setPlay(true)
  }

  if(localStorage.getItem("play") == "false"){
    if(audioRef.current){
      
      audioRef.current.pause()

    
    }
      setPlay(false)
  }


   localStorage.setItem("CurrentTime", String(intialStart))

   if(Number(localStorage.getItem("CurrentTime")) > 0){
     localStorage.setItem("MemoTime", localStorage.getItem("CurrentTime"))
    
   }
   
  


 


  
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [ intialStart, play])





  useEffect(()=>{
    secondsToTime(Math.floor(currentTime))
    setAcutallTime(Math.floor(Number(localStorage.getItem("CurrentTime"))))

    if(seekOn){
      localStorage.setItem("CurrentTime", String(seekTime))
      localStorage.setItem("MemoTime", String(seekTime))

    }





  },[currentTime, seekOn,seekTime])


  
// LocalStorage






  useEffect(()=>{
    if(looped && intialStart==data.durationInSec && play){
      setIntialStart(0)

    }
  },[data.durationInSec, intialStart, looped, play])



  
  if (isLoading) return (
    <div className='flex items-center justify-between w-screen h-20 px-4 bg-black'>

    <div className='flex items-center space-x-4'>
 <div className="relative flex items-center justify-center flex-shrink-0 w-16 h-16 mx-2 bg-black lg:mx-0 rounded-xl">



    
        </div>

        <div className='flex flex-col space-y-1'>

</div>

    </div>

     

       


        <div className='flex flex-col items-center ' onDoubleClick={()=>setTimeinSec(10)}>
             <div className='flex items-center mt-4 space-x-4' >
              <button>
                 <CiShuffle className="text-white duration-700 w-7 h-7 opacity-60 hover:opacity-100 " />
              </button>
                 <button>
                                      <MdSkipPrevious className="text-white duration-700 w-7 h-7 opacity-60 hover:opacity-100 " onClick={()=>setTimeinSec(0)} />

                 </button>
                  <div>
                  
                           
                            
                      
                          
                         <AiFillPauseCircle className={`w-12 h-12  hover:cursor-pointer text-[#b3b3b3]`} onClick={handlePause}/>   
                  </div>
             <button>
                                  <MdSkipNext className="text-white duration-700 w-7 h-7 opacity-60 hover:opacity-100 "/>

             </button>

             <button onClick={handleRepeat} className={` ${looped?"hidden":""}`}>
                                  <MdOutlineRepeat className={`w-8 h-8  text-white opacity-60 hover:opacity-100 duration-700  `}/>
                                  

             </button>
             <button onClick={handleRepeatFalse} className={`${looped?"":"hidden"} `}>
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
    <div className='flex flex-col w-screen'>
      <div>

</div>

      
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

       

         




          <div className='flex flex-col items-center ' onDoubleClick={()=>setTimeinSec(10)}>
               <div className='flex items-center mt-4 space-x-4' >
                <button>
                   <CiShuffle className="text-white duration-700 w-7 h-7 opacity-60 hover:opacity-100 " />
                </button>
                   <button>
                                        <MdSkipPrevious className="text-white duration-700 w-7 h-7 opacity-60 hover:opacity-100 " onClick={()=>setTimeinSec(0)} />

                   </button>
                    <div>
                    
                               <AiFillPlayCircle className={`w-12 h-12 ${localStorage.getItem("play") == "true"?"hidden":"block"} hover:cursor-pointer`} onClick={handlePlay}/> 
                        
                            
                           <AiFillPauseCircle className={`w-12 h-12 ${localStorage.getItem("play") == "true"?"block":"hidden"} hover:cursor-pointer`} onClick={handlePause}/>   
                    </div>
               <button>
                                    <MdSkipNext className="text-white duration-700 w-7 h-7 opacity-60 hover:opacity-100 "/>

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
        max={`${duration}`}
        value={`${Math.floor(currentTime)}`}
        onChange={(event) => handleSeek(event)}

       

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

export default FooterPlayBar

