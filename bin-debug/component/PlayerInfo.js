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
 * by lijie
 */
var PlayerInfo = (function (_super) {
    __extends(PlayerInfo, _super);
    function PlayerInfo() {
        var _this = _super.call(this) || this;
        _this.playerBgGap = 50;
        var self = _this;
        var stage = egret.MainContext.instance.stage;
        var stageW = stage.stageWidth;
        var stageH = stage.stageHeight;
        /* 开始 绘制自己的玩家信息 */
        var selfContainer = new egret.Sprite();
        //加载玩家背景
        var selfBg = GosCommon.createBitmapByNameAndPosition("playerbg_png", { x: (stageW - 594) / 2 - 490 - _this.playerBgGap, y: (stageH - 594) / 2 + (594 - 160) / 2 });
        selfContainer.addChild(selfBg);
        ;
        //玩家头像
        var playerHead = GosCommon.createBitmapByNameAndPosition("touxiang_png", { x: selfBg.x + 30, y: (selfBg.height - 100) / 2 + selfBg.y });
        selfContainer.addChild(playerHead);
        var selfNameChess = _this.createUserChess("chess_black_big_png", { x: playerHead.x + playerHead.width + 10, y: selfBg.y + 40 });
        selfContainer.addChild(selfNameChess);
        var selfHandsChess = _this.createUserChess("chess_black_big_png", { x: playerHead.x + playerHead.width + 270, y: selfBg.y + 40 });
        selfContainer.addChild(selfHandsChess);
        var userName = _this.createTextField("jovenlee", { x: playerHead.x + playerHead.width + 70, y: selfBg.y + 45 });
        _this.selfName = userName;
        selfContainer.addChild(userName);
        var remaindTime = _this.createTextField("00:00:00", { x: playerHead.x + playerHead.width + 70, y: selfBg.y + 45 + 40 });
        selfContainer.addChild(remaindTime);
        _this.selfContainer = selfContainer;
        _this.addChild(_this.selfContainer);
        /* 结束 绘制自己的玩家信息 */
        /* 开始 绘制对手的玩家信息 */
        var oppContainer = new egret.Sprite();
        //加载玩家背景
        var oppBg = GosCommon.createBitmapByNameAndPosition("playerbg_png", { x: (stageW - 594) / 2 + _this.playerBgGap + 594, y: (stageH - 594) / 2 + (594 - 160) / 2 });
        oppContainer.addChild(oppBg);
        ;
        //玩家头像
        var oppPlayerHead = GosCommon.createBitmapByNameAndPosition("touxiang_png", { x: oppBg.x + 30, y: (oppBg.height - 100) / 2 + oppBg.y });
        oppContainer.addChild(oppPlayerHead);
        var oppNameChess = _this.createUserChess("chess_black_big_png", { x: oppPlayerHead.x + oppPlayerHead.width + 10, y: oppBg.y + 40 });
        oppContainer.addChild(oppNameChess);
        var oppHandsChess = _this.createUserChess("chess_black_big_png", { x: oppPlayerHead.x + oppPlayerHead.width + 270, y: selfBg.y + 40 });
        oppContainer.addChild(oppHandsChess);
        var oppUserName = _this.createTextField("jsnylee", { x: oppPlayerHead.x + oppPlayerHead.width + 70, y: oppBg.y + 45 });
        _this.oppName = oppUserName;
        oppContainer.addChild(oppUserName);
        var oppRemaindTime = _this.createTextField("00:00:00", { x: oppPlayerHead.x + oppPlayerHead.width + 70, y: oppBg.y + 45 + 40 });
        oppContainer.addChild(oppRemaindTime);
        _this.oppContainer = oppContainer;
        _this.addChild(_this.oppContainer);
        /* 结束 绘制对手的玩家信息 */
        _this.selfContainer.visible = false;
        _this.oppContainer.visible = false;
        EventManager.subscribe("GameScene/ShowPlayerMsg", function () {
            self.showPlayer();
        });
        EventManager.subscribe("GameScene/SetPlayerName", function (pType, name) {
            self.setPlayerName(pType, name);
        });
        return _this;
    }
    PlayerInfo.prototype.setPlayerName = function (pType, name) {
        var currentPlayer = pType == "self" ? this.selfName : this.oppName;
        currentPlayer.text = name;
    };
    PlayerInfo.prototype.showPlayer = function () {
        this.selfContainer.visible = true;
        this.oppContainer.visible = true;
        this.selfContainer.alpha = 0;
        this.oppContainer.alpha = 0;
        egret.Tween.get(this.selfContainer).to({ alpha: 1 }, 1000, egret.Ease.backIn);
        egret.Tween.get(this.oppContainer).to({ alpha: 1 }, 1000, egret.Ease.backIn);
    };
    /**
     * 用户信息
     * position 位置对象
     */
    PlayerInfo.prototype.createTextField = function (txt, position) {
        var txtField = new egret.TextField();
        txtField.textColor = 0;
        txtField.text = txt;
        txtField.x = position["x"];
        txtField.y = position["y"];
        txtField.size = 24;
        return txtField;
    };
    /**
     * 用户信息 棋子
     * name 资源; position 位置对象
     */
    PlayerInfo.prototype.createUserChess = function (name, position) {
        var userChess = GosCommon.createBitmapByName("chess_black_big_png");
        userChess.x = position["x"];
        userChess.y = position["y"];
        return userChess;
    };
    return PlayerInfo;
}(egret.DisplayObjectContainer));
__reflect(PlayerInfo.prototype, "PlayerInfo");
//# sourceMappingURL=PlayerInfo.js.map