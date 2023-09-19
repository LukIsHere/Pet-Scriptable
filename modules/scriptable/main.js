import { makeWebView } from "./webview"
import { makeWidget } from "./widget"

//code
function main(){
  try{
    makeWebView(latestVersion,version).catch(console.error)
  }catch(e){
    console.log(e)
  }
  
}

main();