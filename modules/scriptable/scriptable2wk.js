import { b64ImageLD, dirLD, dirSV } from "./fs";


var onData = (data)=>{console.log(data)}
export function watcher(wv,data=undefined) {
  wv.evaluateJavaScript("onData('"+data+"')", true).then(async(res) => {
      var req = res.split(" ")
      if(req[1])
        console.log("WEBKIT "+req[0]+" "+req[1]);
      else
        console.log("WEBKIT "+req[0]);
      
      switch(req[0]){
        case "LOAD":
          var data = dirLD(req[1]);
          if(data)
            watcher(wv, data)
          else
            watcher(wv,"")
          break;
        case "SAVE":
          dirSV(req[1],req[2])
          watcher(wv, "ok")
          break;
        case "IMAGE":
          watcher(wv, await b64ImageLD(req[1]))
          break;
        case "PING":
          watcher(wv,"PONG")
          break;
        default:
          watcher(wv,"unknown")
      }
  }).catch(onData)
}