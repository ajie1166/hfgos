var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var StartScene = (function (_super) {
    __extends(StartScene, _super);
    function StartScene() {
        return _super.call(this) || this;
    }
    StartScene.prototype.initGameScene = function (container) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        //背景
        var sky = GosCommon.createBitmapByName("yzbg");
        container.addChild(sky);
        var stageW = data[0];
        var stageH = data[1];
        container.stage.scaleMode = egret.StageScaleMode.EXACT_FIT; //去边框并保持图片缩放完整
        sky.width = stageW;
        sky.height = stageH;
        //加载棋盘
        var qipan = GosCommon.createBitmapByNameAndPosition("qipan_png", { x: (stageW - 594) / 2, y: (stageH - 594) / 2 });
        container.addChild(qipan);
        //加载玩家背景
        var playerBg = GosCommon.createBitmapByNameAndPosition("playerbg_png", { x: (stageW - qipan.width) / 2 - 490 - data[2], y: qipan.y + (qipan.height - 160) / 2 });
        container.addChild(playerBg);
        //玩家头像
        var playerHead = GosCommon.createBitmapByNameAndPosition("touxiang_png", { x: playerBg.x + 30, y: (playerBg.height - 100) / 2 + playerBg.y });
        container.addChild(playerHead);
        //名称 请求服务端获取我的信息 0 黑  1 白
        var playChessRandom = [0, 1];
        var randomChess = Math.floor(Math.random() * 2);
        var playerChessOne;
        var chessPosition = { x: playerHead.x + 100 + 20, y: playerHead.y + 15 };
        var chess = "";
        if (randomChess == 0) {
            chess = "chess_black_big_png";
        }
        else {
            chess = "chess_white_big_png";
        }
        //playerChessOne = GosCommon.createBitmapByNameAndPosition(chess, chessPosition);
        playerChessOne = GosCommon.createBitmapByName(chess);
        egret.Tween.get(playerChessOne).to(chessPosition, 3000, egret.Ease.sineIn);
        container.addChild(playerChessOne);
        var pipeiBtn = GosCommon.createBitmapByNameAndPosition("btn_start_pipei_black_png", { x: qipan.x + (qipan.width - 336) / 2, y: qipan.y + (qipan.height - 110) / 2 });
        pipeiBtn.touchEnabled = true;
        pipeiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            //alert("开始匹配");
            container.removeChild(pipeiBtn);
        }, pipeiBtn);
        container.addChild(pipeiBtn);
    };
    return StartScene;
}(egret.DisplayObjectContainer));
__reflect(StartScene.prototype, "StartScene");
//# sourceMappingURL=StartScene.js.map