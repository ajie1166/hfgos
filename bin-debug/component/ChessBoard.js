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
        var stage = egret.MainContext.instance.stage;
        var stageW = stage.stageWidth;
        var stageH = stage.stageHeight;
        //加载棋盘
        var qipan = GosCommon.createBitmapByNameAndPosition("qipan_png", { x: (stageW - 594) / 2, y: (stageH - 594) / 2 });
        _this.addChild(qipan);
        return _this;
        /*this.lightX = new egret.Bitmap(RES.getRes('lightX_png'));
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
        this.addChild(this.moveWhiteChess);*/
    }
    return ChessBoard;
}(egret.DisplayObjectContainer));
__reflect(ChessBoard.prototype, "ChessBoard");
//# sourceMappingURL=ChessBoard.js.map