var bPosition = cc.Class({
    name: 'bPosition',
    properties: {
        xAxis: {
            default:'',
            displayName: 'x轴相对hero',
        },
        yAxis: {
            default:'',
            displayName: 'y轴相对hero'
        },
    },
});
var bulletInfinite = cc.Class({
    name:'bulletInfinite',
    properties: {
        name:'',
        freqTime:{
            default: 0,
            displayName: '射速'
        },
        initPollCount:0,
        prefab:cc.Prefab,
        position: {
            default: [],
            type: bPosition,
            displayName: '子弹位置',
        }
    }
});
var bulletFiniteG = cc.Class({
    name:'bulletFiniteG',
    extends:bulletInfinite,
    properties: {
        finiteTime:0,
        orginName:'',
    }
}); 
cc.Class({
    extends: cc.Component,
    properties:()=> ({
        bulletInfinite: {
            default:null,
            type: bulletInfinite,
            displayName:'无限时长子弹组'
        },
        bulletFiniteG: {
            default:[],
            type: bulletFiniteG,
            displayName:'有限时长子弹组'
        },
        hero: cc.Node,
    }),
    onLoad: function () {
        this.eState = D.commonInfo.gameState.none;
        D.common.initObjPool(this,this.bulletInfinite);
        D.common.batchInitObjPool(this,this.bulletFiniteG);
    },
    
    startAction: function(){
        this.eState = D.commonInfo.gameState.start;
        this.getNewbullet(this.bulletInfinite);
        this.bICallback = function(){this.getNewbullet(this.bulletInfinite);}.bind(this);
        this.schedule(this.bICallback, this.bulletInfinite.freqTime);
    },
    pauseAction: function(){
        // cc.director.pause();
        this.enabled = false;
        this.eState = D.commonInfo.gameState.pause;
    },
    resumeAction: function(){
        // cc.director.resume();
        this.enabled = true;
        this.eState = D.commonInfo.gameState.start;
    },
    changeBullet: function(itemBulletName){
        this.unschedule(this.bICallback);
        this.unschedule(this.bFCallback);
        for (var i=0; i<this.bulletFiniteG.length; i++){
            if (this.bulletFiniteG[i].orginName == itemBulletName){
                this.bFCallback = function(e){this.getNewbullet(this.bulletFiniteG[e]);}.bind(this,i);
                this.schedule(this.bFCallback, this.bulletFiniteG[i].freqTime,this.bulletFiniteG[i].finiteTime);
                var delay = this.bulletFiniteG[i].freqTime * this.bulletFiniteG[i].finiteTime;
                this.schedule(this.bICallback, this.bulletInfinite.freqTime,cc.macro.REPEAT_FOREVER,delay);
            }
        }
    },
    getNewbullet: function (bulletInfo) {
        var poolName = bulletInfo.name + 'Pool';
        for (var bc=0; bc<bulletInfo.position.length; bc++){
            var newNode = D.common.genNewNode(this[poolName],bulletInfo.prefab,this.node);
            var newV2 = this.getBulletPostion(bulletInfo.position[bc]);
            newNode.setPosition(newV2);
            newNode.getComponent('bullet').bulletGroup = this;
        }
    },
    getBulletPostion: function(posInfo){
        var hPos = this.hero.getPosition();
        var newV2_x = hPos.x + eval(posInfo.xAxis);
        var newV2_y = hPos.y + eval(posInfo.yAxis);
        return cc.p(newV2_x, newV2_y); 
    },
    bulletDied: function(nodeinfo){
        D.common.backObjPool(this,nodeinfo);
    },
});
