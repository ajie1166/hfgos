var lastChessBook = new Array(19);
//辅助类
var Utility = {
    getTimestamp: function () {
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000;
        return timestamp;
    },
    getRandomWord: function () {
        var words = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        var random = Math.round(Math.random() * 26);
        return words[random];
    },

    getRequestId: function () {
        var requestId = this.getTimestamp() + this.getRandomWord();
        return requestId;
    },
    /**
     * 根据数字获取对应的棋盘X  a-s
     */
    getNumx: function (w) {
        var x;
        var cbX = ["a", "b", "c", "d", "e", "f", "g", "h", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t"];
        for (var i = 0; i < cbX.length; i++) {
            if (cbX[i] == w) {
                x = i;
                break;
            }
        }
        return x;
    },
    /**
    * 根据数字获取对应的棋盘X  a-s   添加i
    */
    getNumxByWord: function (w) {
        var x;
        var cbX = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s"];
        for (var i = 0; i < cbX.length; i++) {
            if (cbX[i] == w) {
                x = i;
                break;
            }
        }
        return x;
    },
    /**
     * 根据字母获取对应的棋盘Y 1-19
     */
    getNumY: function (w) {
        return 19 - w;
        //alert(parseInt(w));
    },
    getWordByNum: function (num) {
        var cbX = ["a", "b", "c", "d", "e", "f", "g", "h", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t"];
        return cbX[num];
    },
    getUserAgent: function () {
        var userAgent = "";
        //平台内内核不支持最新语法糖
        // userAgent = `${navigator.appCodeName}/1.0.0 (${navigator.appName};${navigator.platform};${navigator.language};yizhan;` + this.getFingerPrint() + ";0)";
        var uuid = localStorage.getItem("uuid");
        if (uuid == "" || uuid == undefined) {
            uuid = this.getTimestamp() + this.getRandomWord();
            localStorage.setItem("uuid", uuid);
        }

        userAgent = navigator.appCodeName + "/1.0.0 (" + navigator.appName + ";" + navigator.platform + ";" + navigator.language + ";yizhan;" + uuid + ";0)"
        return userAgent;
    },
    /**
     * 帆布
     */
    getFingerPrint: function () {
        var fingerprint = new Fingerprint().get();
        //alert(fingerprint);
        return fingerprint;
    },
    /**
    * 实例化数组
    */
    initArr: function (arr) {
        for (var i = 0; i < 19; i++) {
            var arrj = new Array(19);
            for (var j = 0; j < 19; j++) {
                arrj[j] = 0;
            }
            arr[i] = arrj;
        }
        return arr;
    },
    initArrObject: function (arr) {
        for (var i = 0; i < 19; i++) {
            var arrj = new Array(19);
            for (var j = 0; j < 19; j++) {
                arrj[j] = 0;
            }
            arr[i] = arrj;
        }
        return arr;
    },
    /**
     * 获取当前棋谱
     */
    analyseCurrentChessBook: function (cb) {
        cb = cb.replace(/\n/g, "");
        var regW = new RegExp(/AW(.*)AB/);
        var resultW = regW.exec(cb);
        var chessWs = "";
        if (resultW != null) {
            chessWs = resultW[1].replace(/\]\[/g, ";").replace("[", "").replace("]", "");
        }
        var regB = new RegExp(/AB(.*)PL/);
        var resultB = regB.exec(cb);
        var chessBs = "";
        //console.log(resultB[1]);
        if (resultB != null) {
            chessBs = resultB[1].replace(/\]\[/g, ";").replace("[", "").replace("]", "");
        }

        var chessWs2 = "";
        if (chessWs == "" && chessBs == "") {
            var regW2 = new RegExp(/AW(.*)PL/);
            var resultW2 = regW2.exec(cb);
            if (resultW2 != null) {
                chessWs2 = resultW2[1].replace(/\]\[/g, ";").replace("[", "").replace("]", "");
            }
        }

        this.initArr(lastChessBook);
        // var tempChessBoard = new Array(19);
        // this.initArrObject(tempChessBoard);
        if (chessWs != "") {
            //console.log(chessWs);
            var chessArr = chessWs.split(";");
            for (var i = 0; i < chessArr.length; i++) {
                var x = this.getNumxByWord(chessArr[i].substring(0, 1));
                var y = this.getNumxByWord(chessArr[i].substring(1, 2));
                var chess = { x: x, y: y, color: 1 };
                lastChessBook[y][x] = chess;
                //lastChessBook[y][x] = "w";
            }
        }
        if (chessWs2 != "") {
            var chessArr = chessWs2.split(";");
            for (var i = 0; i < chessArr.length; i++) {
                var x = this.getNumxByWord(chessArr[i].substring(0, 1));
                var y = this.getNumxByWord(chessArr[i].substring(1, 2));
                var chess = { x: x, y: y, color: 1 };
                lastChessBook[y][x] = chess;
            }
        }
        if (chessBs != "") {
            //console.log(chessBs);
            var chessArr = chessBs.split(";");
            //console.log(chessArr);
            for (var i = 0; i < chessArr.length; i++) {
                var x = this.getNumxByWord(chessArr[i].substring(0, 1));
                var y = this.getNumxByWord(chessArr[i].substring(1, 2));
                var chess = { x: x, y: y, color: 0 };
                lastChessBook[y][x] = chess;
                //lastChessBook[y][x] = "b";
            }
        }

        //传递当前棋谱  删除棋子
        EventManager.publish("GameScene/deleteChess", lastChessBook);
        //console.log(lastChessBook);
    },
    /**
     * 分析完整棋谱
     */
    analyseWholeChessBook: function (cb, selfColor) {
        cb = cb.substring(1, cb.lastIndexOf(")"));
        var cbs = cb.split(";");
        var cbss = new Array();
        var reg = new RegExp(/(B|W)\[(.*)\]/);
        var chessBook = "";
        var selfNums = 0;
        var oppNums = 0;
        var color = selfColor == 0 ? "B" : "W";
        for (var i = 2; i < cbs.length; i++) {
            var chessType = reg.exec(cbs[i])[1];
            if (chessType == color) {
                EventManager.publish("GameScene/stepSelfPlus");
            } else {
                EventManager.publish("GameScene/stepOppPlus");
            }
            var chess = reg.exec(cbs[i])[2];
            var numX = "", numY = "";
            if (chess != "") {
                numX = this.getNumxByWord(chess.substring(0, 1));
                numY = this.getNumxByWord(chess.substring(1, 2));
                //console.log(chess + ":" + numX + "," + numY);
            } else {
                numX = -1;
                numY = -1;
            }
            if (i == (cbs.length - 1)) {

                if (color != chessType) {
                    oGameData["chessAvailable"] = 1;
                    EventManager.publish("ChessBoard/setAvail", true);
                    EventManager.publish("GameScene/startRemainTime", 0);
                    // EventManager.publish("GameScene/stopRemainTime", 1);
                } else {
                    EventManager.publish("GameScene/startRemainTime", 1);
                    //EventManager.publish("GameScene/stopRemainTime", 0);
                }
            }
            chessBook = chessBook + ";" + chessType + "_" + numX + "_" + numY;
            oGameData["steps"]++;
        }
        //EventManager.publish("GameScene/setHandsNum", 0, selfNums);
        //EventManager.publish("GameScene/setHandsNum", 1, oppNums);
        localStorage.setItem("local_chessbook", chessBook);
    }
};
Utility.initArr(lastChessBook);