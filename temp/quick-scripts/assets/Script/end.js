(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/end.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c597br4kitB+7t22tMQBl2k', 'end', __filename);
// Script/end.js

'use strict';

cc.Class({
    extends: cc.Component,
    properties: {
        topScore: cc.Label,
        currentScore: cc.Label
    },
    onLoad: function onLoad() {
        var _topScore = cc.sys.localStorage.getItem('topScore');
        this.topScore.string = _topScore;
        var _currentScore = cc.sys.localStorage.getItem('currentScore');
        this.currentScore.string = _currentScore;
        cc.director.preloadScene('historyScore');
    },
    gameRestart: function gameRestart() {
        cc.director.loadScene('main');
    },
    gameExit: function gameExit() {

        cc.director.loadScene('start');
    },
    gotoHistoryScore: function gotoHistoryScore() {
        cc.director.loadScene('historyScore');
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
        //# sourceMappingURL=end.js.map
        