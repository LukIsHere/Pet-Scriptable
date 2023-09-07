export function netLD(file) {
    var path = dist + "/" + file
    console.log("GET " + path)
    var req = new Request(dist + "/" + file)

    return req.loadString()
}

var fm = FileManager.local()

var localPath = fm.documentsDirectory()

export function dirLD(file) {
    var path = fm.joinPath(localPath, file)

    if (fm.fileExists(path)) {
        console.log("LOADED " + file)
        return fm.readString(path)
    }

    console.warn("NOT FOUND " + file)
    return undefined;
}

export function dirSV(file, data) {
    var path = fm.joinPath(localPath, file)

    fm.writeString(path, data)
    console.log("SAVED " + file)
}

export async function imageLD(name) {
    var loc = "assets/" + name + ".png"
    var lPath = fm.joinPath(localPath, loc)

    var dir = fm.joinPath(localPath, "assets")
    if (!fm.isDirectory(dir)) {
        fm.createDirectory(dir)
    }

    if (fm.fileExists(lPath)) {
        console.log("LOADED FROM CACHED " + name + ".png")
        return fm.readImage(lPath)
    }

    var path = dist + "/" + loc
    console.log("GET " + path)
    var req = new Request(path)
    try {
        var img = await req.loadImage()
        fm.writeImage(lPath, img)
        return img;
    } catch (e) {
        console.error("cannot load : " + e)
    }
}
export function i2b64(img) {
    return Data.fromPNG(img).toBase64String()
}

export async function b64ImageLD(name) {
    var img = await imageLD(name)

    if (!img)
        return;

    return i2b64(img)
}