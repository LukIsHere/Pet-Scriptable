'use strict';

function saveData(data){
    window.location.href = "https://save.pl/"+JSON.stringify(data);
}

if(!save){
    var save = {};
}

setInterval(()=>{
    saveData(save);
},1000);
