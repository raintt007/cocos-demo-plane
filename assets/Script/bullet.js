cc.Class({
    extends: cc.Component,
    
    properties: {
        xSpeed: cc.Integer,
        ySpeed: cc.Integer,
        hpDrop: cc.Integer, 
    },
    onLoad: function () {
       cc.director.getCollisionManager().enabled=true;
    },
    onCollisionEnter: function(other,self){
        this.bulletGroup.bulletDied(self.node);
    },
    update: function (dt) {
        if (this.bulletGroup.eState != D.commonInfo.gameState.start){
            return ;
        }
        this.node.x += dt*this.xSpeed;
        this.node.y += dt*this.ySpeed;
        if ( this.node.y> this.node.parent.height){
            this.bulletGroup.bulletDied(this.node);
        }
    },
    
});
