//辅助类
var Utility = {
    getTimestamp= function () {
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
    }
};