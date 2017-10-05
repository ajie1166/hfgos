/**
 * by lijie 
 */

var NetController = {

    hfListen: function () {
        var self = this;

        /**
         * 处理对方发起的点目
         */
        EventManager.subscribe("GameScene/handlerDianMu", function (accept) {
            TSDT[2122].op = "OP_CONF_COUNTING_REQ";
            TSDT[2122].request_id = Utility.getRequestId();
            TSDT[2122].player_id = localStorage.player_id;
            TSDT[2122].object = {
                accept: accept
            };
            TSDT[2122].game_id = localStorage.game_id;
            wsConnection.sendMsg(TSDT[2122]);
        });

        /**
         * 申请点目
         */
        EventManager.subscribe("GameScene/applyCounting", function () {
            TSDT[2120].op = "OP_COUNTING_REQ";
            TSDT[2120].request_id = Utility.getRequestId();
            TSDT[2120].player_id = localStorage.player_id;
            TSDT[2120].game_id = localStorage.game_id;
            wsConnection.sendMsg(TSDT[2120]);
        });
        /**
         * 认输
         */
        EventManager.subscribe("GameScene/Resign", function () {
            TSDT[2130].op = "OP_RESIGN";
            TSDT[2130].request_id = Utility.getRequestId();
            TSDT[2130].player_id = localStorage.player_id;
            TSDT[2130].game_id = localStorage.game_id;
            wsConnection.sendMsg(TSDT[2130]);
        });
        /**
         * 停一手 此命令已不用
         */
        EventManager.subscribe("GameScene/stopOneHand", function (content) {
            TSDT[2110].op = "OP_PASS_REQ";
            TSDT[2110].request_id = Utility.getRequestId();
            TSDT[2110].player_id = localStorage.player_id;
            TSDT[2110].object = {
                step: 0,
                content: content
            };
            TSDT[2110].game_id = localStorage.game_id;
            wsConnection.sendMsg(TSDT[2110]);
        });
        /**
         * 请求服务端落子
         * game_id:游戏id
         * step:步数
         * content:"play black e1"
         * time:剩余时间
         */
        EventManager.subscribe("GameScene/confirmLuoZi", function (game_id, step, content, time) {
            TSDT[2100].op = "OP_MOVE_REQ";
            TSDT[2100].request_id = Utility.getRequestId();
            TSDT[2100].player_id = localStorage.player_id;
            TSDT[2100].object = {
                step: step,
                content: content,
                timeType: 1,
                time: 10780
            };
            TSDT[2100].game_id = game_id;
            //localStorage.removeItem("")
            //记录上手落子request_id
            localStorage.setItem("last_luozi_request_id", TSDT[2100].request_id);
            wsConnection.sendMsg(TSDT[2100]);
        });

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
            }, 10000);
        })
    }
};

NetController.hfListen();