"use strict";
cc._RF.push(module, '86488Z5OgNNtKTYj8f3TibL', 'boss');
// Script/boss.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        Hp: {
            default: 0,
            type: cc.Integer,
            displayName: '初始生命值'
        },
        enemyDownClip: {
            type: cc.AudioClip,
            default: null
        },
        enemyGroup: {
            default: null,
            type: require('enemyGroup')
        },
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
        }
    },
    onLoad: function onLoad() {
        cc.director.getCollisionManager().enabled = true;
        // this.schedule(this.bossToMove(), 1);
    },
    // update: function(dt) {
    //     var scores = this.enemyGroup.getScore();
    //     if(scores >= 1000){
    //         this.node.group = 'enemy';
    //     }
    // },
    onCollisionEnter: function onCollisionEnter(other, self) {
        if (other.node.group != 'bullet') {
            return;
        }
        var bullet = other.node.getComponent('bullet');
        if (this.Hp > 0) {
            this.Hp -= bullet.hpDrop;
            console.log(this.Hp);
        } else {
            return;
        }
        if (this.Hp <= 0) {
            this.node.group = 'default';
            this.node.destroy();
        }
    },
    startAction: function startAction() {
        this.schedule(this.bossToMove(), 3);
    },
    bossToMove: function bossToMove() {
        var maxX = 300;
        this.node.x = cc.randomMinus1To1() * maxX;
    }
});

cc._RF.pop();