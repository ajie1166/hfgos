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
        var jieShu = GosCommon.createBitmapByNameAndPosition("btn_end_black_png", { x: (stageW - 594) / 2 - 55, y: (stageH - 594) / 2 - 20 - 64 });
        _this.btnJieShu = jieShu;
        jieShu.touchEnabled = true;
        menuY = jieShu.y;
        jieShu.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            //认输
            if (oGameData["chessAvailable"] == 1) {
                oGameData["chessAvailable"] = 0;
                EventManager.publish("ChessBoard/setAvail", false);
                EventManager.publish("GameScene/Resign");
            }
        }, self);
        _this.addChild(jieShu);
        //停一手
        var tingYiShou = GosCommon.createBitmapByNameAndPosition("btn_stop_black_png", { x: jieShu.x + 40 + jieShu.width, y: menuY });
        _this.btnTingYiShou = tingYiShou;
        tingYiShou.touchEnabled = true;
        tingYiShou.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            //alert(oGameData["selfChessType"]);
            //alert(oGameData["chessAvailable"]);
            if (oGameData["chessAvailable"] == 1) {
                oGameData["chessAvailable"] = 0;
                EventManager.publish("ChessBoard/setAvail", false);
                var content = oGameData["selfChessType"] == 0 ? "play black pass" : "play white pass";
                //EventManager.publish("ChessBoard/setChessBook", oGameData["selfChessType"], -1, -1);
                EventManager.publish('ChessBoard/setGos', oGameData["selfChessType"], -1, -1, 0);
            }
        }, self);
        _this.addChild(tingYiShou);
        //点目
        var dianMu = GosCommon.createBitmapByNameAndPosition("btn_dianbu_black_png", { x: tingYiShou.x + 40 + tingYiShou.width, y: menuY });
        _this.btnDianMu = dianMu;
        dianMu.touchEnabled = true;
        dianMu.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (oGameData["chessAvailable"] == 1) {
                oGameData["chessAvailable"] = 0;
                EventManager.publish("ChessBoard/setAvail", false);
                EventManager.publish("GameScene/showAlert", "确定要申请点目?", 0);
            }
        }, self);
        _this.addChild(dianMu);
        EventManager.subscribe("GameScene/confirmDianMu", function () {
            if (oGameData["steps"] > 180) {
                oGameData["chessAvailable"] == 0;
                EventManager.publish("ChessBoard/setAvail", false);
                EventManager.publish("GameScene/applyCounting");
            }
            else {
                oGameData["chessAvailable"] == 1;
                EventManager.publish("ChessBoard/setAvail", true);
                EventManager.publish("ChessBoard/showMask", "180手后才能申请点目", true);
            }
        });
        //标记
        var biaoJi = GosCommon.createBitmapByNameAndPosition("btn_biaoji_black_png", { x: dianMu.x + 40 + dianMu.width, y: menuY });
        _this.btnBiaoji = biaoJi;
        biaoJi.touchEnabled = true;
        biaoJi.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            EventManager.publish("ChessBoard/setNums");
        }, self);
        _this.addChild(biaoJi);
        //形式
        /*  let xingShi = GosCommon.createBitmapByNameAndPosition("btn_xingshi_black_png", { x: biaoJi.x + 10 + biaoJi.width, y: menuY });
          this.btnXingShi = xingShi;
          xingShi.touchEnabled = true;
          xingShi.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
              //alert("按钮:形式");
          }, self);
          this.addChild(xingShi);*/
        var luozi = new Button(GosCommon.createBitmapByName("luozi_png").texture);
        luozi.x = 280;
        luozi.y = 630;
        _this.luozi = luozi;
        luozi.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            //先预走子
            //EventManager.publish('ChessBoard/setGos', undefined, undefined, undefined, 0);
            EventManager.publish('ChessBoard/preSetGos', undefined, undefined, undefined, 0);
        }, _this);
        _this.addChild(_this.luozi);
        //self.visible = false;
        _this.luozi.visible = false;
        //结束游戏
        EventManager.subscribe("GameScene/endGame", function () {
        });
        EventManager.subscribe("GameScene/hideGameMenu", function () {
            self.hideGameMenu();
        });
        EventManager.subscribe("GameScene/showGameMenu", function (data) {
            self.showGameMenu(data);
        });
        /**
         * 显示 确认落子 按钮
         */
        EventManager.subscribe("GameScene/showLuoZi", function () {
            self.showLuoZi();
        });
        /**
         * 隐藏 确认落子 按钮
         */
        EventManager.subscribe("GameScene/hideConfirmLuoZi", function () {
            self.hideLuoZi();
        });
        return _this;
    }
    GameMenu.prototype.hideLuoZi = function () {
        this.luozi.visible = false;
    };
    GameMenu.prototype.showLuoZi = function () {
        this.luozi.visible = true;
    };
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
        // this.luozi.visible = false;
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