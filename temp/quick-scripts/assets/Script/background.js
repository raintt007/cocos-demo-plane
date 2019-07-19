(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/background.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c6781SoGqZJZoM30ECrLue7', 'background', __filename);
// Script/background.js

"use strict";

//场景滚动
//锚点为0
cc.Class({
    extends: cc.Component,
    properties: {
        bg: [cc.Node],
        speed: 5
    },
    onLoad: function onLoad() {
        this.updatePosition(this.bg[0], this.bg[1]);
    },
    updatePosition: function updatePosition(bg1, bg2) {
        bg1.x = 0;
        var bg1Bound = bg1.getBoundingBox();
        bg2.setPosition(bg1Bound.xMin, bg1Bound.yMax);
    },
    moveBg: function moveBg(bgList, speed) {
        for (var i = 0; i < bgList.length; i++) {
            var bg = bgList[i];
            bg.y -= speed;
        }
    },
    checkBgReset: function checkBgReset(bgList) {
        var bg1_yMax;
        // winSize = cc.director.getWinSize();
        bg1_yMax = bgList[0].getBoundingBox().yMax;
        if (bg1_yMax <= 0) {
            var preBg;
            preBg = bgList.shift();
            bgList.push(preBg);
            var curBg = bgList[0];
            preBg.y = curBg.getBoundingBox().yMax;
        }
    },
    update: function update(dt) {
        this.moveBg(this.bg, this.speed);
        this.checkBgReset(this.bg);
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=background.js.map
        