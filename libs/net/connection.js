var ws = null;
//"ws://127.0.0.1:7001",
//var conArray = ["ws://172.17.7.108:7001"];
var conArray = ["ws://127.0.0.1:7001"];
var wsConnection = {
    initWS: function (player_id) {
        var self = this;
        ws = new WebSocket(conArray[0]);
        ws.onopen = function () {
            GameRequest.op = "OP_LOGIN_REQ";
            GameRequest.player_id = player_id;
            TSDT[1000].player_id = player_id;
            GameRequest.object = TSDT[1000];

            //发送
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
                if (gameId != "") {
                    localStorage.setItem("game_id", gameId);
                }
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
                var selfPlayer = new Object();
                var playerArr = data["GAME_START_REP"]["gameInfo"].player;
                if (playerArr instanceof Array && playerArr.length == 2) {
                    for (var i = 0; i < 2; i++) {
                        if (playerArr[i].id == selfPlayerId) {
                            selfPlayer = playerArr[i];
                            break;
                        }
                    }
                }
                if (selfPlayer["colorType"] == 0) {
                    EventManager.publish("ChessBoard/setAvail", true);
                    oGameData["chessAvailable"] = 1;
                } else {
                    oGameData["chessAvailable"] = 0;
                }
                oGameData["selfChessType"] = selfPlayer["colorType"];
                localStorage.setItem("local_chessbook", "");
                //var gameId = localStorage.getItem("game_id");
                // EventManager.publish("GameScene/confirmLuoZi", gameId);
            } else if (op == 2101) {
                //走子
                //对方
                var request_id = data["request_id"];
                var player_id = data["player_id"];
                var local_player_id = localStorage.getItem("player_id");
                // if(request_id!=localStorage.getItem["last_luozi_request_id"])
                var content = data["MOVE_REP"]["content"];
                var oppColor = content.split(" ")[1] == "black" ? 0 : 1;
                var x = content.split(" ")[2].substring(0, 1);
                var y = content.split(" ")[2].substring(1);
                //alert(x);
                var numX = Utility.getNumx(x);
                // alert(numX);
                var numY = Utility.getNumY(y);
                if (local_player_id != player_id) {
                    EventManager.publish('ChessBoard/setGos', oppColor, numX, numY, 1);
                }
            }
        } else {
            //返回失败
        }
    }
}