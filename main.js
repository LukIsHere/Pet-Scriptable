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

//calendar
function tin(n){
  if(n<10)
    return "0"+n
  return n.toString()
}


async function nextEvent(){
  var c = await Calendar.forEvents()
  
  var ev = undefined
  var td = await CalendarEvent.today(c)
  var thisW = await CalendarEvent.thisWeek(c)
  var nextW = await CalendarEvent.nextWeek(c)
  
  var text = undefined
  
  var now = Date.now()
  
  if(td.length){
    ev = td[0]
    text = "Today"
  }else if(thisW.length){
    thisW.forEach((e)=>{
      if(ev)
        return;
      if(e.startDate>now)
        ev = e;
    })
  }else if(nextW.length)
    ev = nextW[0]
    
  if(!ev)
    return undefined;
      
  var et = ev.title
  
  var ey = ev.startDate.getFullYear()
  var em = ev.startDate.getMonth()
  var ed = ev.startDate.getDate()
  
  if(!text)
    text = tin(ed)+"."+tin(em)+"."+ey
  
  return {
    title:et,
    year:ey,
    month:em,
    day:ed,
    form:text,
    raw:ev
  }
}

//utility
function random(arr=[]){
  return arr[Math.floor(Math.random()*arr.length)]
}

//loading and saving data
function netLD(file){
  var path = dist+"/"+file
  console.log("GET "+path)
  var req = new Request(dist+"/"+file)

  return req.loadString()
}

var fm = FileManager.local()

var localPath = fm.documentsDirectory()

function dirLD(file){
  var path = fm.joinPath(localPath,file)

  if(fm.fileExists(path)){
      console.log("LOADED "+file)
      return fm.readString(path)
  }

  console.warn("NOT FOUND "+file)
  return undefined;
}

function dirSV(file,data){
  var path = fm.joinPath(localPath,file)
  
  fm.writeString(path,data)
  console.log("SAVED "+file)
}

async function imageLD(name){
  var loc = "assets/"+name+".png"
  var lPath = fm.joinPath(localPath,loc)

  var dir = fm.joinPath(localPath,"assets")
  if(!fm.isDirectory(dir)){
    fm.createDirectory(dir)
  }

  if(fm.fileExists(lPath)){
    console.log("LOADED FROM CACHED "+name+".png")
    return fm.readImage(lPath)
  }
  
  var path = dist+"/"+loc
  console.log("GET "+path)
  var req = new Request(path)
  try{
    var img = await req.loadImage()
    fm.writeImage(lPath,img)
    return img;
  }catch(e){
    console.error("cannot load : "+e)
  }
}

//code
async function main(){
  var ev = await nextEvent()

  var bgc = new Color("1C1C1E")

  var w = new ListWidget()

  w.backgroundColor = bgc

  w.addImage(await imageLD("heart"))

  if(ev){
    var t1 = w.addText(ev.title)
    var t2 = w.addText(ev.form)
  }

  w.presentSmall()


  Script.setWidget(w)
  Script.complete()
}

main();