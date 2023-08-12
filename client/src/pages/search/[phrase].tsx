import React, { useEffect, useState, useContext } from 'react'
import MainLayout from '@/layout/MainLayout'
import ArtistIcon from '@/components/ArtistIcon'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { BsPlayFill } from 'react-icons/bs'
import { MusicContext } from '../../context/AudioContext'
const SearchResults = () => {



     const router = useRouter()
  

     const [data, setData] = useState([])
     const [loading, setLoading ] = useState(true)
   
     const phrase = router.query.phrase





     useEffect(()=>{

          fetch( `http://localhost:5221/api/Search/${phrase}`).then( async(res)=>{
      
          const data =  await res.json()
      
          setData(data)
          setLoading(false)
          })
           
        },[phrase])

  const { trackAdded , setTrackAdded}:any = useContext(MusicContext)
  const [info, setInfo]=useState("")

           
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
     <MainLayout>
          <div className='flex flex-col pt-20 mx-4'>
               <div className='flex space-x-4 w-full h-72 overflow-hidden'>
                <div className='flex flex-col space-y-4'>
                    <p className={`text-2xl ${!data.Artist[0]?"hidden":""}` } >Artist</p>
                                <ArtistIcon artist={data.Artist[0]} />
                </div>
                  
                
               
<div className='flex flex-col  space-y-4'>
<p className="text-2xl" >Song</p>
<div>
    {data.Song.map((e,i)=>
   { if (i<4) {
     
     return (
     
  
  <div className='w-1/2 items-center flex  group hover:bg-[#b3b3b3]/10 rounded-xl pb-2 px-4 py-2 hover:cursor-pointer ' key={i}  >
      
       <BsPlayFill className="hidden w-6 h-6 text-white group-hover:block" onMouseEnter={()=>setInfo(e)} onClick={Addtrack} />
       <div className='w-[30vw]  flex items-center space-x-2 mr-40'>
       <div className="relative flex items-center justify-center flex-shrink-0 w-10 h-10 mx-2 bg-black lg:mx-0 rounded-xl">
  
  <Image src={e.trackImage}  quality={100}
  fill
  sizes="100vw"
  style={{
  objectFit: 'cover',
  }} alt="trackImage " className='rounded-md'/>
  
  
  </div>
  <div className='flex flex-col '>
      <p className='text-sm hover:underline whitespace-nowrap ' >{e.title}</p> 
      <p className='text-xs font-thin hover:underline whitespace-nowrap '  >
       {e.artist}
      </p>
       
  </div>
            
       
       
       </div>
  
  
       <span className=' flex items-center justify-center '>
       <p className='text-sm text-left' >{String(e.duration).substring(3,8)}</p>
       </span>
   
 
    </div>
  
  )
   }


    }
    
   )}  
</div>
    
</div>
                    
               </div>


          </div>

     </MainLayout>
  )
}

export default SearchResults