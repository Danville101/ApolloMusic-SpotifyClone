// audioSingleton.js
class AudioSingleton {
     constructor() {
       this.audioTag = null;
     }
   
     createAudio(url) {
       if (!this.audioTag) {
         this.audioTag = new Audio(url);
       } else {
         // If you want to change the source URL, you can do it here
         this.audioTag.src = url;
       }
       return this.audioTag;
     }
   }
   
   const audioSingleton = new AudioSingleton();
   export default audioSingleton;
   