"use strict";
cc._RF.push(module, '14abee9CoxCobWl/nmeEUv8', 'enemy');
// Script/enemy.js

'use strict';

cc.Class({
    extends: cc.Component,
    properties: {
        xMinSpeed: {
            default: 0,
            type: cc.Integer,
            displayName: 'x轴最小速度'
        },
        xMaxSpeed: {
            default: 0,
            type: cc.Integer,
            displayName: 'x轴最大速度'
        },
        yMinSpeed: {
            default: 0,
            type: cc.Integer,
            displayName: 'y轴最小速度'
        },
        yMaxSpeed: {
            default: 0,
            type: cc.Integer,
            displayName: 'y轴最大速度'
        },
        initHP: {
            default: 0,
            type: cc.Integer,
            displayName: '初始生命值'
        },
        initSpriteFrame: {
            default: null,
            type: cc.SpriteFrame,
            displayName: '初始化的图像'
        },
        score: {
            default: 0,
            type: cc.Integer,
            displayName: '死后获得的积分'

        },
        enemyDownClip: {
            type: cc.AudioClip,
            default: null
        }
    },
    onLoad: function onLoad() {
        cc.director.getCollisionManager().enabled = true;
        this.xSpeed = Math.random() * (this.xMaxSpeed - this.xMinSpeed) + this.xMinSpeed;
        this.ySpeed = cc.random0To1() * (this.yMaxSpeed - this.yMinSpeed) + this.yMinSpeed;
        this.enemyGroup = this.node.parent.getComponent('enemyGroup');
    },
    init: function init() {
        if (this.node.group != 'enemy') {
            this.node.group = 'enemy';
        }
        if (this.hP != this.initHP) {
            this.hP = this.initHP;
        }
        var nSprite = this.node.getComponent(cc.Sprite);
        if (nSprite.spriteFrame != this.initSpriteFrame) {
            nSprite.spriteFrame = this.initSpriteFrame;
        }
    },
    update: function update(dt) {
        if (this.enemyGroup.eState != D.commonInfo.gameState.start) {
            return;
        }
        var scores = this.enemyGroup.getScore();
        if (scores <= 50000) {
            this.node.y += dt * this.ySpeed;
        } else if (scores > 50000 && scores <= 100000) {
            this.node.y += dt * this.ySpeed - 0.5;
        } else if (scores > 100000 && scores <= 150000) {
            this.node.y += dt * this.ySpeed - 1;
        } else if (scores > 150000 && scores <= 200000) {
            this.node.y += dt * this.ySpeed - 1.5;
        } else if (scores > 200000 && scores <= 300000) {
            this.node.y += dt * this.ySpeed - 2;
        } else {
            this.node.y += dt * this.ySpeed - 3;
        }
        this.node.x += dt * this.xSpeed;
        if (this.node.y < -this.node.parent.height / 2) {
            this.enemyGroup.enemyDied(this.node, 0);
        }
    },
    onCollisionEnter: function onCollisionEnter(other, self) {
        if (other.node.group != 'bullet') {
            return;
        }
        var bullet = other.node.getComponent('bullet');

        if (this.hP > 0) {
            this.hP -= bullet.hpDrop;
        } else {
            return;
        }
        if (this.hP <= 0) {
            this.node.group = 'default';
            var anim = this.getComponent(cc.Animation);
            var animName = self.node.name + 'ani';
            anim.play(animName);
            anim.on('finished', this.onFinished, this);
            cc.audioEngine.playEffect(this.enemyDownClip, false);
        }
    },
    onFinished: function onFinished(event) {
        this.enemyGroup.enemyDied(this.node, this.score);
    }

});

cc._RF.pop();