// TypeScript file
/**
 * by lijie
 */
class MatchingScene extends egret.DisplayObjectContainer {
    private MATCHING_TIME = 20;
    private btnPiPei: egret.Bitmap;

    private btnMatching: egret.Bitmap;
    private btnCancelMatching: egret.Bitmap;

    /**
     * 匹配倒计时数
     */
    private timerText: egret.TextField;

    private isNewTimer: boolean = true;

    private isMatchSuccess: boolean = false;


    /**
     * 秒数
     */
    private second: number = 60;

    /**
     * 匹配计时器 一分钟
     */
    private matchingTimer: egret.Timer;

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

        this.timerText = GosCommon.createTextField(`${this.second}`, 0xffffff, 40, { x: (stageW - 594) / 2 + (594 - 336) / 2 + 260, y: (stageH - 594) / 2 + (594 - 110) / 2 + 35 })
        this.addChild(this.timerText);

        this.timerText.visible = false;

        EventManager.subscribe("MatchingScene/btnMatchingStart", function () {
            self.startMatching();
        });
        EventManager.subscribe("MatchingScene/btnCancelMatching", function () {
            self.cancelMatching();
        });

        EventManager.subscribe("MatchingScene/MatchSuccess", function (data) {
            self.matchSuccess(data);
        })

        EventManager.subscribe("MatchingScene/endMatching", function () {
            self.endMatching();
        })

        EventManager.subscribe("MatchingScene/matchingTimer", function () {
            // alert(2);
            self.initPiPeiTimer();
            self.startTimer();
        })

      

        this.initPiPeiTimer();
    }

   
    private startTimer(): void {
        this.timerText.visible = true;
        this.matchingTimer.start();
    }
    private initPiPeiTimer(): void {
        // alert(1);
        this.matchingTimer = new egret.Timer(1000, 60);
        this.matchingTimer.addEventListener(egret.TimerEvent.TIMER, this.setSecond, this);
        this.matchingTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.endMatching, this);
    }

    private endMatching() {
        // this.matchingTimer.stop();
        this.cancelMatching();
    }

    /**
     * 倒计时
     */
    private setSecond(evt: egret.TimerEvent): void {
        if (!this.isNewTimer) {

        }
        // alert(this.timerText.text);
        this.second = Number(this.timerText.text);
        if (this.second > 0) {
            this.second--;
            //alert(this.second);
        }
        //this.timerText = new egret.TextField();
        this.timerText.text = this.second < 10 ? `0${this.second}` : `${this.second}`;
    }

    private startMatching(): void {
        this.btnPiPei.visible = false;
        this.btnMatching.visible = true;
        this.btnCancelMatching.visible = true;
        //一分钟倒计时 一分钟匹配不到重新匹配   匹配有可能突然成功需要后期处理

        //EventManager.publish("MatchingScene/btnStartMatching");
        EventManager.publish("MatchingScene/onBtnReadyStart");

        //启动一分钟倒计时
        EventManager.publish("MatchingScene/matchingTimer");
    }

    private matchSuccess(oppPlayer) {
        this.isMatchSuccess = true;
        this.btnPiPei.visible = false;
        this.btnMatching.visible = false;
        this.btnCancelMatching.visible = false;
        egret.Tween.get(this.btnMatching).to({ visible: false }, 1000, egret.Ease.backIn);
        egret.Tween.get(this.btnCancelMatching).to({ visible: false }, 1000, egret.Ease.backIn);
        EventManager.publish("GameScene/ShowPlayerMsg", oppPlayer);
        EventManager.publish("GameScene/showGameMenu", "lijie");
        EventManager.publish("MatchingScene/endMatching");
    }
    private cancelMatching(): void {

        if (!this.isMatchSuccess) {
            this.btnPiPei.visible = true;
        }
        this.btnMatching.visible = false;
        this.btnCancelMatching.visible = false;

        this.matchingTimer.stop();

        this.timerText.text = "60";
        this.timerText.visible = false;
        //alert(this.matchingTimer);
    }
}