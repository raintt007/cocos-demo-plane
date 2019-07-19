"use strict";
cc._RF.push(module, 'c11abrWZANO2aVZSE4dxEvW', 'historyScore');
// Script/historyScore.js

'use strict';

cc.Class({
    extends: cc.Component,
    properties: {
        itemPrefab: cc.Prefab,
        scrollContent: cc.Node,
        backGame: cc.Node
    },
    onLoad: function onLoad() {
        var infoData = JSON.parse(cc.sys.localStorage.getItem('score'));
        for (var i = 0; i < infoData.length; ++i) {
            var item = cc.instantiate(this.itemPrefab);
            var data = infoData[i];
            this.scrollContent.addChild(item);
            item.getComponent('scoreItemTemplate').init({
                score: data.score,
                time: data.time
            });
        }
        this.backGame.on('touchstart', this.backGameEnd, this);
    },
    backGameEnd: function backGameEnd() {
        cc.director.loadScene('end');
    }
});

cc._RF.pop();