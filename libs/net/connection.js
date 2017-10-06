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
            TSDT[1000].user_agent = Utility.getUserAgent();
            //alert(Utility.getUserAgent());
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
        var msg = data["msg"];

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
                /* if (gameId != "") {
                     localStorage.setItem("game_id", gameId);
                 }*/
                if (playerArr instanceof Array && playerArr.length == 2) {
                    for (var i = 0; i < 2; i++) {
                        if (playerArr[i].id != selfPlayerId) {
                            oppPlayer = playerArr[i];
                            break;
                        }
                    }
                }
                // console.info(oppPlayer);
                if (gameTime == 10800 && handicap == 0) {
                    localStorage.setItem("game_id", gameId);
                    EventManager.publish("MatchingScene/MatchSuccess", oppPlayer);
                    EventManager.publish("MatchingScene/confirmRuleOk", gameId);
                } else {
                    //规则不符合  自动取消  然后一分钟内匹配三次  或者直接调用op_leave
                }
            } else if (op == 2015) {
                var gameId = data["game_id"];
                if (localStorage.getItem("game_id") == gameId) {
                    EventManager.publish("ChessBoard/showMask", "开始对局", true);
                    //开始游戏
                    var selfPlayer = new Object();
                    var playerArr = data["GAME_START_REP"]["gameInfo"].player;
                    var ruleColorType = data["GAME_START_REP"]["gameInfo"].color_type;

                    if (playerArr instanceof Array && playerArr.length == 2) {
                        for (var i = 0; i < 2; i++) {
                            if (playerArr[i].id == selfPlayerId) {
                                selfPlayer = playerArr[i];
                                break;
                            }
                        }
                    }

                    if (selfPlayer["colorType"] == 0) {
                        EventManager.publish("GameScene/startRemainTime", 0);
                        EventManager.publish("ChessBoard/setAvail", true);
                        oGameData["chessAvailable"] = 1;
                    } else {
                        EventManager.publish("GameScene/startRemainTime", 1);
                        oGameData["chessAvailable"] = 0;
                    }
                    if (ruleColorType == 2) {
                        //规则随机 开始游戏确认双方颜色
                        EventManager.publish("GameScene/setPlayerChess", selfPlayer["colorType"] == 0 ? 1 : 0);
                    }
                    //目前 规则写死
                    EventManager.publish("GameScene/showRule", "本局规则：19路盘 不让子 3小时");
                    oGameData["selfChessType"] = selfPlayer["colorType"];
                    localStorage.setItem("local_chessbook", "");
                }
            } else if (op == 2101) {
                var gameId = data["game_id"];
                if (localStorage.getItem("game_id") == gameId) {
                    //走子
                    //对方
                    var request_id = data["request_id"];
                    var player_id = data["player_id"];
                    var local_player_id = localStorage.getItem("player_id");
                    // if(request_id!=localStorage.getItem["last_luozi_request_id"])
                    var content = data["MOVE_REP"]["content"];
                    var color = content.split(" ")[1] == "black" ? 0 : 1;
                    var xy = content.split(" ")[2];
                    var x;
                    var y;
                    var numX;
                    var numY;
                    if (xy != "pass") {
                        x = content.split(" ")[2].substring(0, 1);
                        y = content.split(" ")[2].substring(1);
                        //alert(x);
                        numX = Utility.getNumx(x);
                        // alert(numX);
                        numY = Utility.getNumY(y);
                    } else {
                        numX = -1;
                        numY = -1;
                    }

                    if (local_player_id != player_id) {
                        EventManager.publish('ChessBoard/setGos', color, numX, numY, 1);
                    } else {
                        if (numX >= 0 && numY >= 0) {
                            EventManager.publish('ChessBoard/setGos', color, numX, numY, 0);
                        }
                    }
                }
            } else if (op == 2200) {
                var gameId = data["game_id"];
                if (localStorage.getItem("game_id") == gameId) {
                    //结束
                    var endData = data["S_END_REP"];
                    var type = endData.type;
                    var game_status = endData.game_status;
                    var result = endData.message;
                    EventManager.publish("ChessBoard/showGameResult", type, game_status, result);
                }
            } else if (op == 2121) {
                var gameId = data["game_id"];
                if (localStorage.getItem("game_id") == gameId) {
                    //对方点目   弹窗
                    EventManager.publish("GameScene/showAlert", "是否同意对方点目?", 1);
                }
            } else if (op == 2123) {
                var gameId = data["game_id"];
                if (localStorage.getItem("game_id") == gameId) {
                    //对方处理我发起的点目   同意或者拒绝
                    var result = data["CONF_COUNTING_REP"];
                    var isAccept = result.accept == true ? 1 : 0;
                    //alert(isAccept);
                    if (isAccept == 1) {
                        //显示计算结果 弹窗
                        oGameData["chessAvailable"] == 0;
                        EventManager.publish("ChessBoard/hideMask");
                        EventManager.publish("ChessBoard/setAvail", false);
                        EventManager.publish("ChessBoard/showMask", "结果计算中...", false);
                    } else {
                        oGameData["chessAvailable"] == 1;
                        EventManager.publish("ChessBoard/setAvail", true);
                    }
                }
            }
        } else if (code == 2001) {
            //返回失败
            if (op == 2101) {
                EventManager.publish("ChessBoard/showMask", "不能在该点落子", true);
            }
        }
    }
}