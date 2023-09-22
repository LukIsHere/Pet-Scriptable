'use strict';

var ctx = /** @class */ (function () {
    function ctx(id) {
        if (id === void 0) { id = "screen"; }
        this.canvas = document.getElementById(id);
        var c = this.canvas.getContext("2d");
        if (!c)
            throw "wrong canvas id";
        this.ctx = c;
    }
    ctx.prototype.fill = function (c) {
        this.ctx.fillStyle = c;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };
    ctx.prototype.fillRect = function (c, x, y, w, h) {
        this.ctx.fillStyle = c;
        this.ctx.fillRect(x, y, w, h);
    };
    ctx.prototype.fillRectCenter = function (c, x, y, w, h) {
        this.ctx.fillStyle = c;
        this.ctx.fillRect(x - (w / 2), y - (h / 2), w, h);
    };
    ctx.prototype.drawImage = function (i, x, y, w, h) {
        this.ctx.drawImage(i, x, y, w, h);
    };
    ctx.prototype.drawImageCenter = function (i, x, y, w, h) {
        this.ctx.drawImage(i, x - (w / 2), y - (h / 2), w, h);
    };
    ctx.prototype.drawImageCenterR = function (i, x, y, w, h, rotation) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(rotation * Math.PI / 180);
        this.ctx.drawImage(i, -w / 2, -h / 2, w, h);
        this.ctx.restore();
    };
    ctx.prototype.drawLine = function (c, x, y, x2, y2, t) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = c;
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x2, y2);
        this.ctx.lineWidth = t;
        this.ctx.stroke();
    };
    ctx.prototype.drawText = function (c, text, x, y, fontSize) {
        if (fontSize === void 0) { fontSize = 12; }
        this.ctx.fillStyle = c;
        this.ctx.font = fontSize + "px Arial";
        this.ctx.fillText(text.toString(), x, y);
    };
    ctx.prototype.realPos = function (x, y) {
        var rect = this.canvas.getBoundingClientRect();
        var elementRelativeX = x - rect.left;
        var elementRelativeY = y - rect.top;
        var canvasRelativeX = elementRelativeX * this.canvas.width / rect.width;
        var canvasRelativeY = elementRelativeY * this.canvas.height / rect.height;
        return { x: Math.round(canvasRelativeX), y: Math.round(canvasRelativeY) };
    };
    ctx.prototype.setClickEvent = function (func) {
        var _this = this;
        this.canvas.onclick = function (e) {
            var pos = _this.realPos(e.clientX, e.clientY);
            func(pos.x, pos.y);
        };
    };
    ctx.prototype.setMouseDownEvent = function (func) {
        var _this = this;
        this.canvas.onmousedown = function (e) {
            var pos = _this.realPos(e.clientX, e.clientY);
            func(pos.x, pos.y);
        };
        this.canvas.ontouchstart = function (e) {
            if (!e.targetTouches[0])
                return;
            var touch = e.targetTouches[0];
            var pos = _this.realPos(touch.clientX, touch.clientY);
            _this.lastX = pos.x;
            _this.lastY = pos.y;
            func(pos.x, pos.y);
        };
    };
    ctx.prototype.setMouseUpEvent = function (func) {
        var _this = this;
        this.canvas.onmouseup = function (e) {
            var pos = _this.realPos(e.clientX, e.clientY);
            func(pos.x, pos.y);
        };
        this.canvas.ontouchend = function (e) {
            func(_this.lastX, _this.lastY);
        };
    };
    ctx.prototype.setMouseMoveEvent = function (func) {
        var _this = this;
        this.canvas.onmousemove = function (e) {
            var pos = _this.realPos(e.clientX, e.clientY);
            func(pos.x, pos.y);
        };
        this.canvas.ontouchmove = function (e) {
            if (!e.targetTouches[0])
                return;
            var touch = e.targetTouches[0];
            var pos = _this.realPos(touch.clientX, touch.clientY);
            _this.lastX = pos.x;
            _this.lastY = pos.y;
            e.preventDefault();
            func(pos.x, pos.y);
        };
    };
    ctx.prototype.setFrame = function (func) {
        setInterval(func, 1000 / 30);
    };
    return ctx;
}());

function initPet(id, data, save) {
    var screen = new ctx(id);
    setInterval(function () {
        screen.fill("white");
        screen.drawText("#1C1C1E", "yo sooner or later", 100, 100);
    }, 1000 / 60);
}

initPet("screen");
