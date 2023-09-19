

export function saveData(data){
    window.location.href = "https://save.pl/"+JSON.stringify(data)
}
export function dump(txt){
    document.getElementById("dump").innerHTML = txt
}