(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/enemyGroup.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '703caNdSJBMG5jxYvPFwWvP', 'enemyGroup', __filename);
// Script/enemyGroup.js

'use strict';

var enemyG = cc.Class({
    name: 'enemyG',
    properties: {
        name: '',
        freqTime: 0,
        initPollCount: 0,
        prefab: cc.Prefab
    }
});
cc.Class({
    extends: cc.Component,
    properties: function properties() {
        return {
            enemyG: {
                default: [],
                type: enemyG
            },
            main: {
                default: null,
                type: require('main')
            }
        };
    },
    onLoad: function onLoad() {
        this.eState = D.commonInfo.gameState.none;
        D.common.batchInitObjPool(this, this.enemyG);
    },
    startAction: function startAction() {
        this.eState = D.commonInfo.gameState.start;
        for (var i = 0; i < this.enemyG.length; ++i) {
            var freqTime = this.enemyG[i].freqTime;
            var fName = 'callback_' + i;
            this[fName] = function (e) {
                this.getNewEnemy(this.enemyG[e]);
            }.bind(this, i);
            this.schedule(this[fName], freqTime);
        }
    },
    pauseAction: function pauseAction() {
        // cc.director.pause();
        this.enabled = false;
        this.eState = D.commonInfo.gameState.pause;
    },
    resumeAction: function resumeAction() {
        // cc.director.resume();
        this.enabled = true;
        this.eState = D.commonInfo.gameState.start;
    },
    getNewEnemy: function getNewEnemy(enemyInfo) {
        var poolName = enemyInfo.name + 'Pool';
        var newNode = D.common.genNewNode(this[poolName], enemyInfo.prefab, this.node);
        var newV2 = this.getNewEnemyPositon(newNode);
        newNode.setPosition(newV2);
        newNode.getComponent('enemy').init();
    },
    getNewEnemyPositon: function getNewEnemyPositon(newEnemy) {
        var maxX = this.node.width / 2;
        var randx = (Math.random() - 0.5) * 2 * maxX;
        var randy = this.node.parent.height / 2 + newEnemy.height / 2;
        return cc.v2(randx, randy);
    },
    enemyDied: function enemyDied(node, score) {
        D.common.backObjPool(this, node);
        if (parseInt(score) > 0) {
            this.main.addScore(score);
        }
    },
    getScore: function getScore() {
        return this.main.getScore();
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
        //# sourceMappingURL=enemyGroup.js.map
        