import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import MusicProvider from '../context/AudioContext'
import FooterPlayBar from '@/components/FooterPlayBar'
import PlayBar from '@/components/PlayerBar'
import { ImVolumeHigh, ImVolumeLow, ImVolumeMedium } from 'react-icons/im'
import { AiFillPauseCircle } from 'react-icons/ai'
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md'
import { useEffect, useState } from 'react'


export default function App({ Component, pageProps }: AppProps) {

  const [playerBar , setPlayerBar] = useState(false)
  useEffect(()=>{
    if(localStorage.getItem("PlayerBar") == "active"){
      setPlayerBar(true)
    }
  },[])

  
  return(
    <MusicProvider  >
         <Component {...pageProps} />
         <div className='fixed bottom-0 '>
<div className={`${!playerBar?"hidden":""}`}>
      <PlayBar/>
</div>







</div>
    </MusicProvider>



  )

}


