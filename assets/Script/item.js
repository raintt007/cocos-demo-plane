cc.Class({
    extends: cc.Component,

    properties: {
        xMinSpeed: { //x轴最小速度
            default:0,
            type:cc.Integer
        },
        xMaxSpeed: {//x轴最大速度
            default:0,
            type:cc.Integer
        },
        yMinSpeed: {
            default:0,
            type:cc.Integer
        },//y轴最小速度
        
        yMaxSpeed: { //y轴最大速度
            default:0,
            type:cc.Integer
        },
        getItemClip: {
          type :cc.AudioClip,
          default: null
        }
    },

    // use this for initialization
    onLoad: function () {
        cc.director.getCollisionManager().enabled=true;
        
        this.xSpeed = Math.random()*(this.xMaxSpeed-this.xMinSpeed) + this.xMinSpeed;
        this.ySpeed = cc.random0To1()*(this.yMaxSpeed-this.yMinSpeed) + this.yMinSpeed;
        this.itemGroup = this.node.parent.getComponent('itemGroup');
    },
    //碰撞检测
    onCollisionEnter: function(other,self){
        this.node.destroy();
        cc.audioEngine.playEffect(this.getItemClip, false);
    },
    update: function (dt) {
        if (this.itemGroup.eState != D.commonInfo.gameState.start){
            return ;
        }
        this.node.x += dt*this.xSpeed;
        this.node.y += dt*this.ySpeed;
        if (this.node.y < -this.node.parent.height/2){
            this.itemGroup.ufoDied(this.node);
        }
    },
});
