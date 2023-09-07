import { cacheLD, dirLD, dirSV, netLD } from "./fs";
import { watcher } from "./scriptable2wk";
  
  export async function makeWebView(){
    console.log(latestVersion)
    console.log(version)

    var wv = new WebView();
    
    var html = await cacheLD("main.html",version.html!=latestVersion.html)
    var script = await cacheLD("webview.js",version.htmScript!=latestVersion.htmScript)

    dirSV("version.json",JSON.stringify(latestVersion))

    await wv.loadHTML(html)
    
    wv.present(true)

    await wv.evaluateJavaScript(script,true)
  
    console.log("INIT WATCHER")
    watcher(wv);
  }