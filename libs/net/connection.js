var ws = null;
//"ws://127.0.0.1:7001",
//var conArray = ["ws://172.17.7.108:7001"];
var conArray = ["ws://127.0.0.1:7001"];
var wsConnection = {
    initWS: function (player_id) {
        var self = this;
        ws = new WebSocket(conArray[0]);
        ws.onopen = function () {
            // console.info(player_id);
            //var player_id = localStorage.player_id;
            /*TSDT[1000].op = "OP_LOGIN_REQ";
             TSDT[1000].player_id = player_id;
             TSDT[1000].request_id = Utility.getRequestId()
             TSDT[1000]["object"].player_id = player_id;
             TSDT[1000]["object"].version = "1.0.0";
             TSDT[1000]["object"].date = Utility.getTimestamp();*/
            GameRequest.op = "OP_LOGIN_REQ";
            GameRequest.player_id = player_id;
            TSDT[1000].player_id = player_id;
            GameRequest.object = TSDT[1000];
            /*var obj = {
                "op": "1000",
                "player_id": player_id,
                "request_id": Utility.getRequestId(),
                "object": {
                    "player_id": player_id,
                    "version": "1.0.0",
                    "date": Utility.getTimestamp()
                }
            };*/

            var sendMsg = JSON.stringify(GameRequest);
            ws.send(sendMsg);
            console.info(sendMsg);
        };
        ws.onmessage = function (evt) {
            //console.info(evt.data);
            var message = evt.data;
            self.onMsg(message);
        };
        ws.onclose = function () {

        };
    },
    sendMsg: function (data) {
        var data = JSON.stringify(data);
        ws.readyState === 1 && ws.send(data);
        //alert(ws.readyState);
        console.info(data);
    },
    onMsg: function (data) {
        //alert(0);
        console.info(data);
        data = JSON.parse(data);
        var selfPlayerId = localStorage.player_id;
        var self = this;
        var op = data["op"];
        var code = data["code"];

        //alert("code:" + code);
        if (code == 1) {
            if (op == "2007") {
                //快速加入响应

            } else if (op == "2012") {
                //19路，3小时，3次读秒，每次60秒
                //收到下发规则  匹配到对手  开始匹配按钮隐藏
                var oppPlayer = new Object();
                var playerArr = data["RULE_REP"]["gameInfo"].player;
                var gameTime = data["RULE_REP"]["gameInfo"].gameTime;//比赛时长 3小时
                var gameCountdownTime = data["RULE_REP"]["gameInfo"].gameCountdownTime;//读秒 60
                var handicap = data["RULE_REP"]["gameInfo"].handicap;//是否让子
                var gameId = data["game_id"];
                if (playerArr instanceof Array && playerArr.length == 2) {
                    for (var i = 0; i < 2; i++) {
                        if (playerArr[i].id != selfPlayerId) {
                            oppPlayer = playerArr[i];
                            break;
                        }
                    }
                }
                console.info(oppPlayer);
                if (gameTime == 10800 && handicap == 0) {
                    EventManager.publish("MatchingScene/MatchSuccess", oppPlayer);
                    EventManager.publish("MatchingScene/confirmRuleOk", gameId);
                } else {
                    //规则不符合  自动取消  然后一分钟内匹配三次  或者直接调用op_leave
                }
            } else if (op == 2015) {
                //开始游戏
                
            }
        } else {
            //返回失败
        }
    }
}