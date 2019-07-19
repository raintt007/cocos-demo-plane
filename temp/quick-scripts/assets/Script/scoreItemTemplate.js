(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/scoreItemTemplate.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e7aaajpGBdAAaGaUimU4MnH', 'scoreItemTemplate', __filename);
// Script/scoreItemTemplate.js

'use strict';

cc.Class({
    extends: cc.Component,
    properties: {
        itemScore: cc.Label,
        itemTime: cc.Label
    },
    init: function init(data) {
        this.itemScore.string = '积分：' + data.score;
        this.itemTime.string = '时间：' + data.time;
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
        //# sourceMappingURL=scoreItemTemplate.js.map
        