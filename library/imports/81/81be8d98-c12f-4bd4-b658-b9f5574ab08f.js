"use strict";
cc._RF.push(module, '81be82YwS9L1LZYufVXSrCP', 'bullet');
// Script/bullet.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        xSpeed: cc.Integer,
        ySpeed: cc.Integer,
        hpDrop: cc.Integer
    },
    onLoad: function onLoad() {
        cc.director.getCollisionManager().enabled = true;
    },
    onCollisionEnter: function onCollisionEnter(other, self) {
        this.bulletGroup.bulletDied(self.node);
    },
    update: function update(dt) {
        if (this.bulletGroup.eState != D.commonInfo.gameState.start) {
            return;
        }
        this.node.x += dt * this.xSpeed;
        this.node.y += dt * this.ySpeed;
        if (this.node.y > this.node.parent.height) {
            this.bulletGroup.bulletDied(this.node);
        }
    }

});

cc._RF.pop();