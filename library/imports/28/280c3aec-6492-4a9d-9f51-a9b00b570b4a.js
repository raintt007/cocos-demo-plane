"use strict";
cc._RF.push(module, '280c3rsZJJKnZ9RqbALVwtK', 'start');
// Script/start.js

'use strict';

cc.Class({
    extends: cc.Component,
    startGame: function startGame() {
        cc.director.loadScene('main');
    }
});

cc._RF.pop();