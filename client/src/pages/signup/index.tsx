import Image from 'next/image'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'

const SignUp = () => {
  const router = useRouter()

     const [dataAdded, setDataAdded]= useState(false)
     const [userName,  setUserName]= useState("")
     const [email ,setEmail]= useState("")
     const [password ,setPassword]= useState("")
     const [password2 ,setPassword2]= useState("")


     const [userNameClickState,  setUserNameClickState]= useState(false)
     const [emaiClickState ,setEmailClickState]= useState(false)
     const [passwordClickState ,setPasswordClickState]= useState(false)
     const [password2ClickState ,setPassword2ClickState]= useState(false)
    
     const [birthYear, setBirthYear]=useState("1992")
     const [birthMonth, setBirthMonth]=useState("1")
     const [birthDay, setBirthDay]=useState("1")
     const [errorMessage, setErrorMessage]= useState("")
      //const [dateOfBirth, setDateOfBirth]= useState(`${birthYear}-${birthMonth}-${birthDay}`)
      
      const dateOfBirth=`${birthYear}-${birthMonth}-${birthDay}`

      const inputNametHandler=(e:any)=>{
        if (e.target.value.length == 0) {
          setUserNameClickState(true)
        }else{
          setUserNameClickState(false)
        }

      }
    
      const inputEmailtHandler=(e:any)=>{
        if (e.target.value.length == 0) {
          setEmailClickState(true)
        }else{
          setEmailClickState(false)
        }

      }
    
      const inputPasswrodtHandler=(e:any)=>{
        if (e.target.value.length == 0) {
          setPasswordClickState(true)
        }else{
          setPasswordClickState(false)
        }

      }
    
      const inputPassword2tHandler=(e:any)=>{
        if (e.target.value.length == 0) {
          setPassword2ClickState(true)
        }else{
          setPassword2ClickState(false)
        }

      }
    
     //const [register] = useRegisterMutation()


    useEffect(()=>{
      if(userName.length==0 || email.length==0 || password2.length == 0 || password.length == 0){
        setDataAdded(false)
      }else{
        setDataAdded(true)
      }


    },[email.length, password.length, password2.length, userName.length])
    
   const[passwordsDontMatch, setPasswordDontMatch]=useState("")
   
    const SingUp = (e:any)=>{

     e.preventDefault()
     if(password != password2){
      setPasswordDontMatch("Password do not match")
      setTimeout(()=>{
        setPasswordDontMatch("")
      },4000)
      
     }else if(dataAdded ){

      fetch("http://localhost:5221/api/user",{
          method: 'POST',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
               username: userName,
               email: email,
               password: password,
               password2: password2,
               birthday: new Date(dateOfBirth)
               
          })
      }).then(async response=>{
       
        if(response.status <300){ 
          localStorage.setItem("PlayerBar", "active")
        router.push('/login')}
        else{
          const data:any =  await response.json()
          
          setErrorMessage(data)
          console.log(errorMessage.length)
          setTimeout(()=>{
            setErrorMessage(`${data}+  `)
          },4000)
        }

      })
      }

 

    }


  
    
   
   
   
   
   
   
   const year = new Date().getFullYear()
   const years: string [] = []
   const days: string[] = [];
   const months: string[]=["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
   
   for(let i=1; i<=31; i++){
     days.push(i.toString())
   }
   for(let i=1902; i<=year; i++){
     years.push(i.toString())
   }


     
  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen text-black bg-white'>
     <div className="flex items-center space-x-2">

     <p className='text-4xl font-semibold'>Spotify Clone</p>
     </div>

     <p>Singup with Email Address</p>
     <form onSubmit={SingUp}
     className='flex flex-col mt-5 space-y-6 rounded-xl md:space-y-5'>
       <div className="flex items-center justify-center w-full">
      <p className={`text-red-500 rounded-md ${errorMessage.length == 24? "scale-100":"scale-0"} duration-700 `} >
        {errorMessage}
      </p>
      
      </div>
        <input className={`py-4 pl-2 border rounded-md outline-none w-80  focus:border-sky-500 ${userNameClickState&&"border-red-500"}`} required value={userName} onChange={(e)=>setUserName(e.target.value)}  type="text" placeholder='Name' onBlur={(e)=>inputNametHandler(e)} />

        <input className={`py-4 pl-2 border rounded-md outline-none w-80  focus:border-sky-500 ${emaiClickState&&"border-red-500"}`} required value={email} onChange={(e)=>setEmail(e.target.value)}  type="email" placeholder='Email' onBlur={(e)=>inputEmailtHandler(e)}/>
        <input className={`py-4 pl-2 border rounded-md outline-none w-80  focus:border-sky-500 ${passwordClickState&&"border-red-500"}`} required value={password} onChange={(e)=>setPassword(e.target.value)} minLength={8} type="password" placeholder='Password' data-testid="Password1" onBlur={(e)=>inputPasswrodtHandler(e)}/>
        <input className={`py-4 pl-2 border rounded-md outline-none w-80  focus:border-sky-500 ${password2ClickState&&"border-red-500"}`}  required  value={password2} onChange={(e)=>setPassword2(e.target.value)} minLength={8} type="password" placeholder='Password'  data-testid="Password2" onBlur={(e)=>inputPassword2tHandler(e)}/> 
        <div className="flex items-center justify-center w-full">
      <p className={`text-red-500 rounded-md ${passwordsDontMatch.length > 0? "scale-100":"scale-0"} duration-700 `} >
        {passwordsDontMatch}
      </p>
      </div>
        <div className='text-xl font-bold' >Date of birth</div>


        <div className='flex justify-between w-80 ' >
          
          
            <select value={birthMonth} onChange={(e)=>setBirthMonth(e.target.value)} className='w-32 py-4 pl-2 border-2 rounded-md outline-none focus:border-sky-500'  placeholder='Month' defaultValue={""} >

{months.map((month,i)=>(
    <option key={i} value={month}>{month}</option>
))}

</select>
         



         <select value={birthDay} onChange={(e)=>setBirthDay(e.target.value)} className='w-20 py-4 pl-2 border-2 rounded-md outline-none focus:border-sky-500'  placeholder='Day' defaultValue={""} >

          {days.map((day,i)=>(
              <option key={i} value={day}>{day}</option>
          ))}

          </select>

            
          
         <select value={birthYear} onChange={(e)=>setBirthYear(e.target.value)} className='w-20 py-4 pl-2 border-2 rounded-md outline-none focus:border-sky-500'  placeholder='Year' defaultValue={""} >

          {years.map((year,i)=>(
              <option key={i} value={year}>{year}</option>
          ))}

          </select>

       
</div>
         
        <input type='submit' value="Sign up" className='absolute px-1 py-4 text-white duration-500 rounded-full bg-brandColor hover:opacity-70 active:scale-90 w-80 bottom-4 hover:cursor-pointer'  data-testid="submit" />
     </form>
     
    </div>
  )
}

export default SignUp