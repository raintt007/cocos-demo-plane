cc.Class({
    extends: cc.Component,
    properties: {
        topScore: cc.Label,
        currentScore: cc.Label
    },
    onLoad: function () {
        var _topScore = cc.sys.localStorage.getItem('topScore');
        this.topScore.string = _topScore;
        var _currentScore = cc.sys.localStorage.getItem('currentScore');
        this.currentScore.string = _currentScore;
        cc.director.preloadScene('historyScore');
    },
    gameRestart: function(){ 
        cc.director.loadScene('main');
    },
    gameExit: function(){
        
        cc.director.loadScene('start');
    },
    gotoHistoryScore: function() {
        cc.director.loadScene('historyScore');
    },
});
