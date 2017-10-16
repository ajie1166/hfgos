var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
/**
 * by lijie
 */
var PlayerInfo = (function (_super) {
    __extends(PlayerInfo, _super);
    function PlayerInfo() {
        var _this = _super.call(this) || this;
        _this.playerBgGap = 50;
        //手数
        _this.selfNums = 0;
        _this.oppNums = 0;
        _this.stepNums = 0;
        _this.selfTime = 1200;
        _this.oppTime = 1200;
        _this.selfFinalCount = 3; //最后次数
        _this.oppFinalCount = 3; //最后次数
        _this.selfFinalSecond = 20; //默认20秒 读秒时间
        _this.oppFinalSecond = 20; //默认20秒 读秒时间
        var self = _this;
        var stage = egret.MainContext.instance.stage;
        var stageW = stage.stageWidth;
        var stageH = stage.stageHeight;
        /* 开始 绘制自己的玩家信息 */
        var selfContainer = new egret.Sprite();
        //加载玩家背景
        var selfBg = GosCommon.createBitmapByNameAndPosition("playerbg_png", { x: (stageW - 594) / 2 - 490 - _this.playerBgGap, y: (stageH - 594) / 2 + (594 - 160) / 2 });
        selfContainer.addChild(selfBg);
        ;
        //玩家头像
        var playerHead = GosCommon.createBitmapByNameAndPosition("touxiang_png", { x: selfBg.x + 30, y: (selfBg.height - 100) / 2 + selfBg.y });
        selfContainer.addChild(playerHead);
        var selfNameChess = _this.createUserChess("unknown_png", { x: playerHead.x + playerHead.width + 10, y: selfBg.y + 40 });
        _this.selfUserNameChess = selfNameChess;
        selfContainer.addChild(_this.selfUserNameChess);
        var selfHandsChess = _this.createUserChess("unknown_png", { x: playerHead.x + playerHead.width + 270, y: selfBg.y + 40 });
        _this.selfHandsChess = selfHandsChess;
        selfContainer.addChild(_this.selfHandsChess);
        //自己的名字
        var selfTempName = localStorage.getItem("nick_name");
        selfTempName = GosCommon.subString(selfTempName, 10);
        var userName = _this.createTextField(selfTempName, { x: playerHead.x + playerHead.width + 70, y: selfBg.y + 45 });
        // userName.fontFamily = "宋体";
        // userName.bold = true;
        _this.selfName = userName;
        selfContainer.addChild(userName);
        var remaindTime = _this.createTextField("00:20:00", { x: playerHead.x + playerHead.width + 70, y: selfBg.y + 45 + 40 });
        _this.selfRemainTime = remaindTime;
        selfContainer.addChild(_this.selfRemainTime);
        //this.selfRemainTime.visible=false;
        var finalSelfRemaindTime = _this.createTextField("3次 20秒", { x: playerHead.x + playerHead.width + 70, y: selfBg.y + 45 + 40 });
        _this.selfFinalRemainTime = finalSelfRemaindTime;
        selfContainer.addChild(_this.selfFinalRemainTime);
        _this.selfFinalRemainTime.visible = false;
        //`第${this.selfNums}手`
        var selfHands = _this.createTextField("\u7B2C" + _this.selfNums + "\u624B", { x: playerHead.x + playerHead.width + 250, y: selfBg.y + 45 + 40 });
        _this.selfHands = selfHands;
        selfContainer.addChild(_this.selfHands);
        _this.selfContainer = selfContainer;
        _this.addChild(_this.selfContainer);
        /* 结束 绘制自己的玩家信息 */
        /* 开始 绘制对手的玩家信息 */
        var oppContainer = new egret.Sprite();
        //加载玩家背景
        var oppBg = GosCommon.createBitmapByNameAndPosition("playerbg_png", { x: (stageW - 594) / 2 + _this.playerBgGap + 594, y: (stageH - 594) / 2 + (594 - 160) / 2 });
        oppContainer.addChild(oppBg);
        ;
        //玩家头像
        var oppPlayerHead = GosCommon.createBitmapByNameAndPosition("touxiang_png", { x: oppBg.x + 30, y: (oppBg.height - 100) / 2 + oppBg.y });
        oppContainer.addChild(oppPlayerHead);
        var oppNameChess = _this.createUserChess("unknown_png", { x: oppPlayerHead.x + oppPlayerHead.width + 10, y: oppBg.y + 40 });
        _this.oppUserNameChess = oppNameChess;
        oppContainer.addChild(_this.oppUserNameChess);
        var oppHandsChess = _this.createUserChess("unknown_png", { x: oppPlayerHead.x + oppPlayerHead.width + 270, y: selfBg.y + 40 });
        _this.oppHandsChess = oppHandsChess;
        oppContainer.addChild(_this.oppHandsChess);
        var oppUserName = _this.createTextField("jsnylee", { x: oppPlayerHead.x + oppPlayerHead.width + 70, y: oppBg.y + 45 });
        _this.oppName = oppUserName;
        oppContainer.addChild(oppUserName);
        var oppRemaindTime = _this.createTextField("00:20:00", { x: oppPlayerHead.x + oppPlayerHead.width + 70, y: oppBg.y + 45 + 40 });
        _this.oppRemainTime = oppRemaindTime;
        oppContainer.addChild(_this.oppRemainTime);
        var finalOppRemaindTime = _this.createTextField("3次 20秒", { x: oppPlayerHead.x + oppPlayerHead.width + 70, y: oppBg.y + 45 + 40 });
        _this.oppFinalRemainTime = finalOppRemaindTime;
        oppContainer.addChild(_this.oppFinalRemainTime);
        _this.oppFinalRemainTime.visible = false;
        var oppHands = _this.createTextField("\u7B2C" + _this.oppNums + "\u624B", { x: oppPlayerHead.x + oppPlayerHead.width + 250, y: oppBg.y + 45 + 40 });
        _this.oppHands = oppHands;
        oppContainer.addChild(_this.oppHands);
        _this.oppContainer = oppContainer;
        _this.addChild(_this.oppContainer);
        /* 结束 绘制对手的玩家信息 */
        //this.selfContainer.visible = false;
        _this.oppContainer.visible = false;
        EventManager.subscribe("GameScene/ShowPlayerMsg", function (data) {
            self.showOppPlayer(data);
        });
        /*EventManager.subscribe("GameScene/showSelfName", function (nickName) {
            self.setSelfName(nickName);
        });*/
        /*  EventManager.subscribe("GameScene/SetPlayerName", function (pType, name) {
              self.setPlayerName(pType, name);
          });*/
        EventManager.subscribe("GameScene/setPlayerChess", function (chessType) {
            self.updatePlayerChess(chessType);
        });
        EventManager.subscribe("GameScene/stepSelfPlus", function () {
            self.setSelfNums();
        });
        EventManager.subscribe("GameScene/stepOppPlus", function () {
            self.setOppNums();
        });
        EventManager.subscribe("GameScene/startRemainTime", function (playerType) {
            //alert(playerType);
            self.initTimer(playerType);
        });
        EventManager.subscribe("GameScene/stopRemainTime", function (playerType) {
            self.stopTimer(playerType);
        });
        EventManager.subscribe("GameScene/setMatchRemainTime", function (playerType, second) {
            self.setMatchRemainTime(playerType, second);
        });
        EventManager.subscribe("GameScene/setHandsNum", function (playerType, num) {
            self.setHandsNum(playerType, num);
        });
        EventManager.subscribe("GameScene/finalReadSecond", function (playerType) {
            if (playerType == 0) {
                self.selfFinalSecond = 20;
                if (self.selfFinalCount > 0) {
                    self.showSelfFinalCount(playerType);
                }
            }
            else {
                self.oppFinalSecond = 20;
                if (self.oppFinalCount > 0) {
                    self.showSelfFinalCount(playerType);
                }
            }
        });
        return _this;
    }
    /**
     * 重新进入
     */
    PlayerInfo.prototype.setHandsNum = function (playerType, num) {
        if (playerType == 0) {
            this.selfHands.text = "" + num;
        }
        else {
            this.oppHands.text = "" + num;
        }
    };
    /**
     * 比赛剩余时间 服务器返回
     */
    PlayerInfo.prototype.setMatchRemainTime = function (playerType, second) {
        if (playerType == 0) {
            this.selfRemainTime.text = GosCommon.secToTime(second);
            this.selfTime = second;
        }
        else if (playerType == 1) {
            this.oppRemainTime.text = GosCommon.secToTime(second);
            this.oppTime = second;
        }
    };
    PlayerInfo.prototype.showSelfFinalCount = function (playerType) {
        var self = this;
        if (playerType == 0) {
            this.chessSelfTimer.stop();
            this.chessSelfTimer = new egret.Timer(1000, this.selfFinalSecond);
            this.chessSelfTimer.addEventListener(egret.TimerEvent.TIMER, function () {
                if (self.selfFinalCount > 0) {
                    if (self.selfFinalSecond > 0) {
                        self.selfFinalSecond--;
                        this.selfFinalRemainTime.text = self.selfFinalCount + "\u6B21 " + self.selfFinalSecond + "\u79D2";
                    }
                }
            }, this);
            this.chessSelfTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
                if (self.selfFinalCount > 0) {
                    self.selfFinalCount--;
                    if (self.selfFinalCount == 0) {
                        oGameData["chessAvailable"] = 0;
                        EventManager.publish("ChessBoard/setAvail", false);
                        //alert(1);
                        this.selfFinalRemainTime.text = self.selfFinalCount + "\u6B21 " + 0 + "\u79D2";
                    }
                    else {
                        this.selfFinalRemainTime.text = self.selfFinalCount + "\u6B21 " + 20 + "\u79D2";
                    }
                    self.selfFinalSecond = 20;
                    self.showSelfFinalCount(0);
                }
                else {
                    this.selfFinalRemainTime.text = 0 + "\u6B21 " + 0 + "\u79D2";
                }
            }, this);
            this.chessSelfTimer.start();
            this.selfRemainTime.visible = false;
            this.selfFinalRemainTime.visible = true;
        }
        else if (playerType == 1) {
            this.chessOppTimer.stop();
            this.chessOppTimer = new egret.Timer(1000, this.oppFinalSecond);
            this.chessOppTimer.addEventListener(egret.TimerEvent.TIMER, function () {
                if (self.oppFinalCount > 0) {
                    if (self.oppFinalSecond > 0) {
                        self.oppFinalSecond--;
                        this.oppFinalRemainTime.text = self.oppFinalCount + "\u6B21 " + self.oppFinalSecond + "\u79D2";
                    }
                }
            }, this);
            this.chessOppTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
                if (self.oppFinalCount > 0) {
                    self.oppFinalCount--;
                    if (self.oppFinalCount == 0) {
                        //alert(1);
                        this.oppFinalRemainTime.text = self.oppFinalCount + "\u6B21 " + 0 + "\u79D2";
                    }
                    else {
                        this.oppFinalRemainTime.text = self.oppFinalCount + "\u6B21 " + 20 + "\u79D2";
                    }
                    self.oppFinalSecond = 20;
                    self.showSelfFinalCount(1);
                }
                else {
                    this.oppFinalRemainTime.text = 0 + "\u6B21 " + 0 + "\u79D2";
                }
            }, this);
            this.chessOppTimer.start();
            this.oppRemainTime.visible = false;
            this.oppFinalRemainTime.visible = true;
        }
    };
    PlayerInfo.prototype.initTimer = function (playerType) {
        var self = this;
        if (playerType == 0) {
            this.chessSelfTimer = new egret.Timer(1000, this.selfTime);
            this.chessSelfTimer.addEventListener(egret.TimerEvent.TIMER, function () {
                self.setSecond(playerType);
            }, this);
            //启动 三次读秒
            this.chessSelfTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
                //this.chessSelfTimer.stop();
                oGameData["isSelfSecond"] = 1;
                self.showSelfFinalCount(0);
            }, this);
            this.chessSelfTimer.start();
        }
        else if (playerType == 1) {
            this.chessOppTimer = new egret.Timer(1000, this.oppTime);
            this.chessOppTimer.addEventListener(egret.TimerEvent.TIMER, function () {
                self.setSecond(playerType);
            }, this);
            //启动 三次读秒
            this.chessOppTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
                //this.chessOppTimer.stop();
                oGameData["isOppSecond"] = 1;
                self.showSelfFinalCount(1);
            }, this);
            this.chessOppTimer.start();
        }
    };
    PlayerInfo.prototype.setSecond = function (playerType) {
        if (playerType == 0) {
            if (this.selfTime > 0) {
                this.selfTime--;
                this.selfRemainTime.text = GosCommon.secToTime(this.selfTime);
            }
        }
        else if (playerType == 1) {
            if (this.oppTime > 0) {
                this.oppTime--;
                this.oppRemainTime.text = GosCommon.secToTime(this.oppTime);
            }
        }
    };
    PlayerInfo.prototype.stopTimer = function (playerType) {
        if (playerType == 0) {
            this.chessSelfTimer.stop();
        }
        else if (playerType == 1) {
            this.chessOppTimer.stop();
        }
    };
    PlayerInfo.prototype.setSelfName = function (nickName) {
        //this.selfName = nickName;
        // alert(nickName);
    };
    /**
     * 自己 每下一步棋 步数加1
     */
    PlayerInfo.prototype.setSelfNums = function () {
        this.stepNums++;
        this.selfHands.text = "\u7B2C" + this.stepNums + "\u624B";
    };
    /**
        * 对手 每下一步棋 步数加1
        */
    PlayerInfo.prototype.setOppNums = function () {
        this.stepNums++;
        this.oppHands.text = "\u7B2C" + this.stepNums + "\u624B";
    };
    PlayerInfo.prototype.setPlayerName = function (pType, name) {
        var currentPlayer = pType == "self" ? this.selfName : this.oppName;
        currentPlayer.text = name;
    };
    /**
     * 更新对手显示  同时更新自己的棋子
     */
    PlayerInfo.prototype.showOppPlayer = function (playerInfo) {
        this.oppContainer.visible = true;
        this.oppContainer.alpha = 0;
        this.setPlayerName("opp", GosCommon.subString(playerInfo.nickname, 10));
        egret.Tween.get(this.oppContainer).to({ alpha: 1 }, 1000, egret.Ease.backIn);
        EventManager.publish("GameScene/setPlayerChess", playerInfo.colorType);
    };
    /**
     * 更新棋子 服务端返回 棋子类型后更新自己和对手棋子颜色
     */
    PlayerInfo.prototype.updatePlayerChess = function (chessType) {
        if (chessType != 2) {
            var selfChessType = chessType == 0 ? 1 : 0;
            var resOppName = chessType == 0 ? "chess_black_big_png" : "chess_white_big_png";
            var resSelfName = chessType == 0 ? "chess_white_big_png" : "chess_black_big_png";
            var resOppNameChess = GosCommon.createBitmapByName(resOppName).texture;
            var resSelfNameChess = GosCommon.createBitmapByName(resSelfName).texture;
            this.selfUserNameChess.texture = resSelfNameChess;
            this.selfHandsChess.texture = resSelfNameChess;
            this.oppUserNameChess.texture = resOppNameChess;
            this.oppHandsChess.texture = resOppNameChess;
            EventManager.publish("ChessBoard/setSelfChessType", selfChessType);
        }
    };
    /**
     * 用户信息
     * position 位置对象
     */
    PlayerInfo.prototype.createTextField = function (txt, position) {
        var txtField = new egret.TextField();
        txtField.textColor = 0;
        txtField.text = txt;
        txtField.x = position["x"];
        txtField.y = position["y"];
        txtField.size = 24;
        return txtField;
    };
    /**
     * 用户信息 棋子
     * name 资源; position 位置对象
     */
    PlayerInfo.prototype.createUserChess = function (name, position) {
        var userChess = GosCommon.createBitmapByName(name);
        userChess.x = position["x"];
        userChess.y = position["y"];
        return userChess;
    };
    return PlayerInfo;
}(egret.DisplayObjectContainer));
__reflect(PlayerInfo.prototype, "PlayerInfo");
//# sourceMappingURL=PlayerInfo.js.map