// TypeScript file
/**
 * by lijie
 */
class MatchingScene extends egret.DisplayObjectContainer {
    private MATCHING_TIME = 20;
    private btnPiPei: egret.Bitmap;

    private btnMatching: egret.Bitmap;
    private btnCancelMatching: egret.Bitmap;

    public constructor() {
        super();
        let self = this;
        var stage: egret.Stage = egret.MainContext.instance.stage;
        var stageW = stage.stageWidth;
        var stageH = stage.stageHeight;

        this.btnPiPei = GosCommon.createBitmapByNameAndPosition("btn_start_pipei_black_png", { x: (stageW - 594) / 2 + (594 - 336) / 2, y: (stageH - 594) / 2 + (594 - 110) / 2 });
        this.btnPiPei.touchEnabled = true;
        this.btnPiPei.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            EventManager.publish("MatchingScene/btnMatchingStart");
        }, this);
        this.addChild(this.btnPiPei);

        this.btnMatching = GosCommon.createBitmapByNameAndPosition("btn_pipei_black_png", { x: (stageW - 594) / 2 + (594 - 336) / 2, y: (stageH - 594) / 2 + (594 - 110) / 2 });
        this.btnMatching.visible = false;
        this.addChild(this.btnMatching);

        this.btnCancelMatching = GosCommon.createBitmapByNameAndPosition("btn_cancel_pipei_png", { x: (stageW - 594) / 2 + (594 - 180) / 2, y: (stageH - 594) / 2 + (594 - 110) / 2 + 110 });
        this.btnCancelMatching.visible = false;
        this.btnCancelMatching.touchEnabled = true;
        this.btnCancelMatching.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            EventManager.publish("MatchingScene/btnCancelMatching");
        }, this)
        this.addChild(this.btnCancelMatching);

        EventManager.subscribe("MatchingScene/btnMatchingStart", function () {
            self.startMatching();
        });
        EventManager.subscribe("MatchingScene/btnCancelMatching", function () {
            self.cancelMatching();
        });

        EventManager.subscribe("MatchingScene/MatchSuccess", function (data) {
            self.matchSuccess(data);
        })
    }

    private startMatching(): void {

        this.btnPiPei.visible = false;
        this.btnMatching.visible = true;
        this.btnCancelMatching.visible = true;

        //一分钟倒计时 一分钟匹配不到重新匹配   匹配有可能突然成功需要后期处理

        //EventManager.publish("MatchingScene/btnStartMatching");
        EventManager.publish("MatchingScene/onBtnReadyStart");

    }

    private matchSuccess(oppPlayer) {
        this.btnPiPei.visible = false;
        this.btnMatching.visible = false;
        this.btnCancelMatching.visible = false;
        egret.Tween.get(this.btnMatching).to({ visible: false }, 1000, egret.Ease.backIn);
        egret.Tween.get(this.btnCancelMatching).to({ visible: false }, 1000, egret.Ease.backIn);
        EventManager.publish("GameScene/ShowPlayerMsg",oppPlayer);
        EventManager.publish("GameScene/showGameMenu", "lijie");
    }
    private cancelMatching(): void {
        this.btnPiPei.visible = true;
        this.btnMatching.visible = false;
        this.btnCancelMatching.visible = false;
    }
}