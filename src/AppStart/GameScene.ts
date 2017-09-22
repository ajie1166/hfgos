
class GameScene extends egret.DisplayObjectContainer {
	private playerBgGap: number = 50;//选手背景距离棋盘的宽度
	public constructor() {
		super();
		this.initGameScene();
	}
	private initGameScene(): void {

		//背景
		let sky = GosCommon.createBitmapByName("yzbg");
		let stage = egret.MainContext.instance.stage;

		this.addChild(sky);
		let stageW = stage.stageWidth;
		let stageH = stage.stageHeight;
		//this.stage.scaleMode = egret.StageScaleMode.EXACT_FIT;//去边框并保持图片缩放完整
		sky.width = stageW;
		sky.height = stageH;

		let chessBoard = new ChessBoard();
		this.addChild(chessBoard);

		let playerInfo = new PlayerInfo();
		this.addChild(playerInfo);

		let gameMenu = new GameMenu();
		this.addChild(gameMenu);

		

		//名称 请求服务端获取我的信息 0 黑  1 白
		/*let playChessRandom: number[] = [0, 1];
		let randomChess: number = Math.floor(Math.random() * 2);
		let playerChessOne: egret.Bitmap;
		let chessPosition = { x: playerHead.x + 100 + 20, y: playerHead.y + 15 };
		let chess = "";
		if (randomChess == 0) {
			chess = "chess_black_big_png";
		} else {
			chess = "chess_white_big_png";
		}
		//playerChessOne = GosCommon.createBitmapByNameAndPosition(chess, chessPosition);
		playerChessOne = GosCommon.createBitmapByName(chess);
		egret.Tween.get(playerChessOne).to(chessPosition, 3000, egret.Ease.sineIn);
		this.addChild(playerChessOne);*/



	}
}