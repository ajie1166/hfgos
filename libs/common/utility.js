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
        userAgent = `${navigator.appCodeName}/1.0.0 (${navigator.appName};${navigator.platform};${navigator.language};yizhan;` + this.getFingerPrint() + ";1.0)";
        return userAgent;
    },
    /**
     * 帆布
     */
    getFingerPrint: function () {
        var fingerprint = new Fingerprint({ screen_resolution: true }).get();
        return fingerprint;
    }
};