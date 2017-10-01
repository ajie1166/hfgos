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
        //自己棋子颜色类型 0 黑子  1 白子
        _this.nSelfColor = 0;
        _this.chessAvailable = false;
        _this.isBiaoji = true;
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
        _this.qipanContainer.addChild(qipan);
        _this.addChild(_this.qipanContainer);
        _this.BoardStartX = 48;
        _this.BoardStartY = 28;
        _this.chessGap = 30;
        _this.chessW = 30;
        _this.chessH = 31;
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
            oGameData["nStep"]++;
            // alert(oGameData["nStep"]);
            self.addChess(chessType, numX, numY, playerType);
        });
        //添加三角
        EventManager.subscribe("ChessBoard/setTriangle", function (chessType, x, y, anX, anY) {
            self.setTriangle(chessType, x, y, anX, anY);
        });
        //标记
        EventManager.subscribe("ChessBoard/setNums", function () {
            self.setNums();
        });
        //设置是否可以下棋 权限
        EventManager.subscribe("ChessBoard/setAvail", function (isAvail) {
            self.setAvailSetGos(isAvail);
        });
        //弹出遮罩层
        EventManager.subscribe("ChessBoard/showMask", function (content) {
            self.showRectMask(qipan.x + (qipan.width - 340) / 2, qipan.y + (qipan.height - 150) / 2, content);
            //self.showRectMask(500, 20);
        });
        //EventManager.publish("ChessBoard/showMask");
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBoard, _this);
        return _this;
        //this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchBoard, this);
    }
    /**
     *
     * * 遮罩层
        */
    ChessBoard.prototype.showRectMask = function (x, y, content) {
        this.rectMask = new egret.Sprite();
        this.rectMask.graphics.beginFill(0x000000);
        this.rectMask.graphics.drawRect(x, y, 340, 150);
        this.rectMask.graphics.endFill();
        this.rectMask.alpha = 0.5;
        this.rectMaskContent = new egret.TextField();
        this.rectMaskContent.text = content;
        this.rectMaskContent.x = x + 100;
        this.rectMaskContent.y = y + 55;
        this.rectMaskContent.textColor = 0xffffff;
        this.qipanContainer.addChild(this.rectMask);
        this.qipanContainer.addChild(this.rectMaskContent);
        // this.btnPiPei.mask = rectMask;
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
                    txtNum.x = (Number(oneChessBookArr[1])) * this.chessGap + this.realBoardStartX;
                    txtNum.y = (Number(oneChessBookArr[2])) * this.chessGap + this.realBoardStartY;
                    txtNum.anchorOffsetX = txtNum.width / 2 - 3;
                    txtNum.anchorOffsetY = txtNum.height / 2 - 4;
                    txtNum.size = 20;
                    this.steplist.addChild(txtNum);
                }
                this.addChild(this.steplist);
            }
        }
        else {
            this.isBiaoji = true;
            this.steplist.visible = false;
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
    //落子
    /**
     * chessType 0 黑子 1 白子
     * playerType 己方还是对方     0 己方  1 他方
     */
    ChessBoard.prototype.addChess = function (chessType, numX, numY, playerType) {
        //alert(numX + "****" + numY);
        //alert(chessType);
        //let chessBook: string = "";
        var chessResName = chessType == 0 ? "chess_black_small_png" : "chess_white_small_png";
        var chess = GosCommon.createBitmapByName(chessResName);
        chess.anchorOffsetX = chess.width / 2;
        chess.anchorOffsetY = chess.height / 2;
        chess.x = numX * this.chessGap + this.realBoardStartX;
        chess.y = numY * this.chessGap + this.realBoardStartY;
        chess.scaleX = 2;
        chess.scaleY = 2;
        chess.alpha = 0;
        egret.Tween.get(chess).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 1000);
        this.chessList.addChild(chess);
        if (playerType == 0) {
            oGameData["chessAvailable"] = 0;
            this.setAvailSetGos(false);
            EventManager.publish("GameScene/hideConfirmLuoZi");
            EventManager.publish("ChessBoard/hideLight");
            var wX = Utility.getWordByNum(numX);
            var content = "play " + (chessType == 0 ? "black" : "white") + (" " + wX + (19 - numY));
            EventManager.publish("GameScene/confirmLuoZi", localStorage.getItem("game_id"), 1, content, 10700);
            EventManager.publish("GameScene/stepSelfPlus");
        }
        else {
            oGameData["chessAvailable"] = 1;
            EventManager.publish("GameScene/stepOppPlus");
            this.setAvailSetGos(true);
        }
        EventManager.publish("ChessBoard/setTriangle", chessType, chess.x, chess.y, chess.anchorOffsetX, chess.anchorOffsetY);
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