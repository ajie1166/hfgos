/**
 * by lijie 
 */

var NetController = {

    hfListen: function () {
        var self = this;

        //开始匹配对手
        EventManager.subscribe("MatchingScene/onBtnReadyStart", function () {
            TSDT[2006].op = "OP_QUICK_JOIN_REQ";
            TSDT[2006].request_id = Utility.getRequestId();
            TSDT[2006].player_id = localStorage.player_id;
            TSDT[2006].object.boardSize = 19;
            //var sendMsg = JSON.stringify(TSDT[2006]);
            wsConnection.sendMsg(TSDT[2006]);
        });

        EventManager.subscribe("MatchingScene/confirmRuleOk", function (game_id) {
            TSDT[2013].op = "OP_CONFIRM_RULE_REQ";
            TSDT[2013].request_id = Utility.getRequestId();
            TSDT[2013].player_id = localStorage.player_id;
            TSDT[2013].game_id = game_id;
            //var sendMsg = JSON.stringify();
            wsConnection.sendMsg(TSDT[2013]);
        })

        //创建游戏
        EventManager.subscribe("MatchingScene/btnStartMatching", function () {
            TSDT[2001].op = "OP_NEW_REQ";
            TSDT[2001].request_id = Utility.getRequestId();
            TSDT[2001].player_id = localStorage.player_id;
            //var sendMsg = JSON.stringify(TSDT[2001]);
            wsConnection.sendMsg(TSDT[2001]);
        });

        //心跳包
        EventManager.subscribe("GameScene/opPing", function () {
            var intervalId = setInterval(function () {
                TSDT[0].op = "OP_PING";
                TSDT[0].request_id = Utility.getRequestId();
                TSDT[0].player_id = localStorage.player_id;
                //var sendMsg = JSON.stringify(TSDT[0]);
                wsConnection.sendMsg(TSDT[0]);
            }, 20000);
        })
    }
};

NetController.hfListen();