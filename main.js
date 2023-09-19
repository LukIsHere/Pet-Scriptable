'use strict';

function netLD(file) {
    var path = dist + "/" + file;
    console.log("GET " + path);
    var req = new Request(dist + "/" + file);

    return req.loadString()
}

var fm = FileManager.local();

var localPath = fm.documentsDirectory();

function dirLD(file) {
    var path = fm.joinPath(localPath, file);

    if (fm.fileExists(path)) {
        console.log("LOADED " + file);
        return fm.readString(path)
    }

    console.warn("NOT FOUND " + file);
    return undefined;
}

function dirSV(file, data) {
    var path = fm.joinPath(localPath, file);

    //console.log("SV "+data);

    fm.writeString(path, data);
    console.log("SAVED "+file);
}

async function cacheLD(name,reffresh=false){
    var file;

    if(!(reffresh||dev)){
      file = dirLD(name);
      if(file)
        return file;
    }

    file = await netLD(name);
  
    dirSV(name,file);
  
    return file
}

var save;
function autosave(req){
  req = req.replaceAll("%7B","{");
  req = req.replaceAll("%7D","}");
  req = req.replaceAll("%5B","[");
  req = req.replaceAll("%5D","]");
  req = req.replaceAll("%22","\"");
  var newSV = JSON.parse(req);
  if(JSON.stringify(save)!=JSON.stringify(newSV)){
    save = newSV;
    console.log("save completed "+JSON.stringify(newSV));
  }
}
  
async function makeWebView(){

  var wv = new WebView();
  
  var html = await cacheLD("main.html",version.html!=latestVersion.html);
  var script = await cacheLD("webview.js",version.htmScript!=latestVersion.htmScript);

  dirSV("version.json",JSON.stringify(latestVersion));
  await wv.loadHTML(html);
  
  wv.shouldAllowRequest = (req)=>{
    if(req.url.split("/")[2]=='save.pl')
        autosave(req.url.slice(16));

    return true
  };

  wv.evaluateJavaScript(script);

  wv.present(true);
}

//code
function main(){
  try{
    makeWebView(latestVersion,version).catch(console.error);
  }catch(e){
    console.log(e);
  }
  
}

main();
