"use client"
import React, { useEffect } from 'react'
import MainLayout from '@/layout/MainLayout'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
const Search = () => {
  

   const [genres, setGenres] = useState([])
   const [loading, setLoading ] = useState(true)

   useEffect(()=>{
     fetch(`http://localhost:5221/api/genre`).then( async(res)=>{

     const data =  await res.json()

     setGenres(data)
     setLoading(false)
     })
      
   },[])



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
   

  if(loading) return <div className='grid grid-cols-2 gap-4 mt-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6' >
   
  </div>


  return (
     <div className='pt-2'>
          <MainLayout>


<div className='h-screen px-4 pt-20 rounded-md 2xl:pr-[10%] '>
     
     <p className='ml-2 text-2xl '>Browse all</p>

     <div className='grid grid-cols-2 gap-4 mt-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
{ genres.map((e:any,i:number)=>(
<Link href={`/genre/${e.name}`} className={` w-40 xl:w-[10vw] h-40 2xl:h-64    rounded-md flex pt-4 px-4 text-2xl`} key={i} style={{backgroundColor: colourPicker[e.name]}}>
   <p>{e.name}</p>

</Link>


))}
     

     </div>
    
  </div>




     </MainLayout>  
     </div>
   
  )
}

export default Search


