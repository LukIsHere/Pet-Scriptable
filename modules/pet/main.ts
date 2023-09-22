import { ctx } from "./screen";

export function initPet(id:string,data:object,save:(object)=>void){
    var screen = new ctx(id)

    setInterval(()=>{
        screen.fill("white")
        screen.drawText("#1C1C1E","yo sooner or later",100,100)
    },1000/60);
}