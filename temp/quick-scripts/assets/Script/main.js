(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/main.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6afa0phF7dPka/zlZtFFHow', 'main', __filename);
// Script/main.js

'use strict';

var enemy = require('enemy');
cc.Class({

    extends: cc.Component,

    properties: function properties() {
        return {
            pause: cc.Button,
            btnSprite: {
                default: [],
                type: cc.SpriteFrame,
                displayName: '暂停按钮不同状态的图片'
            },
            bomb: cc.Node,
            gameMusic: {
                default: null,
                type: cc.AudioSource
            },
            useBombClip: {
                type: cc.AudioClip,
                default: null
            },
            enemyGroup: {
                default: null,
                type: require('enemyGroup')
            },
            hero: {
                default: null,
                type: require('hero')
            },
            itemGroup: {
                default: null,
                type: require('itemGroup')
            },
            bulletGroup: {
                default: null,
                type: require('bulletGroup')
            },
            control: {
                default: null,
                type: require('controlBg')
            },

            scoreDisplay: cc.Label,
            bombNoDisplay: cc.Label
        };
    },
    onLoad: function onLoad() {
        this.score = 0;
        this.bombNo = 1;
        this.scoreDisplay.string = this.score;
        this.bombNoDisplay.string = this.bombNo;
        this.eState = D.commonInfo.gameState.start;
        this.resumeAction();
        this.enemyGroup.startAction();
        this.bulletGroup.startAction();
        this.itemGroup.startAction();
        this.bomb.on('touchstart', this.bombOnclick, this);
        this.gameMusic.play();
    },

    bombOnclick: function bombOnclick() {
        var bombNoLabel = this.bomb.getChildByName('bombNo').getComponent(cc.Label);
        var bombNo = parseInt(bombNoLabel.string);
        if (bombNo > 0 && this.eState == D.commonInfo.gameState.start) {
            bombNoLabel.string = bombNo - 1;
            this.removeEnemy();
            cc.audioEngine.playEffect(this.useBombClip, false);
        } else {
            console.log('没有炸药');
        }
    },
    pauseClick: function pauseClick() {
        //暂停 继续
        if (this.eState == D.commonInfo.gameState.pause) {
            this.resumeAction();
            this.eState = D.commonInfo.gameState.start;
        } else if (this.eState == D.commonInfo.gameState.start) {
            this.pauseAction();
            this.eState = D.commonInfo.gameState.pause;
        }
    },
    //游戏继续
    resumeAction: function resumeAction() {
        this.enemyGroup.resumeAction();
        this.bulletGroup.resumeAction();
        this.itemGroup.resumeAction();
        this.control.resumeAction();
        this.gameMusic.resume();
        this.pause.normalSprite = this.btnSprite[0];
        this.pause.pressedSprite = this.btnSprite[1];
        this.pause.hoverSprite = this.btnSprite[1];
    },
    pauseAction: function pauseAction() {
        this.enemyGroup.pauseAction();
        this.bulletGroup.pauseAction();
        this.gameMusic.pause();
        this.itemGroup.pauseAction();
        this.control.pauseAction();

        this.pause.normalSprite = this.btnSprite[2];
        this.pause.pressedSprite = this.btnSprite[3];
        this.pause.hoverSprite = this.btnSprite[3];
    },
    addScore: function addScore(num) {
        this.score += num;
        // if(this.boss.node != null && this.score >= 1000){
        //     this.boss.node.group = 'enemy';
        // }
        this.scoreDisplay.string = this.score.toString();
    },
    getScore: function getScore() {
        return parseInt(this.scoreDisplay.string);
    },
    updateScore: function updateScore() {
        var currentScore = this.scoreDisplay.string;
        var scoreData = {
            'score': currentScore,
            'time': D.common.timeFmt(new Date(), 'yyyy-MM-dd hh:mm:ss')
        };
        var preData = cc.sys.localStorage.getItem('score');
        var preTopScore = cc.sys.localStorage.getItem('topScore');
        if (!preTopScore || parseInt(preTopScore) < parseInt(currentScore)) {
            cc.sys.localStorage.setItem('topScore', currentScore);
        }
        if (!preData) {
            preData = [];
            preData.unshift(scoreData);
        } else {
            preData = JSON.parse(preData);
            if (!(preData instanceof Array)) {
                preData = [];
            }
            preData.unshift(scoreData);
        }
        cc.sys.localStorage.setItem('currentScore', currentScore);
        cc.sys.localStorage.setItem('score', JSON.stringify(preData));
    },
    removeEnemy: function removeEnemy() {
        var cannons = [];
        cannons = this.enemyGroup.node.children;
        for (var i = 0; i < cannons.length; i++) {
            cannons[i].group = 'default';
            var animName = cannons[i].name + 'ani';
            var anim = cannons[i].getComponent(cc.Animation);
            anim.play(animName);
            this.addScore(100);
        }
    },
    getItemBomb: function getItemBomb() {
        if (parseInt(this.bombNoDisplay.string) < 5) {
            this.bombNoDisplay.string += 1;
        }
    },
    gameOver: function gameOver() {
        // this.pauseAction();
        this.updateScore();
        cc.director.loadScene('end');
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
        //# sourceMappingURL=main.js.map
        