import React, { useRef , useEffect, useState} from 'react'
import {MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos} from "react-icons/md"
import {BiSearch} from "react-icons/bi"
import { useRouter } from 'next/router'
import { NextRequest } from 'next/server'
import Cookies from 'js-cookie';
import Link from 'next/link'
import{ RxAvatar} from "react-icons/rx"
import {FaRegUser} from "react-icons/fa"


const TopNav = () => {



  const router = useRouter()
  const loggedIn = Cookies.get("Logged_In")
  const [menuDrop , setMenuDrop] = useState(false)

  const logOut = (e:any)=>{

    e.preventDefault()
      fetch("http://localhost:5221/api/logout",{
         method: 'POST',
         mode: 'cors',
         credentials: "include",
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         }
     }).then(response=>{
      
         if(response.status <300){ 
          router.reload()
     }
     
       })

      }


  
  const searchRef = useRef(null)

  

  const searchHandeler=(phrase:string)=>{
    if(phrase.length > 0){
    if(router.asPath.includes("search/")){
      router.replace(`${phrase}`)
    }else{
     router.replace(`search/${phrase}`)}}else{
      router.replace("/search")
     }

  
  }
  return (
    <div>
       <div className='flex flex-col bg-black rounded-t-md bg-opacity-30'>
     <div className='flex items-center justify-between p-4 '>
      <div className='flex items-center'>
       <div className='flex items-center justify-between w-20 h-auto'>
   <button className='flex items-center justify-center w-8 h-8 bg-black bg-opacity-50 rounded-full' onClick={router.back}>
     <MdOutlineArrowBackIosNew className="w-6 h-6 opacity-50 "/>
   </button>
   
   <button className='flex items-center justify-center w-8 h-8 bg-black bg-opacity-50 rounded-full' onClick={router.forward}>
     <MdOutlineArrowForwardIos className="w-6 h-6 "/>
   </button>
 

   
 </div>
      
 <div className={` items-center ${router.asPath.includes("search")?"flex":"hidden"}`}>

<BiSearch className="translate-x-5 "/>


<input className='bg-[#252525] h-10 text-xs font-light rounded-full pl-6 w-52 outline-none focus:outline-white hover:border hover:border-white/50 focus:border-none' placeholder='What do you want to listen to ?'
onChange={(e)=>searchHandeler(e.target.value)}
onMouseEnter={(e)=>{e.currentTarget.focus()}}
value={router.query.phrase}
  ref={searchRef}
/>
</div>
      </div>




 
       <div className={`flex space-x-8 items-center ${loggedIn == "true"?"hidden":""}`}>
        <Link href={"/signup"}>
         <button>Sign up</button>
        </Link>
        
        <Link href={"/login"} >
 
         <button className='px-8 py-2 text-black bg-white rounded-full'>Log in</button>
        </Link>
       
       </div>
       
       <div className={`flex space-x-8 items-center ${loggedIn == "true"?"":"hidden"}`}>
      

 <button className="flex items-center justify-center w-10 h-10 bg-black rounded-full" onClick={()=>setMenuDrop(!menuDrop)}>

                   <FaRegUser className="w-6 h-6"/>
          </button>
       
        
    

         


       
       </div>

       
     </div>
     <div>
       
     </div>
    
   </div>
   <div className={`absolute w-40 h-24  z-50 right-8 bg-[#282828] rounded-md flex items-center justify-center px-2 mt-2 ${menuDrop? "":"hidden"}`}>
    <button className='w-full py-2 hover:bg-[#696969] rounded-md text-sm' onClick={logOut}>Log out</button>
   </div>
    </div>
    
  )
}

export default TopNav


