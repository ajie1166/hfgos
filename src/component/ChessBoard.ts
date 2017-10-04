// TypeScript file
/**
 * by lijie 棋盘相关
 */
class ChessBoard extends egret.DisplayObjectContainer {


    // 棋盘的起止位置
    //开始位置距离棋盘
    private BoardStartX: number;
    //开始位置距离棋盘
    private BoardStartY: number;
    //棋子宽度
    private chessW: number;
    //棋子高度
    private chessH: number;
    //每格边长
    private chessGap: number;
    private touchGap = 10;

    private realBoardStartX = 690;
    private realBoardStartY = 270;

    // 横纵标识
    private lightX: egret.Bitmap;
    private lightY: egret.Bitmap;

    private blackTriangle: egret.Bitmap;
    private whiteTriangle: egret.Bitmap;
    //移动棋子
    private moveWhiteChess: egret.Bitmap;
    private moveBlackChess: egret.Bitmap;

    //棋盘容器
    private qipanContainer: egret.Sprite;

    //棋子容器
    private chessList: egret.DisplayObjectContainer;

    //矩形遮罩层
    private rectMask: egret.Sprite;
    //遮罩层显示内容
    private rectMaskContent: egret.TextField;

    //自己棋子颜色类型 0 黑子  1 白子
    private nSelfColor = 0;
    //落子处x,y隔多少个格子
    private numX: number;
    private numY: number;

    private chessAvailable: boolean = false;

    //棋子步数
    private step: number;
    //自己的手数
    private selfStep: number;
    //对手的手数
    private oppStep: number;

    private steps: number;
    //标记数字容器
    private steplist: egret.DisplayObjectContainer;

    private isBiaoji: boolean = true;

    private txtResult: egret.TextField;
    private gameResult: egret.Sprite;

    private confirmBtn: egret.Bitmap;
    private cancelBtn: egret.Bitmap;
    private sound: egret.Sound;

    private qipan: egret.Bitmap;
    private txtField: egret.TextField;
    private ruleTxt: egret.TextField;
    constructor() {
        super();
        let self = this;

        //三角形
        /*let g: egret.Shape = new egret.Shape();
        g.graphics.lineStyle(2,0xfffff);
        g.graphics.moveTo(50,0);
        g.graphics.lineTo(0, 50);
        g.graphics.endFill();
        this.addChild(g);*/

        let stage: egret.Stage = egret.MainContext.instance.stage;
        let stageW = stage.stageWidth;
        let stageH = stage.stageHeight;
        //加载棋盘
        this.qipanContainer = new egret.Sprite();
        let qipan = GosCommon.createBitmapByNameAndPosition("qipan_png", { x: (stageW - 594) / 2, y: (stageH - 594) / 2 });
        this.qipan = qipan;
        this.qipanContainer.addChild(qipan);
        this.addChild(this.qipanContainer);

        this.BoardStartX = 48;
        this.BoardStartY = 28;
        this.chessGap = 30;
        this.chessW = 30;
        this.chessH = 31;



        this.gameResult = new egret.Sprite();
        //this.gameResult = GosCommon.createBitmapByNameAndPosition("alertBg_png", { x: qipan.x + (qipan.width - 514) / 2 ,y:qipan.y+(qipan.height-301)/2});
        let alertBg = new egret.Bitmap(RES.getRes("alertBg_png"));
        alertBg.x = qipan.x + (qipan.width - 514) / 2;
        alertBg.y = qipan.y + (qipan.height - 301) / 2;
        this.gameResult.addChild(alertBg);

        this.txtField = new egret.TextField();
        this.txtField.text = "对局结果\n\n";
        this.txtField.x = alertBg.x + (alertBg.width - this.txtField.width) / 2;
        this.txtField.y = alertBg.y + (alertBg.height - this.txtField.height) / 2 - 50;
        this.gameResult.addChild(this.txtField);

        this.txtResult = new egret.TextField();
        this.txtResult.x = alertBg.x;
        this.txtResult.y = alertBg.y + (alertBg.height - this.txtResult.height) / 2 - 30;
        this.gameResult.addChild(this.txtResult)

        //规则
        this.ruleTxt = new egret.TextField();
        this.ruleTxt.y = qipan.y + qipan.width + 30;


        this.confirmBtn = new egret.Bitmap(RES.getRes("ok_png"));
        this.confirmBtn.x = qipan.x + (qipan.width - this.confirmBtn.width) / 2;
        this.confirmBtn.y = qipan.y + (qipan.height - this.confirmBtn.height) / 2 + 50;
        this.gameResult.addChild(this.confirmBtn);
        this.confirmBtn.touchEnabled = true;
        /*this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this.gameResult.visible = false;
        }, self);*/

        this.cancelBtn = new egret.Bitmap(RES.getRes("cancelalert_png"));
        this.cancelBtn.x = qipan.x + (qipan.width - this.cancelBtn.width - this.confirmBtn.width - 20) / 2;
        this.cancelBtn.y = qipan.y + (qipan.height - this.cancelBtn.height) / 2 + 50;
        this.gameResult.addChild(this.cancelBtn);
        this.cancelBtn.touchEnabled = true;


        this.lightX = new egret.Bitmap(RES.getRes('lightX_png'));
        this.lightX.visible = false;
        this.addChild(this.lightX);
        this.lightY = new egret.Bitmap(RES.getRes('lightY_png'));
        this.lightY.visible = false;
        this.addChild(this.lightY);

        this.blackTriangle = new egret.Bitmap(RES.getRes("black_triangle_png"));
        this.blackTriangle.visible = false;
        this.whiteTriangle = new egret.Bitmap(RES.getRes("white_triangle_png"));
        this.whiteTriangle.visible = false;


        this.chessList = new egret.DisplayObjectContainer();
        this.addChild(this.chessList);

        this.sound = RES.getRes("stone_wav");

        this.moveBlackChess = new egret.Bitmap(RES.getRes('chess_black_small_png'));
        this.moveBlackChess.anchorOffsetX = this.moveBlackChess.width / 2;
        this.moveBlackChess.anchorOffsetY = this.moveBlackChess.height / 2;
        this.moveBlackChess.visible = false;
        this.addChild(this.moveBlackChess);
        this.moveWhiteChess = new egret.Bitmap(RES.getRes('chess_white_small_png'));
        this.moveWhiteChess.anchorOffsetX = this.moveWhiteChess.width / 2;
        this.moveWhiteChess.anchorOffsetY = this.moveWhiteChess.height / 2;
        this.moveWhiteChess.visible = false;
        this.addChild(this.moveWhiteChess);

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
        EventManager.subscribe("ChessBoard/showMask", function (content) {
            self.showRectMask(qipan.x + (qipan.width - 340) / 2, qipan.y + (qipan.height - 150) / 2, content);
            //self.showRectMask(500, 20);
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

        EventManager.subscribe("GameScene/showAlert", function (content, type) {
            self.showAlert(type, content);
        })

        EventManager.subscribe("GameScene/showRule", function (content) {
            self.showRule(content);
        })
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBoard, this);
        //this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchBoard, this);
    }

    private showRule(content) {
        this.ruleTxt.text = content;
        this.ruleTxt.x = this.qipan.x + (this.qipan.width - this.ruleTxt.width) / 2;
        this.ruleTxt.textColor = 0x000000;
        // this.ruleTxt.fontFamily = "宋体";
        this.ruleTxt.bold = true;
        this.addChild(this.ruleTxt);
    }

    /**
     * 拒绝对方发起的点目
     */
    private cancelOppDianMu() {
        //alert("拒绝对方发起的点目")
        this.gameResult.visible = false;
        EventManager.publish("GameScene/handlerDianMu", 0);
    }

    /**
     * 取消自己发起的点目
     */
    private cancelSelfDianMu() {
        // alert("取消自己发起的点目")
        EventManager.publish("ChessBoard/setAvail", true);
        this.gameResult.visible = false;
    }

    /**
     * 弹窗
     * type 弹窗类型 0 自己点目弹窗; 1 对手发起点目确认弹窗
     */
    private showAlert(type, content) {
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
            this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.callbackOppConfirmDianMu, this)
        }
    }

    /**
     * 同意对手发起的点目
     */
    private callbackOppConfirmDianMu() {
        //alert("同意对方发起的点目")
        this.gameResult.visible = false;
        EventManager.publish("GameScene/handlerDianMu", 1);
    }
    /**
     * 自己发起确认点目
     */
    private callbackSelfConfirmDianMu() {
        this.gameResult.visible = false;
        EventManager.publish("GameScene/confirmDianMu");
    }

    /**
     * 显示结果
     */
    private showGameResult(type, game_status, result) {
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
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hideGameResult, this)

    }

    private hideGameResult() {
        this.gameResult.visible = false;
    }
    /**
     * 
     * * 遮罩层
        */
    private showRectMask(x: number, y: number, content: string) {
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
        //this.rectMask.addChild(this.rectMaskContent);
        this.qipanContainer.addChild(this.rectMask);
        this.qipanContainer.addChild(this.rectMaskContent);

        egret.Tween.get(this.rectMask).to({ visible: false }, 2000, egret.Ease.circIn);
        egret.Tween.get(this.rectMaskContent).to({ visible: false }, 2000, egret.Ease.circIn);
    }


    /**
     * 添加三角标识
     */
    private setTriangle(chessType: number, x: number, y: number, anX: number, anY: number) {
        //alert(chessType);
        let oppTriangle = chessType == 0 ? this.blackTriangle : this.whiteTriangle;
        let triangle = chessType == 0 ? this.whiteTriangle : this.blackTriangle;
        oppTriangle.visible = false;
        triangle.visible = true;
        triangle.x = x;
        triangle.y = y;
        triangle.anchorOffsetX = triangle.width / 2;
        triangle.anchorOffsetY = triangle.height / 2;
        this.addChild(triangle);

    }

    /**
     * 标记
     */
    private setNums() {
        let num: number;
        if (this.isBiaoji) {
            this.isBiaoji = false;
            if (localStorage.getItem("local_chessbook") != null) {
                let allChess = localStorage.getItem("local_chessbook");
                let chessArr = allChess.split(";");
                this.steplist = new egret.DisplayObjectContainer();
                for (let i = 1; i < chessArr.length - 1; i++) {
                    let txtNum: egret.TextField = new egret.TextField();
                    let oneChessBookArr = chessArr[i].split("_");
                    txtNum.text = `${i}`;
                    if (oneChessBookArr[0] == "B") {
                        txtNum.textColor = 0xffffff;
                    } else {
                        txtNum.textColor = 0;
                    }
                    let x = Number(oneChessBookArr[1]);
                    let y = Number(oneChessBookArr[2]);
                    if (isNaN(x) || isNaN(y)) {
                        continue;
                    }
                    if (x == -1 && y == -1) {
                        continue;
                    }
                    txtNum.x = (x) * this.chessGap + this.realBoardStartX;
                    txtNum.y = (y) * this.chessGap + this.realBoardStartY;
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
    }
    //设置自己棋子类型
    private setSelfChessType(chessType) {
        this.nSelfColor = chessType;
    }

    /**
     * 设置下棋权限
     */
    private setAvailSetGos(isAvail): void {
        this.chessAvailable = isAvail;
    }
    //落子
    private onTouchBoard(evt: egret.TouchEvent) {
        //alert(evt.stageY + "---" + this.x);
        let chessType = this.nSelfColor;
        let _x = evt.stageX;
        let _y = evt.stageY;
        let startX = this.BoardStartX;
        let startY = this.BoardStartY;
        let endX = startX + 18 * this.chessGap;
        let endY = startY = 18 * this.chessGap;
        let chessGap = this.chessGap;
        if (_x < 680 || _x > 1240 || _y < 260 || _y > 820) {
            return;
        }

        //chessController查询此处是不是可以下棋
        /**
         * todo
         */
        // alert(this.chessAvailable);
        let chessAvailable = this.chessAvailable;
        let numX = Math.round((_x - this.realBoardStartX) / chessGap);//x轴隔几个chessGap开始
        let numY = Math.round((_y - this.realBoardStartY) / chessGap);//y轴隔几个chessGap开始
        if (chessAvailable) {
            this.setLight(chessType, numX, numY, _x, _y);
            this.numX = numX;
            this.numY = numY;
        }
    }

    //设置两个标识轴
    private setLight(chessType, numX, numY, _x, _y) {
        let halfWidth = this.lightX.height / 2;
        this.lightX.visible = true;
        this.lightY.visible = true;
        // alert(realBoardStartX);
        this.lightX.x = this.realBoardStartX;
        this.lightX.y = numY * this.chessGap + this.realBoardStartY - halfWidth;

        this.lightY.x = numX * this.chessGap + this.realBoardStartX - halfWidth;;
        this.lightY.y = this.realBoardStartY;

        let chessX = numX * this.chessGap + this.realBoardStartX;
        let chessY = numY * this.chessGap + this.realBoardStartY;
        if (chessType == 0) {
            //黑子
            this.moveBlackChess.x = chessX;
            this.moveBlackChess.y = chessY;
            this.moveBlackChess.visible = true;
            this.moveWhiteChess.visible = false;
        } else if (chessType == 1) {
            //白子
            this.moveWhiteChess.x = chessX;
            this.moveWhiteChess.y = chessY;
            this.moveBlackChess.visible = false;
            this.moveWhiteChess.visible = true;
        }
        EventManager.publish("GameScene/showLuoZi");
        //this.addChess(chessType, numX, numY);
    }

    /**
     * 落子成功后 隐藏
     */
    private hideLight() {
        this.moveBlackChess.visible = false;
        this.moveWhiteChess.visible = false;
        this.lightX.visible = false;
        this.lightY.visible = false;
    }

    //落子
    /**
     * chessType 0 黑子 1 白子
     * playerType 己方还是对方     0 己方  1 他方
     */
    private addChess(chessType: number, numX: number, numY: number, playerType: number) {
        this.sound.play(0, 1);
        let chessResName = chessType == 0 ? "chess_black_small_png" : "chess_white_small_png";
        let chess: egret.Bitmap = GosCommon.createBitmapByName(chessResName);
        // console.log(`x:${numX},y:${numY}`);
        ChessController.checkAvailChess(numY, numX, chessType);

        if (playerType == 0) {
            oGameData["chessAvailable"] = 0;
            this.setAvailSetGos(false);
            EventManager.publish("GameScene/hideConfirmLuoZi");
            EventManager.publish("ChessBoard/hideLight");
            let wX = Utility.getWordByNum(numX);
            let content;
            if (numX >= 0 && numY >= 0) {
                content = "play " + (chessType == 0 ? "black" : "white") + ` ${wX}${19 - numY}`;
            }
            else {
                content = "play " + (chessType == 0 ? "black" : "white") + " pass";
            }
            EventManager.publish("GameScene/confirmLuoZi", localStorage.getItem("game_id"), 1, content, 10700);
            EventManager.publish("GameScene/stepSelfPlus");
        } else {
            oGameData["chessAvailable"] = 1;
            EventManager.publish("GameScene/stepOppPlus");
            this.setAvailSetGos(true);
        }
        oGameData["steps"]++;

        if (numX >= 0 && numY >= 0) {
            chess.anchorOffsetX = chess.width / 2;
            chess.anchorOffsetY = chess.height / 2;
            chess.x = numX * this.chessGap + this.realBoardStartX;
            chess.y = numY * this.chessGap + this.realBoardStartY;

            chess.scaleX = 2;
            chess.scaleY = 2;
            chess.alpha = 0;
            egret.Tween.get(chess).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 1000);
            EventManager.publish("ChessBoard/setTriangle", chessType, chess.x, chess.y, chess.anchorOffsetX, chess.anchorOffsetY);
            this.chessList.addChild(chess);
        } else {
            if (playerType == 1) {
                EventManager.publish("ChessBoard/showMask", "对方停一手");
            }
        }
        EventManager.publish("ChessBoard/setChessBook", chessType, numX, numY);

        let childNum = this.chessList.numChildren;
        let bStr = GosCommon.getEatChess(oGameData["black_arr"]);
        let bs = bStr.split("_");
        for (let i = 0; i < childNum; i++) {
            let child = this.chessList.getChildAt(i);
            console.log(child);
            if (child.x == (Number(bs[0]) * this.chessGap + this.realBoardStartX) && child.y == (Number(bs[1]) * this.chessGap + this.realBoardStartY)) {
                this.chessList.removeChildAt(i);
            }
        }
        console.log();
    }
    /**
     * 更新棋谱
     */
    private updateChessBook(chessType, numX, numY) {
        /*if (numX < 0 || numY <= 0) {
            return;
        }*/
        let chessBook = "";

        if (localStorage.getItem("local_chessbook") != null) {
            chessBook = localStorage.getItem("local_chessbook");
        }
        chessBook = chessBook + ";" + (chessType == 0 ? "B_" : "W_") + numX + "_" + numY;
        localStorage.setItem("local_chessbook", chessBook);
    }


} 