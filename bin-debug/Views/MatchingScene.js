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
var MatchingScene = (function (_super) {
    __extends(MatchingScene, _super);
    function MatchingScene() {
        var _this = _super.call(this) || this;
        _this.MATCHING_TIME = 20;
        var self = _this;
        var stage = egret.MainContext.instance.stage;
        var stageW = stage.stageWidth;
        var stageH = stage.stageHeight;
        _this.btnPiPei = GosCommon.createBitmapByNameAndPosition("btn_start_pipei_black_png", { x: (stageW - 594) / 2 + (594 - 336) / 2, y: (stageH - 594) / 2 + (594 - 110) / 2 });
        _this.btnPiPei.touchEnabled = true;
        _this.btnPiPei.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            EventManager.publish("MatchingScene/btnMatchingStart");
        }, _this);
        _this.addChild(_this.btnPiPei);
        _this.btnMatching = GosCommon.createBitmapByNameAndPosition("btn_pipei_black_png", { x: (stageW - 594) / 2 + (594 - 336) / 2, y: (stageH - 594) / 2 + (594 - 110) / 2 });
        _this.btnMatching.visible = false;
        _this.addChild(_this.btnMatching);
        _this.btnCancelMatching = GosCommon.createBitmapByNameAndPosition("btn_cancel_pipei_png", { x: (stageW - 594) / 2 + (594 - 180) / 2, y: (stageH - 594) / 2 + (594 - 110) / 2 + 110 });
        _this.btnCancelMatching.visible = false;
        _this.btnCancelMatching.touchEnabled = true;
        _this.btnCancelMatching.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            EventManager.publish("MatchingScene/btnCancelMatching");
        }, _this);
        _this.addChild(_this.btnCancelMatching);
        EventManager.subscribe("MatchingScene/btnMatchingStart", function () {
            self.startMatching();
        });
        EventManager.subscribe("MatchingScene/btnCancelMatching", function () {
            self.cancelMatching();
        });
        EventManager.subscribe("MatchingScene/MatchSuccess", function (data) {
            self.matchSuccess(data);
        });
        return _this;
    }
    MatchingScene.prototype.startMatching = function () {
        this.btnPiPei.visible = false;
        this.btnMatching.visible = true;
        this.btnCancelMatching.visible = true;
        //一分钟倒计时 一分钟匹配不到重新匹配   匹配有可能突然成功需要后期处理
        //EventManager.publish("MatchingScene/btnStartMatching");
        EventManager.publish("MatchingScene/onBtnReadyStart");
    };
    MatchingScene.prototype.matchSuccess = function (oppPlayer) {
        this.btnPiPei.visible = false;
        this.btnMatching.visible = false;
        this.btnCancelMatching.visible = false;
        egret.Tween.get(this.btnMatching).to({ visible: false }, 1000, egret.Ease.backIn);
        egret.Tween.get(this.btnCancelMatching).to({ visible: false }, 1000, egret.Ease.backIn);
        EventManager.publish("GameScene/ShowPlayerMsg", oppPlayer);
        EventManager.publish("GameScene/showGameMenu", "lijie");
    };
    MatchingScene.prototype.cancelMatching = function () {
        this.btnPiPei.visible = true;
        this.btnMatching.visible = false;
        this.btnCancelMatching.visible = false;
    };
    return MatchingScene;
}(egret.DisplayObjectContainer));
__reflect(MatchingScene.prototype, "MatchingScene");
//# sourceMappingURL=MatchingScene.js.map