import {useMemo, useEffect, useState} from "react";
import { useRouter } from 'next/router';
let  player: HTMLAudioElement

if(typeof window !== 'undefined'){
    player = new Audio
    
}

const  useAudio = (url:string) => {

   const router = useRouter();
    
    const audio = useMemo(() => {

        player.src = url 
        return player
    }  , []);  
  


    const [playing, setPlaying] = useState(false);
    const [duration, setDuration] = useState(0)
    const [currentTime, seCurrentTime] = useState(0)
    const [seek, setSeek] = useState(0)



    const toggle = () => setPlaying(!playing);


 
   // audio.setAttribute("key", `${url}`)
    useEffect(() => {
     
        localStorage.getItem("play") == "true" ? audio.play() : audio.pause();
       

            audio.addEventListener("timeupdate", ()=> {seCurrentTime(audio.currentTime), localStorage.setItem("CurrentTime",String(audio.currentTime)) } )

            audio.addEventListener('loadeddata',()=> setDuration(audio.duration))
            audio.addEventListener('playing',()=> localStorage.setItem("Player", "active"))
            audio.addEventListener('ended',()=> localStorage.removeItem("Player"))

            window.addEventListener("unload",()=>{
             
                audio.play()
            })

            router.events.on('routeChangeComplete', ()=>{
                localStorage.setItem("MemoTime", String(audio.currentTime))
            });

            audio.addEventListener("loadstart",()=>{
                if(audio.currentTime< Number(localStorage.getItem("MemoTime"))){
                    audio.currentTime =  Number(localStorage.getItem("MemoTime")) 
                }
                setTimeout(() => {
                    localStorage.removeItem("MemoTime")
                }, 5);
            })
        
        },
        [playing]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);


    useEffect(()=>{
      audio.currentTime = seek
    },[seek])

   

    return [playing, toggle, currentTime,duration, seek, seCurrentTime, setSeek, setPlaying];
};




export default useAudio;



 export class Player{
    private static instance : Player

    private _audio: HTMLAudioElement = new Audio(); 
    public currentTime : number = 0
    public duation: number = 0
    private Player() {
        
    }


    public static getInstance(): Player{
        if (!Player.instance) {
            Player.instance = new Player();
            
        }
        return Player.instance;
    }

    public ContentPlayer(url:string){
  this._audio.src = url
        if( !localStorage.getItem("Player")  ){

     

 

        localStorage.getItem("play") == "true" ? this._audio.play() : this._audio.pause();
        this._audio.addEventListener("timeupdate", ()=> { localStorage.setItem("CurrentTime",String(this._audio.currentTime)) } )
        this._audio.addEventListener("timeupdate", ()=> { this.currentTime = this._audio.currentTime } )
        this._audio.addEventListener('ended', ()=>{localStorage.setItem("play", "false") });
        this._audio.addEventListener("playing",()=> localStorage.setItem("Player", "active"))
        this._audio.setAttribute('autoplay', 'true')
        this._audio.addEventListener("loadeddata",()=>this.duation = this._audio.duration)

       // this._audio.addEventListener('ended', ()=>{localStorage.removeItem("Player") });

        }
  

        

     
    }


    public Seek(time:number){

        return this._audio.currentTime = time
    }

   



}


