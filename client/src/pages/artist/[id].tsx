import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import Image from 'next/image'
import {BsPlayFill} from "react-icons/bs"

import { NextPageContext } from 'next'
import { useRouter } from 'next/router'
const Artist = () => {

  const router = useRouter()
  

  const [artist, setArtist] = useState<any>([])
  const [loading, setLoading ] = useState(true)

  const id = router.query.id

  useEffect(()=>{
    fetch(`http://localhost:5221/api/artist/${id}`).then( async(res)=>{

    const data =  await res.json()

    setArtist(data)
    setLoading(false)
    })
     
  })

  const bgStyle = {
    backgroundImage: `url(${artist.coverImage})`,

  };


  if(loading) return <div></div>

  return (
    <div className='pt-2'>


   
    <MainLayout>

<div
  className="flex   bg-fixed    bg-no-repeat bg-cover  bg-center  h-[50vh]  pl-20  "
  style={bgStyle}
>
 
</div> 
<div className="pl-5 text-6xl font-bold text-white rounded-xl -translate-y-52">
  <p className='text'>
        Buss Head
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
<div className="max-w-lg ">
  
 
  <p className="mt-20 mb-4">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat a
    magna non varius. Proin leo felis, euismod non porta eget, varius sit amet
    sapien. Maecenas in nulla at leo convallis consectetur id a sapien. Nulla
    nec pulvinar nisi. Vivamus non facilisis lacus, et volutpat libero. Nulla ac
    odio aliquam, accumsan arcu ut, lacinia est. Nulla eu sem elit. Fusce nec
    laoreet sem, semper molestie libero.
  </p>
  <p className="mb-4">
    Ut sagittis lacus consequat accumsan venenatis. Sed sollicitudin, lectus et
    fringilla ultrices, dolor nisi scelerisque tortor, vel finibus magna massa
    non nunc. Phasellus massa quam, egestas a nisl sed, porta volutpat metus.
    Nunc sed elit ac tellus tempor cursus. Suspendisse potenti. Vestibulum
    varius rutrum nisl nec consequat. Suspendisse semper dignissim sem viverra
    semper. Nulla porttitor, purus nec accumsan pharetra, nisi dolor condimentum
    ipsum, id consequat nulla nunc in ligula.
  </p>
  <p className="mb-12">
    Nulla pharetra lacinia nisi, vitae mollis tellus euismod id. Mauris porta
    dignissim hendrerit. Cras id velit varius, fermentum lectus vitae, ultricies
    dolor. In bibendum rhoncus purus vel rutrum. Nam vulputate imperdiet
    fringilla. Donec blandit libero massa. Suspendisse dictum diam mauris, vitae
    fermentum dolor tincidunt in. Pellentesque sollicitudin venenatis dolor,
    vitae scelerisque elit ultrices eu. Donec eget sodales risus, quis dignissim
    neque.
  </p>
</div>
<section
  className="container flex items-center justify-center h-screen m-auto mb-12 bg-fixed bg-center bg-cover custom-img"
>
  <div className="p-5 text-2xl text-white bg-purple-300 bg-opacity-50 rounded-xl">
    Parralax inline
  </div>
</section>
<div className="max-w-lg m-auto">
  <p className="mb-4">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat a
    magna non varius. Proin leo felis, euismod non porta eget, varius sit amet
    sapien. Maecenas in nulla at leo convallis consectetur id a sapien. Nulla
    nec pulvinar nisi. Vivamus non facilisis lacus, et volutpat libero. Nulla ac
    odio aliquam, accumsan arcu ut, lacinia est. Nulla eu sem elit. Fusce nec
    laoreet sem, semper molestie libero.
  </p>
  <p className="mb-4">
    Ut sagittis lacus consequat accumsan venenatis. Sed sollicitudin, lectus et
    fringilla ultrices, dolor nisi scelerisque tortor, vel finibus magna massa
    non nunc. Phasellus massa quam, egestas a nisl sed, porta volutpat metus.
    Nunc sed elit ac tellus tempor cursus. Suspendisse potenti. Vestibulum
    varius rutrum nisl nec consequat. Suspendisse semper dignissim sem viverra
    semper. Nulla porttitor, purus nec accumsan pharetra, nisi dolor condimentum
    ipsum, id consequat nulla nunc in ligula.
  </p>
  <p className="mb-4">
    Nulla pharetra lacinia nisi, vitae mollis tellus euismod id. Mauris porta
    dignissim hendrerit. Cras id velit varius, fermentum lectus vitae, ultricies
    dolor. In bibendum rhoncus purus vel rutrum. Nam vulputate imperdiet
    fringilla. Donec blandit libero massa. Suspendisse dictum diam mauris, vitae
    fermentum dolor tincidunt in. Pellentesque sollicitudin venenatis dolor,
    vitae scelerisque elit ultrices eu. Donec eget sodales risus, quis dignissim
    neque.
  </p>
</div>
</div>



          
    </MainLayout>
 </div>
  )
}

export default Artist



