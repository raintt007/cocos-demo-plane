cc.Class({  
    extends: cc.Component,  
    properties: {  
        dot: {  
            default: null,  
            type: cc.Node,  
            displayName: '摇杆节点',  
        },  
        _joyCom: {  
            default: null,  
            displayName: 'joy Node',  
        },  
        _playerNode: {  
            default: null,  
            displayName: '被操作的目标Node',  
        },  
        angle: {  
            default: null,  
            displayName: '当前触摸的角度',  
        },  
        radian: {  
            default: null,  
            displayName: '弧度',  
        },  
        speed: 0, //实际速度  
    },  
  
  
    onLoad: function () {  
        this._joyCom = this.node.parent.getComponent('control');  
        this._playerNode = this._joyCom.sprite;  
        this.initTouchEvent();  
    },  
  

    initTouchEvent: function () {  
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStartEvent, this);  
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMoveEvent, this);  
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEndEvent, this);  
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEndEvent, this);  
    },  
  
    update: function (dt) {  
        this.allDirectionsMove();  
    },  
  
    allDirectionsMove: function () {  
        var minX = -320
        var maxX = 320;
        var minY = -530;
        var maxY = 530;
        if(this._playerNode.x < minX ){
            this._playerNode.x = minX;
        }
        else if(this._playerNode.x > maxX){
            this._playerNode.x = maxX;
        }
        else if(this._playerNode.y < minY){
            this._playerNode.y = minY;
        }
        else if(this._playerNode.y > maxY){
            this._playerNode.y = maxY;
        }
        else{
            this._playerNode.x += Math.cos(this.angle * (Math.PI / 180)) * this.speed ;  
            this._playerNode.y += Math.sin(this.angle * (Math.PI / 180)) * this.speed ;
        }  
        
    },  
    getDistance: function (pos1, pos2) {  
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) +  
            Math.pow(pos1.y - pos2.y, 2));  
    },  
    /*角度/弧度转换 
    角度 = 弧度 * 180 / Math.PI 
    弧度 = 角度 * Math.PI / 180*/  
    //计算弧度并返回  
    getRadian: function (point) {  
        this.radian = Math.PI / 180 * this.getAngle(point);  
        return this.radian;  
    },  
    getAngle: function (point) {  
        var pos = this.node.getPosition();  
        this.angle = Math.atan2(point.y - pos.y, point.x - pos.x) * (180 / Math.PI);  
        return this.angle;  
    },  
    setSpeed: function (point) {  
        var distance = this.getDistance(point, this.node.getPosition());  
        if (distance < 50) {  
            this.speed = 5;  
        } else {  
            this.speed = 10;  
        }  
    },  
    touchStartEvent: function (event) {  
        // 获取触摸位置的世界坐标转换成圆圈的相对坐标（以圆圈的锚点为基准）  
        var touchPos = this.node.convertToNodeSpaceAR(event.getLocation());  
        //触摸点与圆圈中心的距离  
        var distance = this.getDistance(touchPos, cc.p(0, 0));  
        //圆圈半径  
        var radius = this.node.width / 2;  
        // 记录摇杆位置，给touch move使用  
        this._stickPos = touchPos;  
        var posX = this.node.getPosition().x + touchPos.x;  
        var posY = this.node.getPosition().y + touchPos.y;  
        //手指在圆圈内触摸,控杆跟随触摸点  
        if (radius > distance) {  
            this.dot.setPosition(cc.p(posX, posY));  
            return true;  
        }  
        return false;  
    },  
  
    touchMoveEvent: function (event) {  
        var touchPos = this.node.convertToNodeSpaceAR(event.getLocation());  
        var distance = this.getDistance(touchPos, cc.p(0, 0));  
        var radius = this.node.width / 2;  
        var posX = this.node.getPosition().x + touchPos.x;  
        var posY = this.node.getPosition().y + touchPos.y;  
        if (radius > distance) {  
            this.dot.setPosition(cc.p(posX, posY));  
        } else {  
            var x = this.node.getPosition().x + Math.cos(this.getRadian(cc.p(posX, posY))) * radius;  
            var y = this.node.getPosition().y + Math.sin(this.getRadian(cc.p(posX, posY))) * radius;  
            this.dot.setPosition(cc.p(x, y));  
        }  
        this.getAngle(cc.p(posX, posY));  
        this.setSpeed(cc.p(posX, posY));  
    },  
    touchEndEvent: function () {  
        this.dot.setPosition(this.node.getPosition());  
        this.speed = 0;  
    },
    pauseAction: function(){
        this.enabled = false;
        this.eState = D.commonInfo.gameState.pause;
    },
    resumeAction: function(){
        this.enabled = true;
        this.eState = D.commonInfo.gameState.start;
    },  
});  