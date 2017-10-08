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
       userAgent=navigator.appCodeName+"/1.0.0 ("+navigator.appName+";"+navigator.platform+";"+navigator.language+";yizhan;"+this.getFingerPrint()+";0)"
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
    }
};