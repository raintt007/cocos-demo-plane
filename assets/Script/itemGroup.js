var itemG = cc.Class({
    name:'itemG', 
    properties: {
        name:{
            default: '',
            displayName: '资源组名'
        },
        freqTime:{
            default: 0,
            displayName: '频率'
        },
        prefab:{
            default: null,
            type: cc.Prefab,
            displayName: '预载资源',
        },
        initPoolCount:0,
        minDelay:{
            default:0,
            displayName: '最小延迟',
        },
        maxDelay:{
            default:0,
            displayName: '最大延迟',
        },
    }
});
cc.Class({
    extends: cc.Component,

    properties: {
        itemG: {
            default:[],
            type: itemG
        },
    },
    onLoad: function () {
        this.eState = D.commonInfo.gameState.none;
        D.common.batchInitObjPool(this,this.itemG);        
        
    },
    startAction(){
        this.eState = D.commonInfo.gameState.start;
        for (var i = 0; i< this.itemG.length; ++i){
            var freqTime = this.itemG[i].freqTime;
            var fName = 'callback_'+ i;
            this[fName] = function(e){ this.randNewItem(this.itemG[e]); }.bind(this, i);
            this.schedule(this[fName], freqTime);
        }
    },
    randNewItem: function(ufoInfo){
        var delay = Math.random()*(ufoInfo.maxDelay-ufoInfo.minDelay) + ufoInfo.minDelay;
        this.scheduleOnce(function(e) {this.getNewItem(e);}.bind(this, ufoInfo), delay);
    },
    getNewItem: function(ufoInfo) {
        var poolName = ufoInfo.name + 'Pool';
        var newNode = D.common.genNewNode(this[poolName],ufoInfo.prefab,this.node);
        var newV2 = this.getNewItemPositon(newNode);
        newNode.setPosition(newV2);
    },
    getNewItemPositon: function(newUfo) {
        var randx = (Math.random() - 0.5) * 2 *(this.node.parent.width/2-newUfo.width/2);
        var randy = this.node.parent.height/2+newUfo.height/2;
        return cc.v2(randx,randy);
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
    ufoDied: function(nodeinfo){
        D.common.backObjPool(this,nodeinfo);
    },
});
