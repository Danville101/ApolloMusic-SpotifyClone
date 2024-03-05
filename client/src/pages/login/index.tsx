import Image from 'next/image'

import React, { useState } from 'react'
import { useRouter } from 'next/router'
const Login = () => {
     const router = useRouter()

     const [email ,setEmail]= useState("")
     const [password ,setPassword]= useState("")
     const [errorMessage, setErrorMessage]= useState("")
   
      
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
      }).then(async response=>{
       
          if(response.status <300){ 
            localStorage.setItem("PlayerBar", "active")
          router.push('/')}
          else{
            const data:any =  await response.json()
            
            setErrorMessage(data)
            setTimeout(()=>{
              setErrorMessage("")
            },4000)
          }

        })

    }
  return (
    <div className='bg-[#181818] h-screen w-creen flex flex-col  items-center space-y-12 pb-20'>
     <div className="flex items-center w-screen px-4 bg-black h-14">
     </div>
<div className="flex items-center justify-center w-full h-full">
  <div className='w-[50vw] h-[60vh] lg:bg-black rounded-xl flex flex-col items-center py-12 mb-12'>
          <p className='text-2xl lg:text-5xl'>Log in to Spotify Clone</p>

          <form onSubmit={login}
     className='flex flex-col mt-5 space-y-6 rounded-xl md:space-y-5'>
    <div className="flex items-center justify-center w-full">
      <p className={`text-red-200 rounded-md ${errorMessage.length > 0? "scale-100":"scale-0"} duration-700 `} >
        {errorMessage}
      </p>
      
      </div>
        <div className='flex flex-col'>
      
                <p>Email</p>
        <input className='py-4 pl-2 border border-white/50 rounded-md outline-none w-80 bg-[#121212] ' value={email} onChange={(e)=>setEmail(e.target.value)}  type="email" placeholder='Email'/>
     
          </div>

          <div className='flex flex-col'>

           <p>Password</p>
        <input className='py-4 pl-2 border-2 rounded-md outline-none w-80 bg-[#E8F0FE] text-black' required minLength={5}  value={password} onChange={(e)=>setPassword(e.target.value)}  type="password" placeholder='Password' data-testid="Password1"/>
     
          </div>
      

        <div className='flex justify-between w-80 ' >
          
          
  

       
</div>
         
        <input type='submit' value="Log In" className='px-1 py-4 text-white duration-500 rounded-full bg-brandColor hover:opacity-70 active:scale-90 w-80 bottom-4 hover:cursor-pointer'  data-testid="submit" />
     </form>
          
     </div>
</div>
     

    </div>
  )
}

export default Login