'use-client'
import Image from 'next/image';
import { Inter } from 'next/font/google';
import {HiSearch, HiMenu} from "react-icons/hi";
import MainLayout from '@/layout/MainLayout';
import {BsPlayFill} from "react-icons/bs"
import TrackIcon from '@/components/TrackIcon';
import { Track, TrackProps } from '../../interfaces';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {


  const [tracks,setTracks]= useState([])

  const [loading, setloading] = useState(true)
  useEffect(() => {
    fetch('http://localhost:5221/api/track')
      .then((res) => res.json())
      .then((data) => {
        setTracks(data)
        setloading(false)
        
      })
  }, [])


  if(loading) return <div></div>

  return (
    <div className='w-full h-screen '>




    <div className='flex p-2'>
      <MainLayout>
        <div className='h-screen px-4 py-16 mt-2 rounded-md '>
     
           <p className='ml-2 text-2xl'>Focus</p>

           <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 grid-rows-4 gap-4  mt-4 pb-28 md:pr-[10vw]'>

            {tracks.map((e:any,i:number)=>(
            <div className="w-20" key={i}>
                <TrackIcon track={e} key={i}/>
            </div>
               
            )

              
            )}
       
            
           </div>
          
        </div>
    
      </MainLayout>
    </div>

    </div>
  )
}


