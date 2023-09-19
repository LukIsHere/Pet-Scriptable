import { dump, saveData } from "./db";
import { ctx } from "./screen";

if(!save){
    var save = {}
}

setInterval(()=>{
    saveData(save)
},1000)