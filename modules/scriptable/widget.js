import { nextEvent } from "./calendar"
import { imageLD } from "./fs"

export async function makeWidget(){
    var ev = await nextEvent()
  
    var bgc = new Color("1C1C1E")
  
    var w = new ListWidget()
  
    w.backgroundColor = bgc
  
    w.addImage(await imageLD("heart"))
  
    if(ev){
      var t1 = w.addText(ev.title)
      var t2 = w.addText(ev.form)
    }
  
    //w.presentSmall()
    
    Script.setWidget(w)
    Script.complete()
  }