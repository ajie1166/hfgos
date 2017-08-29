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

    //多少手
    private selfHands: egret.TextField;
    private oppHands: egret.TextField;

    //多少手旁边的棋子
    private selfHandsChess: egret.Bitmap;
    private oppHandsChess: egret.Bitmap;

    //背景容器
    private selfContainer: egret.Sprite;
    private oppContainer: egret.Sprite;

    private playerHeader: egret.Bitmap;
    constructor() {
        super();
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

        let selfNameChess = this.createUserChess("chess_black_big_png", { x: playerHead.x + playerHead.width + 10, y: selfBg.y + 40 })
        selfContainer.addChild(selfNameChess);

        let selfHandsChess = this.createUserChess("chess_black_big_png", { x: playerHead.x + playerHead.width + 270, y: selfBg.y + 40 })
        selfContainer.addChild(selfHandsChess);


        let userName: egret.TextField = this.createTextField("jovenlee", { x: playerHead.x + playerHead.width + 70, y: selfBg.y + 45 })
        this.selfName = userName;
        selfContainer.addChild(userName);

        let remaindTime: egret.TextField = this.createTextField("00:00:00", { x: playerHead.x + playerHead.width + 70, y: selfBg.y + 45 + 40 });
        selfContainer.addChild(remaindTime);

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

        let oppNameChess = this.createUserChess("chess_black_big_png", { x: oppPlayerHead.x + oppPlayerHead.width + 10, y: oppBg.y + 40 })
        oppContainer.addChild(oppNameChess);

        let oppHandsChess = this.createUserChess("chess_black_big_png", { x: oppPlayerHead.x + oppPlayerHead.width + 270, y: selfBg.y + 40 })
        oppContainer.addChild(oppHandsChess);



        let oppUserName: egret.TextField = this.createTextField("jsnylee", { x: oppPlayerHead.x + oppPlayerHead.width + 70, y: oppBg.y + 45 })
        this.oppName = oppUserName;
        oppContainer.addChild(oppUserName);

        let oppRemaindTime: egret.TextField = this.createTextField("00:00:00", { x: oppPlayerHead.x + oppPlayerHead.width + 70, y: oppBg.y + 45 + 40 });
        oppContainer.addChild(oppRemaindTime);

        this.oppContainer = oppContainer;
        this.addChild(this.oppContainer);
        /* 结束 绘制对手的玩家信息 */


        

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
        let userChess: egret.Bitmap = GosCommon.createBitmapByName("chess_black_big_png");
        userChess.x = position["x"];
        userChess.y = position["y"];
        return userChess;
    }
}