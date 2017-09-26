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

    private chessList: egret.DisplayObjectContainer;

    private nSelfColor = 0;
    constructor() {
        super();
        let self = this;

        let stage: egret.Stage = egret.MainContext.instance.stage;
        let stageW = stage.stageWidth;
        let stageH = stage.stageHeight;
        //加载棋盘
        let qipan = GosCommon.createBitmapByNameAndPosition("qipan_png", { x: (stageW - 594) / 2, y: (stageH - 594) / 2 });
        this.addChild(qipan);

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
        })

        EventManager.subscribe("ChessBoard/setSelfChessType", function (chessType) {
            self.setSelfChessType(chessType);
        })
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

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBoard, this);
        //this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchBoard, this);
    }

    private setSelfChessType(chessType) {
        this.nSelfColor = chessType;
    }

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
        let chessAvailable = true;
        let numX = Math.round((_x - this.realBoardStartX) / chessGap);//x轴隔几个chessGap开始
        let numY = Math.round((_y - this.realBoardStartY) / chessGap);//y轴隔几个chessGap开始
        if (chessAvailable) {
            this.setLight(chessType, numX, numY, _x, _y);
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

        this.addChess(chessType, numX, numY);
    }

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

    }


} 