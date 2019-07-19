(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/control.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1b80bIRP69A+553MGD65ZgD', 'control', __filename);
// Script/control.js

'use strict';

var controlBg = require('controlBg');

cc.Class({
    extends: cc.Component,
    properties: {
        dot: {
            default: null,
            type: cc.Node,
            displayName: '摇杆节点'
        },
        ring: {
            default: null,
            type: controlBg,
            displayName: '摇杆背景节点'
        },
        sprite: {
            default: null,
            type: cc.Node,
            displayName: '操控的目标'

        },
        _stickPos: {
            default: null,
            type: cc.Node,
            displayName: '摇杆当前位置'
        },
        _touchLocation: {
            default: null,
            type: cc.Node,
            displayName: '摇杆当前位置'
        }
    },
    pauseAction: function pauseAction() {
        this.enabled = false;
        this.eState = D.commonInfo.gameState.pause;
    },
    resumeAction: function resumeAction() {
        this.enabled = true;
        this.eState = D.commonInfo.gameState.start;
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
        //# sourceMappingURL=control.js.map
        