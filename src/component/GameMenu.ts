// TypeScript file
/**
 * by lijie  游戏菜单
 */
class GameMenu extends egret.DisplayObjectContainer {
    private btnJieShu: egret.Bitmap;
    private btnTingYiShou: egret.Bitmap;
    private btnDianMu: egret.Bitmap;
    private btnBiaoji: egret.Bitmap;
    private btnXingShi: egret.Bitmap;

    private luozi: Button;
    constructor() {
        super();
        let self = this;
        let stage = egret.MainContext.instance.stage;
        let stageW = stage.stageWidth;
        let stageH = stage.stageHeight;

        let menuY: number;
        //结束
        let jieShu = GosCommon.createBitmapByNameAndPosition("btn_end_black_png", { x: (stageW - 594) / 2 - 55, y: (stageH - 594) / 2 - 20 - 64 });
        this.btnJieShu = jieShu;
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
        this.addChild(jieShu);

        //停一手
        let tingYiShou = GosCommon.createBitmapByNameAndPosition("btn_stop_black_png", { x: jieShu.x + 40 + jieShu.width, y: menuY });
        this.btnTingYiShou = tingYiShou;
        tingYiShou.touchEnabled = true;
        tingYiShou.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            //alert(oGameData["selfChessType"]);
            //alert(oGameData["chessAvailable"]);
            if (oGameData["chessAvailable"] == 1) {
                oGameData["chessAvailable"] = 0;
                EventManager.publish("ChessBoard/setAvail", false);
                let content = oGameData["selfChessType"] == 0 ? "play black pass" : "play white pass";
                //EventManager.publish("ChessBoard/setChessBook", oGameData["selfChessType"], -1, -1);
                EventManager.publish('ChessBoard/setGos', oGameData["selfChessType"], -1, -1, 0);
            }
        }, self);
        this.addChild(tingYiShou);

        //点目
        let dianMu = GosCommon.createBitmapByNameAndPosition("btn_dianbu_black_png", { x: tingYiShou.x + 40 + tingYiShou.width, y: menuY });
        this.btnDianMu = dianMu;
        dianMu.touchEnabled = true;
        dianMu.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (oGameData["chessAvailable"] == 1) {
                oGameData["chessAvailable"] = 0;
                EventManager.publish("ChessBoard/setAvail", false);
                EventManager.publish("GameScene/showAlert", "确定要申请点目?", 0);
            }
        }, self);
        this.addChild(dianMu);

        EventManager.subscribe("GameScene/confirmDianMu", function () {
            if (oGameData["steps"] > 120) {
                oGameData["chessAvailable"] == 0;
                EventManager.publish("ChessBoard/setAvail", false);
                EventManager.publish("GameScene/applyCounting");
            } else {
                oGameData["chessAvailable"] == 1;
                EventManager.publish("ChessBoard/setAvail", true);
                EventManager.publish("ChessBoard/showMask", "120手后才能申请点目", true);
            }
        });

        //标记
        let biaoJi = GosCommon.createBitmapByNameAndPosition("btn_biaoji_black_png", { x: dianMu.x + 40 + dianMu.width, y: menuY });
        this.btnBiaoji = biaoJi;
        biaoJi.touchEnabled = true;
        biaoJi.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            EventManager.publish("ChessBoard/setNums");
        }, self);
        this.addChild(biaoJi);

        //形式
        /*  let xingShi = GosCommon.createBitmapByNameAndPosition("btn_xingshi_black_png", { x: biaoJi.x + 10 + biaoJi.width, y: menuY });
          this.btnXingShi = xingShi;
          xingShi.touchEnabled = true;
          xingShi.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
              //alert("按钮:形式");
          }, self);
          this.addChild(xingShi);*/

        let luozi = new Button(GosCommon.createBitmapByName("luozi_png").texture);
        luozi.x = 280;
        luozi.y = 630;
        this.luozi = luozi;
        luozi.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            //先预走子
            //EventManager.publish('ChessBoard/setGos', undefined, undefined, undefined, 0);
            EventManager.publish('ChessBoard/preSetGos', undefined, undefined, undefined, 0);
        }, this);
        this.addChild(this.luozi);

        //self.visible = false;
        this.luozi.visible = false;

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
        })

        /**
         * 隐藏 确认落子 按钮
         */
        EventManager.subscribe("GameScene/hideConfirmLuoZi", function () {
            self.hideLuoZi();
        })
    }


    private hideLuoZi() {
        this.luozi.visible = false;
    }
    private showLuoZi() {
        this.luozi.visible = true;
    }
    private hideGameMenu() {
        this.visible = false;
        /* this.btnJieShu.visible = false;
         this.btnTingYiShou.visible = false;
         this.btnDianMu.visible = false;
         this.btnBiaoji.visible = false;
         this.btnXingShi.visible = false;*/
    }
    private showGameMenu(data) {
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
    }
}