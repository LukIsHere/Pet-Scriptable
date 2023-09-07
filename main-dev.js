import { makeWebView } from "./modules/scriptable/webview"
import { makeWidget } from "./modules/scriptable/widget"

if(!settings){
  var settings = {
    calendar:true,
    offline:false
  }
}

if(!version){
  var version = {
      mainScript:"0.0",
      html:"0.0",
      htmScript:"0.0"
  }
}
if(!latestVersion){
  var latestVersion = version
}

//code
async function main(){
  if(config.runsInWidget)
    makeWidget()
  else
    makeWebView(latestVersion,version)
}

main();