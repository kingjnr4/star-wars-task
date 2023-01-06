import { type } from "os"

export default interface SWAPI {
    count:number,
    prev:string|null,
    next:string|null,
    results:Character[]
}

 export interface Character {
name:string
height:string,
gender:string
img:string|undefined
}