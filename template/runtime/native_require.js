
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/res/res.js",
	"libs/modules/experimental/experimental.js",
	"libs/modules/tween/tween.js",
	"libs/modules/socket/socket.js",
	"libs/modules/dragonBones/dragonBones.js",
	"libs/modules/egret3d/egret3d.js",
	"libs/resources/jquery-3.2.1.min.js",
	"libs/common/md5.min.js",
	"libs/common/fingerprint.js",
	"libs/common/utility.js",
	"libs/net/TSDT.js",
	"libs/net/TSDTController.js",
	"libs/EventManager/EventManager.js",
	"polyfill/promise.js",
	"libs/net/connection.js",
	"libs/common/login.js",
	"libs/ChessController/ChessController.js",
	"libs/net/NetController.js",
	"libs/load/loader.js",
	"bin-debug/AppStart/GameScene.js",
	"bin-debug/common/GosCommon.js",
	"bin-debug/component/Button.js",
	"bin-debug/component/ChessBoard.js",
	"bin-debug/component/GameMenu.js",
	"bin-debug/component/GameSetting.js",
	"bin-debug/component/PlayerInfo.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/Views/MatchingScene.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 1920,
		contentHeight: 1080,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};