//场景滚动
//锚点为0
cc.Class({  
    extends: cc.Component,  
    properties: {  
       bg:[cc.Node],  
       speed:5,  
    },  
   onLoad :function() {  
       this.updatePosition(this.bg[0],this.bg[1]);  
   },  
   updatePosition:function(bg1,bg2){  
       bg1.x = 0;  
       var bg1Bound = bg1.getBoundingBox();  
       bg2.setPosition(bg1Bound.xMin, bg1Bound.yMax);
   }, 
    moveBg:function(bgList, speed){  
        for(var i = 0; i < bgList.length; i++){ 
            var bg = bgList[i];  
            bg.y -= speed;  
        }  
    }, 
    checkBgReset:function(bgList){
        var bg1_yMax;
        // winSize = cc.director.getWinSize();
        bg1_yMax = bgList[0].getBoundingBox().yMax;
        if(bg1_yMax <= 0){  
            var preBg;
            preBg = bgList.shift();
            bgList.push(preBg);  
            var curBg = bgList[0];  
            preBg.y = curBg.getBoundingBox().yMax;  
        }  
    },  
   update:function(dt){  
       this.moveBg(this.bg, this.speed);
       this.checkBgReset(this.bg);  
   },  
});  