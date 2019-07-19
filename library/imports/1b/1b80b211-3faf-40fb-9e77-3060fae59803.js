"use strict";
cc._RF.push(module, '1b80bIRP69A+553MGD65ZgD', 'control');
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