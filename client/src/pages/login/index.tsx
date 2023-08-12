import Image from 'next/image'

import React, { useState } from 'react'
import { useRouter } from 'next/router'
const Login = () => {
     const router = useRouter()

     const [email ,setEmail]= useState("")
     const [password ,setPassword]= useState("")
   
      
    const login = (e:any)=>{

     e.preventDefault()
       fetch("http://localhost:5221/api/login",{
          method: 'POST',
          mode: 'cors',
          credentials: "include",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
               email: email,
               password: password,
          
               
          })
      }).then(response=>{
       
          if(response.status <300){ 
            localStorage.setItem("PlayerBar", "active")
          router.push('/')}
          router.reload()
        })

    }
  return (
    <div className='bg-[#181818] h-screen w-creen flex flex-col  items-center space-y-12 pb-20'>
     <div className="flex items-center w-screen px-4 bg-black h-14">
          <Image src={"/spotify.svg"} width={35} height={35} alt=""/>
     </div>

     <div className='w-[50vw] h-full bg-black rounded-xl flex flex-col items-center py-12 mb-12'>
          <p className='text-5xl'>Log in to Spotify</p>

          <form onSubmit={login}
     className='flex flex-col mt-5 space-y-6 rounded-xl md:space-y-5'>

        <div className='flex flex-col'>
                <p>Email</p>
        <input className='py-4 pl-2 border border-white/50 rounded-md outline-none w-80 bg-[#121212] ' value={email} onChange={(e)=>setEmail(e.target.value)}  type="email" placeholder='Email'/>
     
          </div>

          <div className='flex flex-col'>

           <p>Password</p>
        <input className='py-4 pl-2 border-2 rounded-md outline-none w-80 bg-[#E8F0FE] text-black'  value={password} onChange={(e)=>setPassword(e.target.value)}  type="password" placeholder='Password' data-testid="Password1"/>
     
          </div>
      

        <div className='flex justify-between w-80 ' >
          
          
  

       
</div>
         
        <input type='submit' value="Log In" className='px-1 py-4 text-white duration-500 rounded-full bg-brandColor hover:opacity-70 active:scale-90 w-80 bottom-4 hover:cursor-pointer'  data-testid="submit" />
     </form>
          
     </div>

    </div>
  )
}

export default Login