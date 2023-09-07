import { ctx } from "./modules/webview/screen";
import { getImage, pingScript} from "./modules/webview/wk2scriptable";

//code

async function main(){
    console.log("RUN webview.js")
    await pingScript()

    var screen = new ctx("screen");
    screen.drawImage(await getImage("heart"),0,0,128,128);
    screen.drawText("white","hello world",0,140,24);
}


main();
completion();