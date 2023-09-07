import { dirLD, dirSV, netLD } from "./fs";
import { watcher } from "./scriptable2wk";

export async function loadHtml(latestVersion,version){
    var file
    if(!dev&&latestVersion.html==version.html){
      file = dirLD("main.html")
      if(file)
        return file;
    }
    file = await netLD("main.html")
  
    dirSV("main.html",file)
  
    version.html = latestVersion.html
    dirSV("version.json",JSON.stringify(version))
    
    return file
  }
  
  async function loadScript(latestVersion,version){
    var file
    if(!dev&&latestVersion.htmScript==version.htmScript){
      file = dirLD("webview.js")
      if(file)
        return file;
    }
    file = await netLD("webview.js")
  
    dirSV("webview.js",file)
  
    version.htmScript = latestVersion.htmScript
    dirSV("version.json",JSON.stringify(version))
  
    return file
  }
  
  export async function makeWebView(latestVersion,version){
    var wv = new WebView();
  
    await wv.loadHTML(await loadHtml(latestVersion,version))
    
    wv.present(true)
    
    await wv.evaluateJavaScript(await loadScript(latestVersion,version),true)
  
    console.log("INIT WATCHER")
    watcher(wv);
  }