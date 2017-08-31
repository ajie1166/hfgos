// TypeScript file
/**
 * by lijie 棋盘相关
 */
class ChessBoard extends egret.DisplayObjectContainer {
    // 横纵标识
    private lightX: egret.Bitmap;
    private lightY: egret.Bitmap;
    //移动棋子
    private moveWhiteChess: egret.Bitmap;
    private moveBlackChess: egret.Bitmap;
    constructor() {
        super();

        let stage: egret.Stage = egret.MainContext.instance.stage;
        let stageW = stage.stageWidth;
        let stageH = stage.stageHeight;
        //加载棋盘
        let qipan = GosCommon.createBitmapByNameAndPosition("qipan_png", { x: (stageW - 594) / 2, y: (stageH - 594) / 2 });
        this.addChild(qipan);

        this.lightX = new egret.Bitmap(RES.getRes('lightX_png'));
        this.lightX.visible = false;
        this.addChild(this.lightX);
        this.lightY = new egret.Bitmap(RES.getRes('lightY_png'));
        this.lightY.visible = false;
        this.addChild(this.lightY);

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

    }
} 