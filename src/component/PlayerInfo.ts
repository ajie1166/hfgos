// TypeScript file
/**
 * by lijie
 */
class PlayerInfo extends egret.DisplayObjectContainer {

    private playerBgGap: number = 50;


    //自己和对手姓名
    private selfName: egret.TextField;
    private oppName: egret.TextField;

    //姓名旁边的的棋子
    private selfUserNameChess: egret.Bitmap;
    private oppUserNameChess: egret.Bitmap;

    //剩余时间
    private selfRemainTime: egret.TextField;
    private oppRemainTime: egret.TextField;

    //多少手 文本
    private selfHands: egret.TextField;
    private oppHands: egret.TextField;

    //手数
    private selfNums: number = 0;
    private oppNums: number = 0;

    private stepNums: number = 0;

    //多少手旁边的棋子
    private selfHandsChess: egret.Bitmap;
    private oppHandsChess: egret.Bitmap;

    //背景容器
    private selfContainer: egret.Sprite;
    private oppContainer: egret.Sprite;

    private playerHeader: egret.Bitmap;
    constructor() {
        super();
        let self = this;
        let stage: egret.Stage = egret.MainContext.instance.stage;
        let stageW = stage.stageWidth;
        let stageH = stage.stageHeight;

        /* 开始 绘制自己的玩家信息 */
        let selfContainer = new egret.Sprite();
        //加载玩家背景
        let selfBg = GosCommon.createBitmapByNameAndPosition("playerbg_png", { x: (stageW - 594) / 2 - 490 - this.playerBgGap, y: (stageH - 594) / 2 + (594 - 160) / 2 });
        selfContainer.addChild(selfBg);;

        //玩家头像
        let playerHead = GosCommon.createBitmapByNameAndPosition("touxiang_png", { x: selfBg.x + 30, y: (selfBg.height - 100) / 2 + selfBg.y });
        selfContainer.addChild(playerHead);

        let selfNameChess = this.createUserChess("unknown_png", { x: playerHead.x + playerHead.width + 10, y: selfBg.y + 40 })
        this.selfUserNameChess = selfNameChess;
        selfContainer.addChild(this.selfUserNameChess);

        let selfHandsChess = this.createUserChess("unknown_png", { x: playerHead.x + playerHead.width + 270, y: selfBg.y + 40 })
        this.selfHandsChess = selfHandsChess;
        selfContainer.addChild(this.selfHandsChess);

        //自己的名字
        let selfTempName = localStorage.getItem("nick_name");
        selfTempName = GosCommon.subString(selfTempName, 10);
        let userName: egret.TextField = this.createTextField(selfTempName, { x: playerHead.x + playerHead.width + 70, y: selfBg.y + 45 })
       // userName.fontFamily = "宋体";
       // userName.bold = true;
        this.selfName = userName;
        selfContainer.addChild(userName);

        let remaindTime: egret.TextField = this.createTextField("03:00:00", { x: playerHead.x + playerHead.width + 70, y: selfBg.y + 45 + 40 });
        this.selfRemainTime = remaindTime;
        selfContainer.addChild(this.selfRemainTime);

        //`第${this.selfNums}手`
        let selfHands: egret.TextField = this.createTextField(`第${this.selfNums}手`, { x: playerHead.x + playerHead.width + 250, y: selfBg.y + 45 + 40 });
        this.selfHands = selfHands;
        selfContainer.addChild(this.selfHands);


        this.selfContainer = selfContainer;

        this.addChild(this.selfContainer);
        /* 结束 绘制自己的玩家信息 */


        /* 开始 绘制对手的玩家信息 */
        let oppContainer = new egret.Sprite();
        //加载玩家背景
        let oppBg = GosCommon.createBitmapByNameAndPosition("playerbg_png", { x: (stageW - 594) / 2 + this.playerBgGap + 594, y: (stageH - 594) / 2 + (594 - 160) / 2 });
        oppContainer.addChild(oppBg);;

        //玩家头像
        let oppPlayerHead = GosCommon.createBitmapByNameAndPosition("touxiang_png", { x: oppBg.x + 30, y: (oppBg.height - 100) / 2 + oppBg.y });
        oppContainer.addChild(oppPlayerHead);

        let oppNameChess = this.createUserChess("unknown_png", { x: oppPlayerHead.x + oppPlayerHead.width + 10, y: oppBg.y + 40 })
        this.oppUserNameChess = oppNameChess;
        oppContainer.addChild(this.oppUserNameChess);

        let oppHandsChess = this.createUserChess("unknown_png", { x: oppPlayerHead.x + oppPlayerHead.width + 270, y: selfBg.y + 40 })
        this.oppHandsChess = oppHandsChess;
        oppContainer.addChild(this.oppHandsChess);


        let oppUserName: egret.TextField = this.createTextField("jsnylee", { x: oppPlayerHead.x + oppPlayerHead.width + 70, y: oppBg.y + 45 })
        this.oppName = oppUserName;
        oppContainer.addChild(oppUserName);

        let oppRemaindTime: egret.TextField = this.createTextField("03:00:00", { x: oppPlayerHead.x + oppPlayerHead.width + 70, y: oppBg.y + 45 + 40 });
        this.oppRemainTime = oppRemaindTime;
        oppContainer.addChild(this.oppRemainTime);

        let oppHands: egret.TextField = this.createTextField(`第${this.oppNums}手`, { x: oppPlayerHead.x + oppPlayerHead.width + 250, y: oppBg.y + 45 + 40 });
        this.oppHands = oppHands;
        oppContainer.addChild(this.oppHands);


        this.oppContainer = oppContainer;
        this.addChild(this.oppContainer);
        /* 结束 绘制对手的玩家信息 */

        //this.selfContainer.visible = false;
        this.oppContainer.visible = false;
        EventManager.subscribe("GameScene/ShowPlayerMsg", function (data) {
            self.showOppPlayer(data);
        });

        /*EventManager.subscribe("GameScene/showSelfName", function (nickName) {
            self.setSelfName(nickName);
        });*/

        /*  EventManager.subscribe("GameScene/SetPlayerName", function (pType, name) {
              self.setPlayerName(pType, name);
          });*/

        EventManager.subscribe("GameScene/setPlayerChess", function (chessType) {
            self.updatePlayerChess(chessType);
        });

        EventManager.subscribe("GameScene/stepSelfPlus", function () {
            self.setSelfNums();
        });
        EventManager.subscribe("GameScene/stepOppPlus", function () {
            self.setOppNums();
        });
    }
    private setSelfName(nickName) {
        //this.selfName = nickName;
        // alert(nickName);
    }

    /**
     * 自己 每下一步棋 步数加1
     */
    private setSelfNums() {
        this.stepNums++;
        this.selfHands.text = `第${this.stepNums}手`;
    }
    /**
        * 对手 每下一步棋 步数加1
        */
    private setOppNums() {
        this.stepNums++;
        this.oppHands.text = `第${this.stepNums}手`;
    }


    private setPlayerName(pType, name) {
        let currentPlayer = pType == "self" ? this.selfName : this.oppName;
        currentPlayer.text = name;

    }
    /**
     * 更新对手显示  同时更新自己的棋子
     */
    private showOppPlayer(playerInfo) {
        this.oppContainer.visible = true;
        this.oppContainer.alpha = 0;
        this.setPlayerName("opp", GosCommon.subString(playerInfo.nickname, 10));
        egret.Tween.get(this.oppContainer).to({ alpha: 1 }, 1000, egret.Ease.backIn);
        EventManager.publish("GameScene/setPlayerChess", playerInfo.colorType);
    }

    /**
     * 更新棋子 服务端返回 棋子类型后更新自己和对手棋子颜色
     */
    private updatePlayerChess(chessType: number) {
        if (chessType != 2) {
            let selfChessType = chessType == 0 ? 1 : 0;
            let resOppName = chessType == 0 ? "chess_black_big_png" : "chess_white_big_png";
            let resSelfName = chessType == 0 ? "chess_white_big_png" : "chess_black_big_png";
            let resOppNameChess: egret.Texture = GosCommon.createBitmapByName(resOppName).texture;
            let resSelfNameChess: egret.Texture = GosCommon.createBitmapByName(resSelfName).texture;
            this.selfUserNameChess.texture = resSelfNameChess;
            this.selfHandsChess.texture = resSelfNameChess
            this.oppUserNameChess.texture = resOppNameChess;
            this.oppHandsChess.texture = resOppNameChess;
            EventManager.publish("ChessBoard/setSelfChessType", selfChessType);
        }
    }

    /**
     * 用户信息 
     * position 位置对象
     */
    private createTextField(txt: string, position: any): egret.TextField {
        let txtField: egret.TextField = new egret.TextField();
        txtField.textColor = 0;
        txtField.text = txt;
        txtField.x = position["x"];
        txtField.y = position["y"];
        txtField.size = 24;
        return txtField;
    }

    /**
     * 用户信息 棋子
     * name 资源; position 位置对象
     */
    private createUserChess(name: string, position: any): egret.Bitmap {
        let userChess: egret.Bitmap = GosCommon.createBitmapByName(name);
        userChess.x = position["x"];
        userChess.y = position["y"];
        return userChess;
    }
}