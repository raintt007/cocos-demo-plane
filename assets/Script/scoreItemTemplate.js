cc.Class({
    extends: cc.Component,
    properties: {
        itemScore: cc.Label,
        itemTime: cc.Label
    },
    init: function(data) {
        this.itemScore.string = '积分：' + data.score;
        this.itemTime.string = '时间：' + data.time;
    }
});
