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
        _this.lightX = new egret.Bitmap(RES.getRes('lightX_png'));
        _this.lightX.visible = false;
        _this.addChild(_this.lightX);
        _this.lightY = new egret.Bitmap(RES.getRes('lightY_png'));
        _this.lightY.visible = false;
        _this.addChild(_this.lightY);
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
        return _this;
    }
    return ChessBoard;
}(egret.DisplayObjectContainer));
__reflect(ChessBoard.prototype, "ChessBoard");
//# sourceMappingURL=ChessBoard.js.map