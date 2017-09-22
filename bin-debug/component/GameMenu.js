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
 * by lijie  游戏菜单
 */
var GameMenu = (function (_super) {
    __extends(GameMenu, _super);
    function GameMenu() {
        var _this = _super.call(this) || this;
        var self = _this;
        var stage = egret.MainContext.instance.stage;
        var stageW = stage.stageWidth;
        var stageH = stage.stageHeight;
        var menuY;
        //结束
        var jieShu = GosCommon.createBitmapByNameAndPosition("btn_end_black_png", { x: (stageW - 594) / 2 - 80, y: (stageH - 594) / 2 - 20 - 64 });
        _this.btnJieShu = jieShu;
        jieShu.touchEnabled = true;
        menuY = jieShu.y;
        jieShu.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            // alert("按钮:结束游戏");
            alert("x:" + jieShu.x);
            alert(jieShu.anchorOffsetY);
            jieShu.anchorOffsetY = 50;
        }, self);
        _this.addChild(jieShu);
        //停一手
        var tingYiShou = GosCommon.createBitmapByNameAndPosition("btn_stop_black_png", { x: jieShu.x + 10 + jieShu.width, y: menuY });
        _this.btnTingYiShou = tingYiShou;
        tingYiShou.touchEnabled = true;
        tingYiShou.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            //alert("按钮:停一手");
        }, self);
        _this.addChild(tingYiShou);
        //点目
        var dianMu = GosCommon.createBitmapByNameAndPosition("btn_dianbu_black_png", { x: tingYiShou.x + 10 + tingYiShou.width, y: menuY });
        _this.btnDianMu = dianMu;
        dianMu.touchEnabled = true;
        dianMu.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            EventManager.publish("testLocalStoage");
            //alert("按钮:点目");
        }, self);
        _this.addChild(dianMu);
        //标记
        var biaoJi = GosCommon.createBitmapByNameAndPosition("btn_biaoji_black_png", { x: dianMu.x + 10 + dianMu.width, y: menuY });
        _this.btnBiaoji = biaoJi;
        biaoJi.touchEnabled = true;
        biaoJi.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            //alert("按钮:标记");
        }, self);
        _this.addChild(biaoJi);
        //形式
        var xingShi = GosCommon.createBitmapByNameAndPosition("btn_xingshi_black_png", { x: biaoJi.x + 10 + biaoJi.width, y: menuY });
        _this.btnXingShi = xingShi;
        xingShi.touchEnabled = true;
        xingShi.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            //alert("按钮:形式");
        }, self);
        _this.addChild(xingShi);
        self.visible = false;
        //结束游戏
        EventManager.subscribe("GameScene/endGame", function () {
        });
        EventManager.subscribe("GameScene/hideGameMenu", function () {
            self.hideGameMenu();
        });
        EventManager.subscribe("GameScene/showGameMenu", function (data) {
            self.showGameMenu(data);
        });
        return _this;
    }
    GameMenu.prototype.hideGameMenu = function () {
        this.visible = false;
        /* this.btnJieShu.visible = false;
         this.btnTingYiShou.visible = false;
         this.btnDianMu.visible = false;
         this.btnBiaoji.visible = false;
         this.btnXingShi.visible = false;*/
    };
    GameMenu.prototype.showGameMenu = function (data) {
        //self.visible=true;
        this.visible = true;
        this.alpha = 0;
        egret.Tween.get(this).to({ alpha: 1 }, 1000, egret.Ease.backIn);
        /* this.btnJieShu.visible = true;
         this.btnTingYiShou.visible = true;
         this.btnDianMu.visible = true;
         this.btnBiaoji.visible = true;
         this.btnXingShi.visible = true;*/
        //alert(data);
    };
    return GameMenu;
}(egret.DisplayObjectContainer));
__reflect(GameMenu.prototype, "GameMenu");
//# sourceMappingURL=GameMenu.js.map