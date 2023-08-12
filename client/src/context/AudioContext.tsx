import React , {createContext,  useState, useEffect} from 'react'
import Cookies from 'js-cookie'


export const MusicContext = createContext({})


const MusicProvider = ({children}:any) => {
  //const loggedIn = Cookies.get("Logged_In")

  const [loggedUser ,setLoggedUser]= useState(false)
  const [trackAdded, setTrackAdded] =useState("")
  const [loginModel, setLoginModel] = useState(false)
  const [modalTrackImage, setModalTrackImage] = useState("")

      

  return (
   <MusicContext.Provider value={{trackAdded, setTrackAdded, loginModel, setLoginModel, modalTrackImage, setModalTrackImage}}>
     {children}
   </MusicContext.Provider>
  )
}


export default  MusicProvider

