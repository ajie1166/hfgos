var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.playerBgGap = 50; //选手背景距离棋盘的宽度
        _this.initGameScene();
        return _this;
    }
    GameScene.prototype.initGameScene = function () {
        //背景
        var sky = GosCommon.createBitmapByName("yzbg");
        var stage = egret.MainContext.instance.stage;
        this.addChild(sky);
        var stageW = stage.stageWidth;
        var stageH = stage.stageHeight;
        //this.stage.scaleMode = egret.StageScaleMode.EXACT_FIT;//去边框并保持图片缩放完整
        sky.width = stageW;
        sky.height = stageH;
        //加载棋盘
        var qipan = GosCommon.createBitmapByNameAndPosition("qipan_png", { x: (stageW - 594) / 2, y: (stageH - 594) / 2 });
        this.addChild(qipan);
        var playerInfo = new PlayerInfo();
        this.addChild(playerInfo);
        //名称 请求服务端获取我的信息 0 黑  1 白
        /*let playChessRandom: number[] = [0, 1];
        let randomChess: number = Math.floor(Math.random() * 2);
        let playerChessOne: egret.Bitmap;
        let chessPosition = { x: playerHead.x + 100 + 20, y: playerHead.y + 15 };
        let chess = "";
        if (randomChess == 0) {
            chess = "chess_black_big_png";
        } else {
            chess = "chess_white_big_png";
        }
        //playerChessOne = GosCommon.createBitmapByNameAndPosition(chess, chessPosition);
        playerChessOne = GosCommon.createBitmapByName(chess);
        egret.Tween.get(playerChessOne).to(chessPosition, 3000, egret.Ease.sineIn);
        this.addChild(playerChessOne);*/
    };
    return GameScene;
}(egret.DisplayObjectContainer));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map