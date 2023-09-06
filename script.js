//settings

var settings = {
    calendar:true,
    offline:false
}

//source code : https://github.com/LukIsHere/Pet-Scriptable

var dev = false

//location of files
var dist
if(dev)
    dist = "http://192.168.1.6:5500"//my pc local ip
else
    dist = "https://raw.githubusercontent.com/LukIsHere/Pet-Scriptable/main"

//helper
// add _ to not get conflict with main script
function _netLD(file){
    var path = dist+"/"+file
    console.log("GET "+path)
    var req = new Request(dist+"/"+file)

    return req.loadString()
}

var fm = FileManager.local()

var localPath = fm.documentsDirectory()

function _dirLD(file){
    var path = fm.joinPath(localPath,file)

    if(fm.fileExists(path)){
        console.log("LOADED "+file)
        return fm.readString(path)
    }

    console.warn("NOT FOUND "+file)
    return undefined;
}

function _dirSV(file,data){
    var path = fm.joinPath(localPath,file)
    
    fm.writeString(path,data)
    console.log("SAVED "+file)
}
//version checking
try{
  var _cv = JSON.parse(_dirLD("version.json"))
}catch(e){}

var _lv
try{
    _lv = JSON.parse(await _netLD("version.json"))//when can't fetch
}catch(e){
    _lv = _cv
    console.warn("no internet")
}

if(_cv==undefined){
    _cv = {
        mainScript:"0.0",
        html:"0.0",
        htmScript:"0.0"
    }

    _dirSV("version.json",JSON.stringify(_cv))

    if(_lv==undefined)
        throw "cannot load script (no internet connection)"
}

//loading main script
if(_cv.mainScript==_lv.mainScript&&!dev){
    mainScript = _dirLD("main.js")
}else{
    mainScript = await _netLD("main.js")
    
    _dirSV("main.js",mainScript)
    
    _cv.mainScript = _lv.mainScript

    _dirSV("version.json",JSON.stringify(_cv))
}

var version = _cv;

//running main script
eval(mainScript)//u can find main script in github repo