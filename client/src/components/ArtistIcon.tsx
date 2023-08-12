import React, { useEffect, useState } from 'react'
import {BsPlayFill} from "react-icons/bs"
import Image from 'next/image'
import { TrackProp } from '../../interfaces'
import Link from 'next/link'


const ArtistIcon = ({artist}:any) => {

     if(!artist)return <div></div>


  return (
     <Link href={`/artist/${artist.id}`} className="flex relative h-60  w-[30vw]  bg-[#181818]  rounded-xl px-4 flex-col group hover:bg-[#282828] duration-700 py-4">
     <div className=" relative flex items-center justify-center flex-shrink-0 w-20 h-20 mx-2 bg-black lg:mx-0 rounded-full">
      <Image src={artist.coverImage}  quality={100}
      fill
      sizes="100vw"
      style={{
        objectFit: 'cover',
      }} alt="trackImage " className='rounded-full'/>

  
     </div>
       <div className='absolute z-50 flex items-center justify-center w-12 h-12 duration-700 translate-y-2 rounded-full opacity-0 right-2 bg-brandColor bottom-4 group-hover:opacity-100 group-hover:translate-y-0'>
      <BsPlayFill className="w-8 h-8 text-black"/>
     </div>

<div className='w-full'>
<div className='flex flex-col flex-wrap items-start  space-y-2 mt-4'>
                 <p className='text-4xl'>{artist.name}</p>
                 <div className="bg-[#111111] flex items-center px-4 py-1 rounded-full" >

                               <p className='text font-light text-left text-white/50 '>Artist </p>      
                 </div>

                
     </div>
     

</div>
     
     </Link>
  )
}

export default ArtistIcon



