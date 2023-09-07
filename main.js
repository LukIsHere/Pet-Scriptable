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

async function imageLD(name) {
    var loc = "assets/" + name + ".png";
    var lPath = fm.joinPath(localPath, loc);

    var dir = fm.joinPath(localPath, "assets");
    if (!fm.isDirectory(dir)) {
        fm.createDirectory(dir);
    }

    if (fm.fileExists(lPath)) {
        console.log("LOADED FROM CACHED " + name + ".png");
        return fm.readImage(lPath)
    }

    var path = dist + "/" + loc;
    console.log("GET " + path);
    var req = new Request(path);
    try {
        var img = await req.loadImage();
        fm.writeImage(lPath, img);
        return img;
    } catch (e) {
        console.error("cannot load : " + e);
    }
}
function i2b64(img) {
    return Data.fromPNG(img).toBase64String()
}

async function b64ImageLD(name) {
    var img = await imageLD(name);

    if (!img)
        return;

    return i2b64(img)
}

async function cacheLD(name,reffresh=false){
    var file;

    if(!reffresh){
      file = dirLD("webview.js");
      if(file)
        return file;
    }
    file = await netLD(name);
  
    dirSV(name,file);
  
    return file
}

var onData = (data)=>{console.log(data);};
function watcher(wv,data=undefined) {
  wv.evaluateJavaScript("onData('"+data+"')", true).then(async(res) => {
      var req = res.split(" ");
      if(req[1])
        console.log("WEBKIT "+req[0]+" "+req[1]);
      else
        console.log("WEBKIT "+req[0]);
      
      switch(req[0]){
        case "LOAD":
          var data = dirLD(req[1]);
          if(data)
            watcher(wv, data);
          else
            watcher(wv,"");
          break;
        case "SAVE":
          dirSV(req[1],req[2]);
          watcher(wv, "ok");
          break;
        case "IMAGE":
          watcher(wv, await b64ImageLD(req[1]));
          break;
        case "PING":
          watcher(wv,"PONG");
          break;
        default:
          watcher(wv,"unknown");
      }
  }).catch(onData);
}

async function makeWebView(){
    console.log(latestVersion);
    console.log(version);

    var wv = new WebView();
    
    var html = await cacheLD("main.html",version.html!=latestVersion.html);
    var script = await cacheLD("webview.js",version.htmScript!=latestVersion.htmScript);

    dirSV("version.json",JSON.stringify(latestVersion));

    await wv.loadHTML(html);
    
    wv.present(true);

    await wv.evaluateJavaScript(script,true);
  
    console.log("INIT WATCHER");
    watcher(wv);
  }

function tin(n){
    if(n<10)
      return "0"+n
    return n.toString()
  }
  
  
async function nextEvent(){
    var c = await Calendar.forEvents();
    
    var ev = undefined;
    var td = await CalendarEvent.today(c);
    var thisW = await CalendarEvent.thisWeek(c);
    var nextW = await CalendarEvent.nextWeek(c);
    
    var text = undefined;
    
    var now = Date.now();
    
    if(td.length){
      ev = td[0];
      text = "Today";
    }else if(thisW.length){
      thisW.forEach((e)=>{
        if(ev)
          return;
        if(e.startDate>now)
          ev = e;
      });
    }else if(nextW.length)
      ev = nextW[0];
      
    if(!ev)
      return undefined;
        
    var et = ev.title;
    
    var ey = ev.startDate.getFullYear();
    var em = ev.startDate.getMonth();
    var ed = ev.startDate.getDate();
    
    if(!text)
      text = tin(ed)+"."+tin(em)+"."+ey;
    
    return {
      title:et,
      year:ey,
      month:em,
      day:ed,
      form:text,
      raw:ev
    }
  }

async function makeWidget(){
    var ev = await nextEvent();
  
    var bgc = new Color("1C1C1E");
  
    var w = new ListWidget();
  
    w.backgroundColor = bgc;
  
    w.addImage(await imageLD("heart"));
  
    if(ev){
      w.addText(ev.title);
      w.addText(ev.form);
    }
  
    //w.presentSmall()
    
    Script.setWidget(w);
    Script.complete();
  }

//code
async function main(){
  try{
    if(config.runsInWidget)
      makeWidget();
    else
      makeWebView(latestVersion,version);
  }catch(e){
    console.error(e);
  }
}

main();
