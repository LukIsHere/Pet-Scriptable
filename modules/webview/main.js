import { saveData } from "./db.js"
import { initPet } from "../pet/main.js"

if(!save){
    var save = {}
}

initPet("screen",save,saveData)