export class ctx {
    ctx:CanvasRenderingContext2D;
    canvas:HTMLCanvasElement;
    constructor(id:string = "screen") {
        this.canvas = document.getElementById(id) as HTMLCanvasElement;
        var c = this.canvas.getContext("2d")
        if(!c)
            throw "wrong canvas id"
        this.ctx = c;
    }
    fill(c:string) {
        this.ctx.fillStyle = c;
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    }
    fillRect(c:string, x:number, y:number, w:number, h:number) {
        this.ctx.fillStyle = c;
        this.ctx.fillRect(x, y, w, h);
    }
    fillRectCenter(c:string, x:number, y:number, w:number, h:number){
        this.ctx.fillStyle = c;
        this.ctx.fillRect(x-(w/2),y-(h/2),w,h);
    }
    drawImage(i:HTMLImageElement, x:number, y:number, w:number, h:number) {
        this.ctx.drawImage(i, x, y, w, h);
    }
    drawImageCenter(i:HTMLImageElement, x:number, y:number, w:number, h:number) {
        this.ctx.drawImage(i,x-(w/2),y-(h/2),w,h);
    }
    drawImageCenterR(i:HTMLImageElement, x:number, y:number, w:number, h:number,rotation:number){
        this.ctx.save()
        this.ctx.translate(x,y);
        this.ctx.rotate(rotation*Math.PI/180)
        this.ctx.drawImage(i,-w/2,-h/2,w,h);
        this.ctx.restore()
    }
    drawLine(c:string,x:number,y:number,x2:number,y2:number,t:number){
        this.ctx.beginPath();
        this.ctx.strokeStyle = c;
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x2, y2);
        this.ctx.lineWidth = t;
        
        this.ctx.stroke();
    }
    drawText(c:string,text:string,x:number,y:number,fontSize:12=12){
        this.ctx.fillStyle = c;
        this.ctx.font = fontSize+"px Arial";

        this.ctx.fillText(text.toString(),x,y);
    }
    realPos(x:number,y:number){
        const rect = this.canvas.getBoundingClientRect();
        const elementRelativeX = x - rect.left;
        const elementRelativeY = y - rect.top;
        const canvasRelativeX = elementRelativeX * this.canvas.width / rect.width;
        const canvasRelativeY = elementRelativeY * this.canvas.height / rect.height;
        
        return {x:Math.round(canvasRelativeX),y:Math.round(canvasRelativeY)}
    }
    lastX:number
    lastY:number
    setClickEvent(func:(x:number,y:number)=>void){
        this.canvas.onclick = (e)=>{
            var pos = this.realPos(e.clientX,e.clientY)
            func(pos.x,pos.y)
        }
    }
    setMouseDownEvent(func:(x:number,y:number)=>void){
        this.canvas.onmousedown = (e)=>{
            var pos = this.realPos(e.clientX,e.clientY)
            func(pos.x,pos.y)
        }
        this.canvas.ontouchstart = (e)=>{
            if(!e.targetTouches[0])
             return;
            var touch = e.targetTouches[0];
            var pos = this.realPos(touch.clientX,touch.clientY)
            this.lastX = pos.x
            this.lastY = pos.y
            func(pos.x,pos.y)
        }
    }
    setMouseUpEvent(func:(x:number,y:number)=>void){
        this.canvas.onmouseup = (e)=>{
            var pos = this.realPos(e.clientX,e.clientY)
            func(pos.x,pos.y)
        }
        this.canvas.ontouchend = (e)=>{
            func(this.lastX,this.lastY)
        }
    }
    setMouseMoveEvent(func:(x:number,y:number)=>void){
        this.canvas.onmousemove = (e)=>{
            var pos = this.realPos(e.clientX,e.clientY)
            func(pos.x,pos.y)
        }
        this.canvas.ontouchmove = (e)=>{
            if(!e.targetTouches[0])
             return;
            var touch = e.targetTouches[0];
            var pos = this.realPos(touch.clientX,touch.clientY)
            this.lastX = pos.x
            this.lastY = pos.y
            e.preventDefault();
            func(pos.x,pos.y)
        }
    }
    setFrame(func:()=>void){
        setInterval(func, 1000/30);
    }
}