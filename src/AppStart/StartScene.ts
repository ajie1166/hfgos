
class StartScene extends egret.DisplayObjectContainer {
	public constructor() {
		super();
	}
	public initGameScene(container: egret.DisplayObjectContainer, ...data): void {
		//背景
		let sky = GosCommon.createBitmapByName("yzbg");
		container.addChild(sky);
		let stageW = data[0];
		let stageH = data[1];
		container.stage.scaleMode = egret.StageScaleMode.EXACT_FIT;//去边框并保持图片缩放完整
		sky.width = stageW;
		sky.height = stageH;

		//加载棋盘
		let qipan = GosCommon.createBitmapByNameAndPosition("qipan_png", { x: (stageW - 594) / 2, y: (stageH - 594) / 2 });
		container.addChild(qipan);

		//加载玩家背景
		let playerBg = GosCommon.createBitmapByNameAndPosition("playerbg_png", { x: (stageW - qipan.width) / 2 - 490 - data[2], y: qipan.y + (qipan.height - 160) / 2 });
		container.addChild(playerBg);

		//玩家头像
		let playerHead = GosCommon.createBitmapByNameAndPosition("touxiang_png", { x: playerBg.x + 30, y: (playerBg.height - 100) / 2 + playerBg.y });
		container.addChild(playerHead);

		//名称 请求服务端获取我的信息 0 黑  1 白
		let playChessRandom: number[] = [0, 1];
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
		container.addChild(playerChessOne);


		let pipeiBtn = GosCommon.createBitmapByNameAndPosition("btn_start_pipei_black_png", { x: qipan.x + (qipan.width - 336) / 2, y: qipan.y + (qipan.height - 110) / 2 })
		pipeiBtn.touchEnabled = true;
		pipeiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
			//alert("开始匹配");
			container.removeChild(pipeiBtn);
		}, pipeiBtn);
		container.addChild(pipeiBtn);
	}
}