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
    constructor() {
        super();
        let self = this;

        let stage: egret.Stage = egret.MainContext.instance.stage;
        let stageW = stage.stageWidth;
        let stageH = stage.stageHeight;
        //加载棋盘
        this.qipanContainer = new egret.Sprite();
        let qipan = GosCommon.createBitmapByNameAndPosition("qipan_png", { x: (stageW - 594) / 2, y: (stageH - 594) / 2 });
        this.qipanContainer.addChild(qipan);
        this.addChild(this.qipanContainer);

        this.BoardStartX = 48;
        this.BoardStartY = 28;
        this.chessGap = 30;
        this.chessW = 30;
        this.chessH = 31;


        this.lightX = new egret.Bitmap(RES.getRes('lightX_png'));
        this.lightX.visible = false;
        this.addChild(this.lightX);
        this.lightY = new egret.Bitmap(RES.getRes('lightY_png'));
        this.lightY.visible = false;
        this.addChild(this.lightY);


        this.chessList = new egret.DisplayObjectContainer();
        this.addChild(this.chessList);

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
        EventManager.subscribe('ChessBoard/setGos', function (chessType, numX, numY) {
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
            self.addChess(chessType, numX, numY);
        });

        EventManager.subscribe("ChessBoard/setAvail", function (isAvail) {
            self.setAvailSetGos(isAvail);
        })
        //弹出遮罩层
        EventManager.subscribe("ChessBoard/showMask", function (content) {
            self.showRectMask(qipan.x + (qipan.width - 340) / 2, qipan.y + (qipan.height - 150) / 2, content);
            //self.showRectMask(500, 20);
        });
        //EventManager.publish("ChessBoard/showMask");

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBoard, this);
        //this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchBoard, this);
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
        this.rectMaskContent.x = x + 100;
        this.rectMaskContent.y = y + 55;
        this.rectMaskContent.textColor = 0xffffff;

        this.qipanContainer.addChild(this.rectMask);
        this.qipanContainer.addChild(this.rectMaskContent);
        // this.btnPiPei.mask = rectMask;
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
    private addChess(chessType: number, numX: number, numY: number) {
        //alert(chessType);
        let chessResName = chessType == 0 ? "chess_black_small_png" : "chess_white_small_png";
        let chess: egret.Bitmap = GosCommon.createBitmapByName(chessResName);
        chess.anchorOffsetX = chess.width / 2;
        chess.anchorOffsetY = chess.height / 2;
        chess.x = numX * this.chessGap + this.realBoardStartX;
        chess.y = numY * this.chessGap + this.realBoardStartY;

        chess.scaleX = 2;
        chess.scaleY = 2;
        chess.alpha = 0;
        egret.Tween.get(chess).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 1000);

        this.chessList.addChild(chess);
        this.setAvailSetGos(false);
        EventManager.publish("GameScene/hideConfirmLuoZi");
        EventManager.publish("ChessBoard/hideLight");
        let content = "play " + (chessType == 0 ? "black" : "white") + " h5";
        EventManager.publish("GameScene/confirmLuoZi", localStorage.getItem("game_id"), 1, content, 10700);
    }


} 