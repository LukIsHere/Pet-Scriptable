import { b64ImageLD, cacheLD, dirLD, dirSV, netLD } from "./fs";

var save;
function autosave(req){
  req = req.replaceAll("%7B","{")
  req = req.replaceAll("%7D","}")
  req = req.replaceAll("%5B","[")
  req = req.replaceAll("%5D","]")
  req = req.replaceAll("%22","\"")
  var newSV = JSON.parse(req)
  if(JSON.stringify(save)!=JSON.stringify(newSV)){
    save = newSV
    console.log("save completed "+JSON.stringify(newSV))
  }
}
  
export async function makeWebView(){

  var wv = new WebView();
  
  var html = await cacheLD("main.html",version.html!=latestVersion.html)
  var script = await cacheLD("webview.js",version.htmScript!=latestVersion.htmScript)

  dirSV("version.json",JSON.stringify(latestVersion))
  await wv.loadHTML(html)
  
  wv.shouldAllowRequest = (req)=>{
    if(req.url.split("/")[2]=='save.pl')
        autosave(req.url.slice(16))

    return true
  }

  wv.evaluateJavaScript(script)

  wv.present(true)
}