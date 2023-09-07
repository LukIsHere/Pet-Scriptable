import { makeWebView } from "./modules/scriptable/webview"
import { makeWidget } from "./modules/scriptable/widget"

//code
async function main(){
  try{
    if(config.runsInWidget)
      makeWidget();
    else
      makeWebView(latestVersion,version)
  }catch(e){
    console.error(e)
  }
}

main();