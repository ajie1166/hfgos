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
 * by lijie 棋盘相关
 */
var ChessBoard = (function (_super) {
    __extends(ChessBoard, _super);
    function ChessBoard() {
        var _this = _super.call(this) || this;
        _this.touchGap = 10;
        _this.realBoardStartX = 690;
        _this.realBoardStartY = 270;
        _this.deleteList = [];
        //自己棋子颜色类型 0 黑子  1 白子
        _this.nSelfColor = 0;
        _this.chessAvailable = false;
        _this.isBiaoji = true; //可标记   标识未标记
        var self = _this;
        //三角形
        /*let g: egret.Shape = new egret.Shape();
        g.graphics.lineStyle(2,0xfffff);
        g.graphics.moveTo(50,0);
        g.graphics.lineTo(0, 50);
        g.graphics.endFill();
        this.addChild(g);*/
        var stage = egret.MainContext.instance.stage;
        var stageW = stage.stageWidth;
        var stageH = stage.stageHeight;
        //加载棋盘
        _this.qipanContainer = new egret.Sprite();
        var qipan = GosCommon.createBitmapByNameAndPosition("qipan_png", { x: (stageW - 594) / 2, y: (stageH - 594) / 2 });
        _this.qipan = qipan;
        _this.qipanContainer.addChild(qipan);
        _this.addChild(_this.qipanContainer);
        _this.BoardStartX = 48;
        _this.BoardStartY = 28;
        _this.chessGap = 30;
        _this.chessW = 30;
        _this.chessH = 31;
        _this.gameResult = new egret.Sprite();
        //this.gameResult = GosCommon.createBitmapByNameAndPosition("alertBg_png", { x: qipan.x + (qipan.width - 514) / 2 ,y:qipan.y+(qipan.height-301)/2});
        var alertBg = new egret.Bitmap(RES.getRes("alertBg_png"));
        alertBg.x = qipan.x + (qipan.width - 514) / 2;
        alertBg.y = qipan.y + (qipan.height - 301) / 2;
        _this.gameResult.addChild(alertBg);
        _this.txtField = new egret.TextField();
        _this.txtField.text = "对局结果\n\n";
        _this.txtField.x = alertBg.x + (alertBg.width - _this.txtField.width) / 2;
        _this.txtField.y = alertBg.y + (alertBg.height - _this.txtField.height) / 2 - 50;
        _this.gameResult.addChild(_this.txtField);
        _this.txtResult = new egret.TextField();
        _this.txtResult.x = alertBg.x;
        _this.txtResult.y = alertBg.y + (alertBg.height - _this.txtResult.height) / 2 - 30;
        _this.gameResult.addChild(_this.txtResult);
        //规则
        _this.ruleTxt = new egret.TextField();
        _this.ruleTxt.y = qipan.y + qipan.width + 30;
        //最终结果显示
        _this.finalTxt = new egret.TextField();
        _this.finalTxt.y = qipan.y + qipan.width + 80;
        _this.confirmBtn = new egret.Bitmap(RES.getRes("ok_png"));
        _this.confirmBtn.x = qipan.x + (qipan.width - _this.confirmBtn.width) / 2;
        _this.confirmBtn.y = qipan.y + (qipan.height - _this.confirmBtn.height) / 2 + 50;
        _this.gameResult.addChild(_this.confirmBtn);
        _this.confirmBtn.touchEnabled = true;
        /*this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this.gameResult.visible = false;
        }, self);*/
        _this.cancelBtn = new egret.Bitmap(RES.getRes("cancelalert_png"));
        _this.cancelBtn.x = qipan.x + (qipan.width - _this.cancelBtn.width - _this.confirmBtn.width - 20) / 2;
        _this.cancelBtn.y = qipan.y + (qipan.height - _this.cancelBtn.height) / 2 + 50;
        _this.gameResult.addChild(_this.cancelBtn);
        _this.cancelBtn.touchEnabled = true;
        _this.lightX = new egret.Bitmap(RES.getRes('lightX_png'));
        _this.lightX.visible = false;
        _this.addChild(_this.lightX);
        _this.lightY = new egret.Bitmap(RES.getRes('lightY_png'));
        _this.lightY.visible = false;
        _this.addChild(_this.lightY);
        _this.blackTriangle = new egret.Bitmap(RES.getRes("black_triangle_png"));
        _this.blackTriangle.visible = false;
        _this.whiteTriangle = new egret.Bitmap(RES.getRes("white_triangle_png"));
        _this.whiteTriangle.visible = false;
        _this.chessList = new egret.DisplayObjectContainer();
        _this.addChild(_this.chessList);
        _this.sound = RES.getRes("stone_wav");
        _this.moveBlackChess = new egret.Bitmap(RES.getRes('chess_black_small_png'));
        _this.moveBlackChess.anchorOffsetX = _this.moveBlackChess.width / 2;
        _this.moveBlackChess.anchorOffsetY = _this.moveBlackChess.height / 2;
        _this.moveBlackChess.visible = false;
        _this.addChild(_this.moveBlackChess);
        _this.moveWhiteChess = new egret.Bitmap(RES.getRes('chess_white_small_png'));
        _this.moveWhiteChess.anchorOffsetX = _this.moveWhiteChess.width / 2;
        _this.moveWhiteChess.anchorOffsetY = _this.moveWhiteChess.height / 2;
        _this.moveWhiteChess.visible = false;
        _this.addChild(_this.moveWhiteChess);
        EventManager.subscribe("ChessBoard/hideLight", function () {
            self.hideLight();
        });
        EventManager.subscribe("ChessBoard/setSelfChessType", function (chessType) {
            self.setSelfChessType(chessType);
        });
        EventManager.subscribe('ChessBoard/fSetGos', function (color, x, y) {
            // alert("fSetGos");
            // 下子操作
            // COLOR_BLACK = 1,COLOR_WHITE = 2,
            /*  var x = x || 0;
              var y = y || 0;
              var color = color || 0;
              if (color == 0) {
                  return;
              }*/
            // oGameData['nStep']++;
            /* self.fAddNumber(oGameData['nStep'], x, y);
             self.fAddChess(color, x, y, true);
             self.bShowNumber && self.fShowNumber(true);
             var o = { x: x, y: y, color: color };
             self.aRecord.push(o);*/
        });
        //走子  并落下
        EventManager.subscribe('ChessBoard/setGos', function (chessType, numX, numY, playerType) {
            //alert(chessType);
            if (chessType == undefined) {
                chessType = self.nSelfColor;
            }
            if (numX == undefined) {
                numX = self.numX;
            }
            if (numY == undefined) {
                numY = self.numY;
            }
            //oGameData["nStep"]++;
            self.addChess(chessType, numX, numY, playerType);
        });
        //预走子
        EventManager.subscribe('ChessBoard/preSetGos', function (chessType, numX, numY, playerType) {
            if (chessType == undefined) {
                chessType = self.nSelfColor;
            }
            if (numX == undefined) {
                numX = self.numX;
            }
            if (numY == undefined) {
                numY = self.numY;
            }
            //oGameData["nStep"]++;
            self.preAddChess(chessType, numX, numY, playerType);
        });
        //添加三角
        EventManager.subscribe("ChessBoard/setTriangle", function (chessType, x, y, anX, anY) {
            self.setTriangle(chessType, x, y, anX, anY);
        });
        //标记
        EventManager.subscribe("ChessBoard/setNums", function () {
            self.setNums();
        });
        //设置自己是否可以下棋 权限
        EventManager.subscribe("ChessBoard/setAvail", function (isAvail) {
            self.setAvailSetGos(isAvail);
        });
        //弹出遮罩层
        EventManager.subscribe("ChessBoard/showMask", function (content, isHide) {
            self.showRectMask(qipan.x + (qipan.width - 340) / 2, qipan.y + (qipan.height - 150) / 2, content, isHide);
            //self.showRectMask(500, 20);
        });
        EventManager.subscribe("ChessBoard/hideMask", function () {
            self.hideRectMask();
        });
        //更新本地棋谱
        EventManager.subscribe("ChessBoard/setChessBook", function (chessType, numX, numY) {
            self.updateChessBook(chessType, numX, numY);
        });
        //EventManager.publish("ChessBoard/showMask");
        //显示结果
        EventManager.subscribe("ChessBoard/showGameResult", function (type, game_status, result) {
            self.showGameResult(type, game_status, result);
        });
        //文本显示结果
        EventManager.subscribe("ChessBoard/showFinalGameResult", function (content) {
            self.showFinalResult(content);
        });
        EventManager.subscribe("GameScene/showAlert", function (content, type) {
            self.showAlert(type, content);
        });
        EventManager.subscribe("GameScene/showRule", function (content) {
            self.showRule(content);
        });
        EventManager.subscribe("GameScene/deleteChess", function (cBK) {
            self.deleteChess(cBK);
        });
        EventManager.subscribe("GameScene/replay", function (chessType, numX, numY) {
            self.replay(chessType, numX, numY);
        });
        EventManager.subscribe("GameScene/addDeleteNum", function (i) {
            self.deleteList.push(i);
        });
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBoard, _this);
        return _this;
        //this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchBoard, this);
    }
    ChessBoard.prototype.showRule = function (content) {
        this.ruleTxt.text = content;
        this.ruleTxt.x = this.qipan.x + (this.qipan.width - this.ruleTxt.width) / 2;
        this.ruleTxt.textColor = 0x000000;
        // this.ruleTxt.fontFamily = "宋体";
        this.ruleTxt.bold = true;
        this.addChild(this.ruleTxt);
    };
    ChessBoard.prototype.showFinalResult = function (content) {
        this.finalTxt.text = content;
        this.finalTxt.x = this.qipan.x + (this.qipan.width - this.finalTxt.width) / 2;
        this.finalTxt.textColor = 0xFF6633;
        this.finalTxt.bold = true;
        this.addChild(this.finalTxt);
    };
    /**
     * 拒绝对方发起的点目
     */
    ChessBoard.prototype.cancelOppDianMu = function () {
        //alert("拒绝对方发起的点目")
        this.gameResult.visible = false;
        EventManager.publish("GameScene/handlerDianMu", 0);
    };
    /**
     * 取消自己发起的点目
     */
    ChessBoard.prototype.cancelSelfDianMu = function () {
        // alert("取消自己发起的点目")
        EventManager.publish("ChessBoard/setAvail", true);
        oGameData["chessAvailable"] = 1;
        this.gameResult.visible = false;
    };
    /**
     * 弹窗
     * type 弹窗类型 0 自己点目弹窗; 1 对手发起点目确认弹窗
     */
    ChessBoard.prototype.showAlert = function (type, content) {
        this.gameResult.visible = true;
        this.txtResult.text = content;
        this.txtResult.x = this.qipan.x + (this.qipan.width - this.txtResult.width) / 2;
        this.txtField.visible = false;
        this.confirmBtn.x = this.qipan.x + (this.qipan.width) / 2 + 20;
        this.addChild(this.gameResult);
        if (type == 0) {
            if (this.cancelBtn.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                this.cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.cancelOppDianMu, this);
            }
            this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cancelSelfDianMu, this);
            if (this.confirmBtn.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.callbackOppConfirmDianMu, this);
            }
            this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.callbackSelfConfirmDianMu, this);
        }
        else if (type == 1) {
            //处理对手发起的点目
            if (this.cancelBtn.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                this.cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.cancelSelfDianMu, this);
            }
            this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cancelOppDianMu, this);
            if (this.confirmBtn.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.callbackSelfConfirmDianMu, this);
            }
            this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.callbackOppConfirmDianMu, this);
        }
    };
    /**
     * 同意对手发起的点目
     */
    ChessBoard.prototype.callbackOppConfirmDianMu = function () {
        //alert("同意对方发起的点目")
        this.gameResult.visible = false;
        EventManager.publish("GameScene/handlerDianMu", 1);
        EventManager.publish("ChessBoard/showMask", "结果计算中...", false);
    };
    /**
     * 自己发起确认点目
     */
    ChessBoard.prototype.callbackSelfConfirmDianMu = function () {
        this.gameResult.visible = false;
        EventManager.publish("GameScene/confirmDianMu");
    };
    /**
     * 显示结果
     */
    ChessBoard.prototype.showGameResult = function (type, game_status, result) {
        //alert("显示结果");
        this.cancelBtn.visible = false;
        this.gameResult.visible = true;
        this.txtField.visible = true;
        this.txtResult.text = GosCommon.getGameResult(result);
        this.txtResult.x = this.qipan.x + (this.qipan.width - this.txtResult.width) / 2;
        this.confirmBtn.x = this.qipan.x + (this.qipan.width - this.confirmBtn.width) / 2;
        this.addChild(this.gameResult);
        this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.callbackSelfConfirmDianMu, this);
        this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.callbackOppConfirmDianMu, this);
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hideGameResult, this);
        EventManager.publish("ChessBoard/showFinalGameResult", this.txtResult.text);
    };
    ChessBoard.prototype.hideGameResult = function () {
        this.gameResult.visible = false;
    };
    /**
     * 隐藏遮罩
     */
    ChessBoard.prototype.hideRectMask = function () {
        this.rectMask.visible = false;
        this.rectMaskContent.visible = false;
    };
    /**
     *
     * * 遮罩层
        */
    ChessBoard.prototype.showRectMask = function (x, y, content, isHide) {
        this.rectMask = new egret.Sprite();
        this.rectMask.graphics.beginFill(0x000000);
        this.rectMask.graphics.drawRect(x, y, 340, 150);
        this.rectMask.graphics.endFill();
        this.rectMask.alpha = 0.5;
        this.rectMaskContent = new egret.TextField();
        this.rectMaskContent.text = content;
        this.rectMaskContent.x = x + (this.rectMask.width - this.rectMaskContent.width) / 2;
        this.rectMaskContent.y = y + 55;
        this.rectMaskContent.textColor = 0xffffff;
        //this.qipanContainer.addChild(this.rectMask);
        //this.qipanContainer.addChild(this.rectMaskContent);
        this.addChild(this.rectMask);
        this.addChild(this.rectMaskContent);
        if (isHide) {
            egret.Tween.get(this.rectMask).to({ visible: false }, 2000, egret.Ease.circIn);
            egret.Tween.get(this.rectMaskContent).to({ visible: false }, 2000, egret.Ease.circIn);
        }
    };
    /**
     * 添加三角标识
     */
    ChessBoard.prototype.setTriangle = function (chessType, x, y, anX, anY) {
        //alert(chessType);
        var oppTriangle = chessType == 0 ? this.blackTriangle : this.whiteTriangle;
        var triangle = chessType == 0 ? this.whiteTriangle : this.blackTriangle;
        oppTriangle.visible = false;
        triangle.visible = true;
        triangle.x = x;
        triangle.y = y;
        triangle.anchorOffsetX = triangle.width / 2;
        triangle.anchorOffsetY = triangle.height / 2;
        this.addChild(triangle);
        oGameData["lastChessCoordinate"] = { color: chessType, x: (x - this.realBoardStartX) / this.chessGap, y: (y - this.realBoardStartY) / this.chessGap };
    };
    ChessBoard.prototype.addBiaojiNums = function (num) {
        if (!this.isBiaoji) {
            var x = oGameData["lastChessCoordinate"]["x"];
            var y = oGameData["lastChessCoordinate"]["y"];
            var color = oGameData["lastChessCoordinate"]["color"];
            var txtNum = new egret.TextField();
            if (color == 0) {
                txtNum.textColor = 0xffffff;
            }
            else {
                txtNum.textColor = 0;
            }
            txtNum.text = num;
            txtNum.size = 12;
            txtNum.height = 12;
            txtNum.textAlign = egret.HorizontalAlign.CENTER;
            txtNum.anchorOffsetX = txtNum.width / 2;
            txtNum.anchorOffsetY = txtNum.height / 2;
            txtNum.x = (x) * this.chessGap + this.realBoardStartX;
            txtNum.y = (y) * this.chessGap + this.realBoardStartY;
            this.steplist.addChild(txtNum);
        }
    };
    /**
     * 标记
     */
    ChessBoard.prototype.setNums = function () {
        var num;
        if (this.isBiaoji) {
            this.isBiaoji = false;
            if (localStorage.getItem("local_chessbook") != null) {
                var allChess = localStorage.getItem("local_chessbook");
                var chessArr = allChess.split(";");
                this.steplist = new egret.DisplayObjectContainer();
                for (var i = 1; i < chessArr.length - 1; i++) {
                    var txtNum = new egret.TextField();
                    var oneChessBookArr = chessArr[i].split("_");
                    txtNum.text = "" + i;
                    if (oneChessBookArr[0] == "B") {
                        txtNum.textColor = 0xffffff;
                    }
                    else {
                        txtNum.textColor = 0;
                    }
                    var x = Number(oneChessBookArr[1]);
                    var y = Number(oneChessBookArr[2]);
                    if (isNaN(x) || isNaN(y)) {
                        continue;
                    }
                    if (x == -1 && y == -1) {
                        continue;
                    }
                    txtNum.size = 12;
                    txtNum.height = 12;
                    txtNum.textAlign = egret.HorizontalAlign.CENTER;
                    txtNum.anchorOffsetX = txtNum.width / 2;
                    txtNum.anchorOffsetY = txtNum.height / 2;
                    txtNum.x = (x) * this.chessGap + this.realBoardStartX;
                    txtNum.y = (y) * this.chessGap + this.realBoardStartY;
                    this.steplist.addChild(txtNum);
                }
                this.deleteChessNum();
                this.addChild(this.steplist);
            }
        }
        else {
            this.isBiaoji = true;
            this.steplist.visible = false;
        }
    };
    //删除本地棋谱棋子
    ChessBoard.prototype.deleteChess = function (currentChessBook) {
        var deleteTemp = new Array();
        if (this.chessList.numChildren > 0) {
            for (var i = 0; i < this.chessList.numChildren; i++) {
                var chess = this.chessList.getChildAt(i);
                if (currentChessBook[(chess.y - this.realBoardStartY) / this.chessGap][(chess.x - this.realBoardStartX) / this.chessGap] == 0) {
                    deleteTemp.push(this.chessList.getChildAt(i));
                    this.deleteList.push(this.getDeleteNumber(chess.x, chess.y));
                    this.deleteChessNum();
                }
            }
            // console.log(deleteTemp);
            if (deleteTemp.length > 0) {
                for (var i = 0; i < deleteTemp.length; i++) {
                    this.chessList.removeChild((deleteTemp[i]));
                }
            }
        }
    };
    //设置自己棋子类型
    ChessBoard.prototype.setSelfChessType = function (chessType) {
        this.nSelfColor = chessType;
    };
    /**
     * 设置下棋权限
     */
    ChessBoard.prototype.setAvailSetGos = function (isAvail) {
        this.chessAvailable = isAvail;
    };
    //落子
    ChessBoard.prototype.onTouchBoard = function (evt) {
        //alert(evt.stageY + "---" + this.x);
        var chessType = this.nSelfColor;
        var _x = evt.stageX;
        var _y = evt.stageY;
        var startX = this.BoardStartX;
        var startY = this.BoardStartY;
        var endX = startX + 18 * this.chessGap;
        var endY = startY = 18 * this.chessGap;
        var chessGap = this.chessGap;
        if (_x < 680 || _x > 1240 || _y < 260 || _y > 820) {
            return;
        }
        //chessController查询此处是不是可以下棋
        /**
         * todo
         */
        // alert(this.chessAvailable);
        var chessAvailable = this.chessAvailable;
        var numX = Math.round((_x - this.realBoardStartX) / chessGap); //x轴隔几个chessGap开始
        var numY = Math.round((_y - this.realBoardStartY) / chessGap); //y轴隔几个chessGap开始
        if (chessAvailable) {
            this.setLight(chessType, numX, numY, _x, _y);
            this.numX = numX;
            this.numY = numY;
        }
    };
    //设置两个标识轴
    ChessBoard.prototype.setLight = function (chessType, numX, numY, _x, _y) {
        var halfWidth = this.lightX.height / 2;
        this.lightX.visible = true;
        this.lightY.visible = true;
        // alert(realBoardStartX);
        this.lightX.x = this.realBoardStartX;
        this.lightX.y = numY * this.chessGap + this.realBoardStartY - halfWidth;
        this.lightY.x = numX * this.chessGap + this.realBoardStartX - halfWidth;
        ;
        this.lightY.y = this.realBoardStartY;
        var chessX = numX * this.chessGap + this.realBoardStartX;
        var chessY = numY * this.chessGap + this.realBoardStartY;
        if (chessType == 0) {
            //黑子
            this.moveBlackChess.x = chessX;
            this.moveBlackChess.y = chessY;
            this.moveBlackChess.visible = true;
            this.moveWhiteChess.visible = false;
        }
        else if (chessType == 1) {
            //白子
            this.moveWhiteChess.x = chessX;
            this.moveWhiteChess.y = chessY;
            this.moveBlackChess.visible = false;
            this.moveWhiteChess.visible = true;
        }
        EventManager.publish("GameScene/showLuoZi");
        //this.addChess(chessType, numX, numY);
    };
    /**
     * 落子成功后 隐藏
     */
    ChessBoard.prototype.hideLight = function () {
        this.moveBlackChess.visible = false;
        this.moveWhiteChess.visible = false;
        this.lightX.visible = false;
        this.lightY.visible = false;
    };
    /**
     * 预准备
     */
    ChessBoard.prototype.preAddChess = function (chessType, numX, numY, playerType) {
        var wX = Utility.getWordByNum(numX);
        var content;
        if (numX >= 0 && numY >= 0) {
            content = "play " + (chessType == 0 ? "black" : "white") + (" " + wX + (19 - numY));
        }
        else {
            content = "play " + (chessType == 0 ? "black" : "white") + " pass";
        }
        EventManager.publish("GameScene/confirmLuoZi", localStorage.getItem("game_id"), 1, content, 10800);
    };
    /**
     * 复盘
     */
    ChessBoard.prototype.replay = function (chessType, numX, numY) {
        var chessResName = chessType == 0 ? "chess_black_small_png" : "chess_white_small_png";
        var chess = GosCommon.createBitmapByName(chessResName);
        if (numX >= 0 && numY >= 0) {
            chess.anchorOffsetX = chess.width / 2;
            chess.anchorOffsetY = chess.height / 2;
            chess.x = numX * this.chessGap + this.realBoardStartX;
            chess.y = numY * this.chessGap + this.realBoardStartY;
            //chess.scaleX = 2;
            //chess.scaleY = 2;
            chess.alpha = 1;
            //egret.Tween.get(chess).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 1000);
            this.chessList.addChild(chess);
            var chessData = { chess: chess, step: oGameData["steps"], color: chessType };
            oGameData["chessBook"][numY][numX] = chessData;
        }
    };
    //落子
    /**
     * chessType 0 黑子 1 白子
     * playerType 己方还是对方     0 己方  1 他方
     */
    ChessBoard.prototype.addChess = function (chessType, numX, numY, playerType) {
        this.sound.play(0, 1);
        var chessResName = chessType == 0 ? "chess_black_small_png" : "chess_white_small_png";
        var chess = GosCommon.createBitmapByName(chessResName);
        // console.log(`x:${numX},y:${numY}`);
        //自己写的吃子逻辑
        if (numX >= 0 && numY >= 0) {
        }
        var avail = true;
        if (avail) {
            if (playerType == 0) {
                oGameData["chessAvailable"] = 0;
                this.setAvailSetGos(false);
                EventManager.publish("GameScene/hideConfirmLuoZi");
                EventManager.publish("ChessBoard/hideLight");
                EventManager.publish("GameScene/stepSelfPlus");
                //停止落子方  开始对方计时
                EventManager.publish("GameScene/stopRemainTime", playerType);
                EventManager.publish("GameScene/startRemainTime", 1);
            }
            else {
                //停止落子方  开始自己计时
                EventManager.publish("GameScene/stopRemainTime", playerType);
                EventManager.publish("GameScene/startRemainTime", 0);
                oGameData["chessAvailable"] = 1;
                EventManager.publish("GameScene/stepOppPlus");
                this.setAvailSetGos(true);
                if (numX >= 0 && numY >= 0) {
                    EventManager.publish("ChessBoard/showMask", "请落子", true);
                }
            }
            oGameData["steps"]++;
            if (Object.keys(oGameData["lastChessCoordinate"]).length > 0) {
                if (!this.isBiaoji) {
                    if (oGameData["steps"] > 0) {
                        this.addBiaojiNums((oGameData["steps"] - 1));
                    }
                }
            }
            if (numX >= 0 && numY >= 0) {
                chess.anchorOffsetX = chess.width / 2;
                chess.anchorOffsetY = chess.height / 2;
                chess.x = numX * this.chessGap + this.realBoardStartX;
                chess.y = numY * this.chessGap + this.realBoardStartY;
                //chess.scaleX = 2;
                //chess.scaleY = 2;
                chess.alpha = 1;
                //egret.Tween.get(chess).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 1000);
                EventManager.publish("ChessBoard/setTriangle", chessType, chess.x, chess.y, chess.anchorOffsetX, chess.anchorOffsetY);
                this.chessList.addChild(chess);
                var chessData = { chess: chess, step: oGameData["steps"], color: chessType };
                oGameData["chessBook"][numY][numX] = chessData;
            }
            else {
                if (playerType == 1) {
                    EventManager.publish("ChessBoard/showMask", "对方停一手", true);
                }
                else {
                    var content = void 0;
                    content = "play " + (chessType == 0 ? "black" : "white") + " pass";
                    EventManager.publish("GameScene/confirmLuoZi", localStorage.getItem("game_id"), 1, content, 10700);
                }
                this.blackTriangle.visible = false;
                this.whiteTriangle.visible = false;
            }
            EventManager.publish("ChessBoard/setChessBook", chessType, numX, numY);
            var bArr = GosCommon.getEatChess(oGameData["black_arr"]);
            //console.log(bArr);
            var wArr = GosCommon.getEatChess(oGameData["white_arr"]);
            for (var i = 0; i < this.chessList.numChildren; i++) {
                var child = this.chessList.getChildAt(i);
                for (var j = 0; j < bArr.length; j++) {
                    var bX = bArr[j][0] * this.chessGap + this.realBoardStartX;
                    var bY = bArr[j][1] * this.chessGap + this.realBoardStartY;
                    if (child.x == bX && child.y == bY) {
                        this.chessList.removeChildAt(i);
                        this.deleteList.push(this.getDeleteNumber(bX, bY));
                    }
                }
                for (var j = 0; j < wArr.length; j++) {
                    var wX = wArr[j][0] * this.chessGap + this.realBoardStartX;
                    var wY = wArr[j][1] * this.chessGap + this.realBoardStartY;
                    if (child.x == wX && child.y == wY) {
                        this.chessList.removeChildAt(i);
                        this.deleteList.push(this.getDeleteNumber(wX, wY));
                    }
                }
            }
            this.deleteChessNum();
        }
        else {
            EventManager.publish("ChessBoard/showMask", "不能在该点落子", true);
        }
    };
    /**
     * 删除被吃掉的数字
     */
    ChessBoard.prototype.deleteChessNum = function () {
        if (this.deleteList.length > 0) {
            for (var i = 0; i < this.deleteList.length; i++) {
                //console.log(this.steplist);
                if (this.steplist != undefined) {
                    if (this.steplist.numChildren > 0) {
                        for (var j = 0; j < this.steplist.numChildren; j++) {
                            if (this.steplist.getChildAt(j).text == this.deleteList[i].toString()) {
                                this.steplist.removeChildAt(j);
                            }
                        }
                    }
                }
            }
        }
    };
    /**
     * 获取删除的棋子 步数
     */
    ChessBoard.prototype.getDeleteNumber = function (x, y) {
        for (var i = 0; i < 19; i++) {
            for (var j = 0; j < 19; j++) {
                if (Object.keys(oGameData["chessBook"][i][j]).length != 0) {
                    var chess = oGameData["chessBook"][i][j].chess;
                    if (chess.x == x && chess.y == y) {
                        return oGameData["chessBook"][i][j].step;
                    }
                }
            }
        }
    };
    /**
     * 更新棋谱
     */
    ChessBoard.prototype.updateChessBook = function (chessType, numX, numY) {
        /*if (numX < 0 || numY <= 0) {
            return;
        }*/
        var chessBook = "";
        if (localStorage.getItem("local_chessbook") != null) {
            chessBook = localStorage.getItem("local_chessbook");
        }
        chessBook = chessBook + ";" + (chessType == 0 ? "B_" : "W_") + numX + "_" + numY;
        localStorage.setItem("local_chessbook", chessBook);
    };
    return ChessBoard;
}(egret.DisplayObjectContainer));
__reflect(ChessBoard.prototype, "ChessBoard");
//# sourceMappingURL=ChessBoard.js.map