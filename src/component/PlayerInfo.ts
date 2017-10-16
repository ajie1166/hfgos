// TypeScript file
/**
 * by lijie
 */
class PlayerInfo extends egret.DisplayObjectContainer {

    private playerBgGap: number = 50;


    //自己和对手姓名
    private selfName: egret.TextField;
    private oppName: egret.TextField;

    //姓名旁边的的棋子
    private selfUserNameChess: egret.Bitmap;
    private oppUserNameChess: egret.Bitmap;

    //剩余时间
    private selfRemainTime: egret.TextField;
    private oppRemainTime: egret.TextField;

    //多少手 文本
    private selfHands: egret.TextField;
    private oppHands: egret.TextField;

    //手数
    private selfNums: number = 0;
    private oppNums: number = 0;

    private stepNums: number = 0;

    //多少手旁边的棋子
    private selfHandsChess: egret.Bitmap;
    private oppHandsChess: egret.Bitmap;

    //背景容器
    private selfContainer: egret.Sprite;
    private oppContainer: egret.Sprite;

    private playerHeader: egret.Bitmap;

    private chessSelfTimer: egret.Timer;
    private chessOppTimer: egret.Timer;
    private selfTime: number = 1200;
    private oppTime: number = 1200;

    private selfFinalRemainTime: egret.TextField;
    private oppFinalRemainTime: egret.TextField;
    private selfFinalCount: number = 3;//最后次数
    private oppFinalCount: number = 3;//最后次数
    private selfFinalSecond: number = 20;//默认20秒 读秒时间
    private oppFinalSecond: number = 20;//默认20秒 读秒时间
    constructor() {
        super();
        let self = this;
        let stage: egret.Stage = egret.MainContext.instance.stage;
        let stageW = stage.stageWidth;
        let stageH = stage.stageHeight;

        /* 开始 绘制自己的玩家信息 */
        let selfContainer = new egret.Sprite();
        //加载玩家背景
        let selfBg = GosCommon.createBitmapByNameAndPosition("playerbg_png", { x: (stageW - 594) / 2 - 490 - this.playerBgGap, y: (stageH - 594) / 2 + (594 - 160) / 2 });
        selfContainer.addChild(selfBg);;

        //玩家头像
        let playerHead = GosCommon.createBitmapByNameAndPosition("touxiang_png", { x: selfBg.x + 30, y: (selfBg.height - 100) / 2 + selfBg.y });
        selfContainer.addChild(playerHead);

        let selfNameChess = this.createUserChess("unknown_png", { x: playerHead.x + playerHead.width + 10, y: selfBg.y + 40 })
        this.selfUserNameChess = selfNameChess;
        selfContainer.addChild(this.selfUserNameChess);

        let selfHandsChess = this.createUserChess("unknown_png", { x: playerHead.x + playerHead.width + 270, y: selfBg.y + 40 })
        this.selfHandsChess = selfHandsChess;
        selfContainer.addChild(this.selfHandsChess);

        //自己的名字
        let selfTempName = localStorage.getItem("nick_name");
        selfTempName = GosCommon.subString(selfTempName, 10);
        let userName: egret.TextField = this.createTextField(selfTempName, { x: playerHead.x + playerHead.width + 70, y: selfBg.y + 45 })
        // userName.fontFamily = "宋体";
        // userName.bold = true;
        this.selfName = userName;
        selfContainer.addChild(userName);

        let remaindTime: egret.TextField = this.createTextField("00:20:00", { x: playerHead.x + playerHead.width + 70, y: selfBg.y + 45 + 40 });
        this.selfRemainTime = remaindTime;
        selfContainer.addChild(this.selfRemainTime);
        //this.selfRemainTime.visible=false;
        let finalSelfRemaindTime: egret.TextField = this.createTextField("3次 20秒", { x: playerHead.x + playerHead.width + 70, y: selfBg.y + 45 + 40 });
        this.selfFinalRemainTime = finalSelfRemaindTime;
        selfContainer.addChild(this.selfFinalRemainTime);
        this.selfFinalRemainTime.visible = false;

        //`第${this.selfNums}手`
        let selfHands: egret.TextField = this.createTextField(`第${this.selfNums}手`, { x: playerHead.x + playerHead.width + 250, y: selfBg.y + 45 + 40 });
        this.selfHands = selfHands;
        selfContainer.addChild(this.selfHands);


        this.selfContainer = selfContainer;

        this.addChild(this.selfContainer);
        /* 结束 绘制自己的玩家信息 */


        /* 开始 绘制对手的玩家信息 */
        let oppContainer = new egret.Sprite();
        //加载玩家背景
        let oppBg = GosCommon.createBitmapByNameAndPosition("playerbg_png", { x: (stageW - 594) / 2 + this.playerBgGap + 594, y: (stageH - 594) / 2 + (594 - 160) / 2 });
        oppContainer.addChild(oppBg);;

        //玩家头像
        let oppPlayerHead = GosCommon.createBitmapByNameAndPosition("touxiang_png", { x: oppBg.x + 30, y: (oppBg.height - 100) / 2 + oppBg.y });
        oppContainer.addChild(oppPlayerHead);

        let oppNameChess = this.createUserChess("unknown_png", { x: oppPlayerHead.x + oppPlayerHead.width + 10, y: oppBg.y + 40 })
        this.oppUserNameChess = oppNameChess;
        oppContainer.addChild(this.oppUserNameChess);

        let oppHandsChess = this.createUserChess("unknown_png", { x: oppPlayerHead.x + oppPlayerHead.width + 270, y: selfBg.y + 40 })
        this.oppHandsChess = oppHandsChess;
        oppContainer.addChild(this.oppHandsChess);


        let oppUserName: egret.TextField = this.createTextField("jsnylee", { x: oppPlayerHead.x + oppPlayerHead.width + 70, y: oppBg.y + 45 })
        this.oppName = oppUserName;
        oppContainer.addChild(oppUserName);

        let oppRemaindTime: egret.TextField = this.createTextField("00:20:00", { x: oppPlayerHead.x + oppPlayerHead.width + 70, y: oppBg.y + 45 + 40 });
        this.oppRemainTime = oppRemaindTime;
        oppContainer.addChild(this.oppRemainTime);

        let finalOppRemaindTime: egret.TextField = this.createTextField("3次 20秒", { x: oppPlayerHead.x + oppPlayerHead.width + 70, y: oppBg.y + 45 + 40 });
        this.oppFinalRemainTime = finalOppRemaindTime;
        oppContainer.addChild(this.oppFinalRemainTime);
        this.oppFinalRemainTime.visible = false;

        let oppHands: egret.TextField = this.createTextField(`第${this.oppNums}手`, { x: oppPlayerHead.x + oppPlayerHead.width + 250, y: oppBg.y + 45 + 40 });
        this.oppHands = oppHands;
        oppContainer.addChild(this.oppHands);


        this.oppContainer = oppContainer;
        this.addChild(this.oppContainer);
        /* 结束 绘制对手的玩家信息 */

        //this.selfContainer.visible = false;
        this.oppContainer.visible = false;
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
            } else {
                self.oppFinalSecond = 20;
                if (self.oppFinalCount > 0) {
                    self.showSelfFinalCount(playerType);
                }
            }
        })
    }

    /**
     * 重新进入
     */
    private setHandsNum(playerType, num) {
        if (playerType == 0) {
            this.selfHands.text = `${num}`;
        }
        else {
            this.oppHands.text = `${num}`;
        }
    }

    /**
     * 比赛剩余时间 服务器返回
     */
    private setMatchRemainTime(playerType, second) {
        if (playerType == 0) {
            this.selfRemainTime.text = GosCommon.secToTime(second);
            this.selfTime = second;
        } else if (playerType == 1) {
            this.oppRemainTime.text = GosCommon.secToTime(second);
            this.oppTime = second;
        }
    }

    private showSelfFinalCount(playerType) {
        let self = this;
        if (playerType == 0) {
            this.chessSelfTimer.stop();
            this.chessSelfTimer = new egret.Timer(1000, this.selfFinalSecond);
            this.chessSelfTimer.addEventListener(egret.TimerEvent.TIMER, function () {
                if (self.selfFinalCount > 0) {
                    if (self.selfFinalSecond > 0) {
                        self.selfFinalSecond--;
                        this.selfFinalRemainTime.text = `${self.selfFinalCount}次 ${self.selfFinalSecond}秒`;
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
                        this.selfFinalRemainTime.text = `${self.selfFinalCount}次 ${0}秒`;
                    } else {
                        this.selfFinalRemainTime.text = `${self.selfFinalCount}次 ${20}秒`;
                    }

                    self.selfFinalSecond = 20;
                    self.showSelfFinalCount(0);
                } else {
                    this.selfFinalRemainTime.text = `${0}次 ${0}秒`;
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
                        this.oppFinalRemainTime.text = `${self.oppFinalCount}次 ${self.oppFinalSecond}秒`;
                    }
                }
            }, this);
            this.chessOppTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
                if (self.oppFinalCount > 0) {
                    self.oppFinalCount--;
                    if (self.oppFinalCount == 0) {
                        //alert(1);
                        this.oppFinalRemainTime.text = `${self.oppFinalCount}次 ${0}秒`;
                    } else {
                        this.oppFinalRemainTime.text = `${self.oppFinalCount}次 ${20}秒`;
                    }

                    self.oppFinalSecond = 20;
                    self.showSelfFinalCount(1);
                } else {
                    this.oppFinalRemainTime.text = `${0}次 ${0}秒`;
                }
            }, this);

            this.chessOppTimer.start();
            this.oppRemainTime.visible = false;
            this.oppFinalRemainTime.visible = true;
        }
    }

    private initTimer(playerType): void {
        let self = this;
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
        } else if (playerType == 1) {
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
    }

    private setSecond(playerType) {
        if (playerType == 0) {
            if (this.selfTime > 0) {
                this.selfTime--;
                this.selfRemainTime.text = GosCommon.secToTime(this.selfTime);
            }

        } else if (playerType == 1) {
            if (this.oppTime > 0) {
                this.oppTime--;
                this.oppRemainTime.text = GosCommon.secToTime(this.oppTime);
            }
        }
    }
    private stopTimer(playerType) {
        if (playerType == 0) {
            this.chessSelfTimer.stop();
        }
        else if (playerType == 1) {
            this.chessOppTimer.stop();
        }
    }



    private setSelfName(nickName) {
        //this.selfName = nickName;
        // alert(nickName);
    }

    /**
     * 自己 每下一步棋 步数加1
     */
    private setSelfNums() {
        this.stepNums++;
        this.selfHands.text = `第${this.stepNums}手`;
    }
    /**
        * 对手 每下一步棋 步数加1
        */
    private setOppNums() {
        this.stepNums++;
        this.oppHands.text = `第${this.stepNums}手`;
    }


    private setPlayerName(pType, name) {
        let currentPlayer = pType == "self" ? this.selfName : this.oppName;
        currentPlayer.text = name;

    }
    /**
     * 更新对手显示  同时更新自己的棋子
     */
    private showOppPlayer(playerInfo) {
        this.oppContainer.visible = true;
        this.oppContainer.alpha = 0;
        this.setPlayerName("opp", GosCommon.subString(playerInfo.nickname, 10));
        egret.Tween.get(this.oppContainer).to({ alpha: 1 }, 1000, egret.Ease.backIn);
        EventManager.publish("GameScene/setPlayerChess", playerInfo.colorType);
    }

    /**
     * 更新棋子 服务端返回 棋子类型后更新自己和对手棋子颜色
     */
    private updatePlayerChess(chessType: number) {
        if (chessType != 2) {
            let selfChessType = chessType == 0 ? 1 : 0;
            let resOppName = chessType == 0 ? "chess_black_big_png" : "chess_white_big_png";
            let resSelfName = chessType == 0 ? "chess_white_big_png" : "chess_black_big_png";
            let resOppNameChess: egret.Texture = GosCommon.createBitmapByName(resOppName).texture;
            let resSelfNameChess: egret.Texture = GosCommon.createBitmapByName(resSelfName).texture;
            this.selfUserNameChess.texture = resSelfNameChess;
            this.selfHandsChess.texture = resSelfNameChess
            this.oppUserNameChess.texture = resOppNameChess;
            this.oppHandsChess.texture = resOppNameChess;
            EventManager.publish("ChessBoard/setSelfChessType", selfChessType);
        }
    }

    /**
     * 用户信息 
     * position 位置对象
     */
    private createTextField(txt: string, position: any): egret.TextField {
        let txtField: egret.TextField = new egret.TextField();
        txtField.textColor = 0;
        txtField.text = txt;
        txtField.x = position["x"];
        txtField.y = position["y"];
        txtField.size = 24;
        return txtField;
    }

    /**
     * 用户信息 棋子
     * name 资源; position 位置对象
     */
    private createUserChess(name: string, position: any): egret.Bitmap {
        let userChess: egret.Bitmap = GosCommon.createBitmapByName(name);
        userChess.x = position["x"];
        userChess.y = position["y"];
        return userChess;
    }
}