cc.Class({
    extends: cc.Component,
    properties:()=> ({
        planedie: {
            default: null,
            type:cc.Prefab,
            displayName: '死亡动画',
        },
        gameOverClip: {
          type: cc.AudioClip,
          default: null
        },
        main: {
            default: null,
            type: require('main'),
        },
        bulletGroup: {
            default: null,
            type: require('bulletGroup'),
        }
    }),
    onLoad: function () {
        this.eState = D.commonInfo.gameState.none;
        cc.director.getCollisionManager().enabled=true;
    },
    onCollisionEnter: function(other,self) {
        if (other.node.group == 'item'){
            console.log(other.node.name);
            if (other.node.name == 'itemBullet'){
                this.bulletGroup.changeBullet(other.node.name);
            } else if (other.node.name == 'itemBomb'){
                this.main.getItemBomb();
            }
        } else if (other.node.group == 'enemy'){
            var po = this.node.getPosition();
            var blowup = cc.instantiate(this.planedie);
            this.node.parent.addChild(blowup);
            blowup.setPosition(po);
            var animation = blowup.getComponent(cc.Animation);
            animation.on('finished',  this.onFinished, blowup);
            cc.audioEngine.playEffect(this.gameOverClip, false);
            this.node.destroy();
            this.main.gameOver();   
        } else {
            return false;
        } 
    },
    onFinished: function(event) {
        this.destroy(); 
    },
});
