var onData;
export function request(data){
    return new Promise((res,rej)=>{
        onData = res;
        completion(data);
    }).catch(onData);
}
export function getImage(name){
    return new Promise(async(res,rej)=>{
        var b64 = await request("IMAGE "+name);
        var img = new Image()
        img.src = "data:image/png;base64,"+b64
        img.onload = ()=>{//yes js can't load base64 image right away
            res(img);
        }
    })
}
export async function pingScript(){//check if connection exists
    return await request("PING")
}
export async function loadFile(name){
    return await request("LOAD "+name)
}
export async function saveFile(name,data){
    return await request("SAVE "+name+" "+data)
}