import { StaticImport } from "next/dist/shared/lib/get-img-props"

export interface Track {
     id: string
        title: string
        song: string
        artist: string
        artistId:string
        trackImage: string | StaticImport
        genre: string,
        plays: number,
        durationInMilliSec: number
        durationInSec: number
        createdDate: Date| null
        duration:string
}

export interface TrackProps{
     tracks : Track []
}
export interface TrackProp{
     track: Track
}

export interface ComponentProp {
     children: React.ComponentType<any>; // Define the type for the "Component" prop
     
   }
   


export interface Tracks{
     head : Head
     

}



interface Head{
   value: {
     _id: string,
     Title: string,
     Song: string,
     Artist:string,
   TrackImage:string,
     Genre: string,
     Duration:string
   },
   next : Head
}

