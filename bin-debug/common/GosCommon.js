var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * by lijie 通用类
 */
var GosCommon = (function () {
    function GosCommon() {
    }
    /**
     * 根据default.res.json配置文件的资源名字name 获取该资源地址,并创建bitmap对象
     */
    GosCommon.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 根据name和position加载资源 生成bitmap
     */
    GosCommon.createBitmapByNameAndPosition = function (name, position) {
        var x = position["x"] || 0;
        var y = position["y"] || 0;
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.x = x;
        result.y = y;
        return result;
    };
    /**
     * 字符串截取
     */
    GosCommon.subString = function (str, len) {
        return str.length > 10 ? str.substring(0, len) + "..." : str;
    };
    /**
     * 创建字符串
     */
    GosCommon.createTextField = function (txt, textColor, size, position) {
        var txtField = new egret.TextField();
        txtField.textColor = textColor;
        txtField.text = txt;
        txtField.x = position["x"];
        txtField.y = position["y"];
        txtField.size = size;
        //txtField.bold = true;
        return txtField;
    };
    /**
     * 分析结果
     *  //匹配：B+200,W+200,B-200,B+23.5(\+|-)= B+80.0\n\n,B+R,B+Resign
     * "0" 表示和局
     * "B+score" 表示黑胜 "W+score" 表示白胜, 例如 "B+2.5", "W+64" or "B+0.5" "B+R"/"B+Resign" 和 "W+R"/"W+Resign" 表示中盘胜
     */
    GosCommon.getGameResult = function (result) {
        if (result == 0) {
            return "和局";
        }
        else {
            var r = "";
            var regex = new RegExp(/(W\+|B\+|W\-|B\-)(\w*\.?\w*)/);
            var rArr = regex.exec(result);
            //alert(rArr[0] + "***" + rArr[1] + "***" + rArr[2]);
            if (rArr[2] == "R" || rArr[2] == "Resign") {
                switch (rArr[1]) {
                    case "W+":
                        r = "白中盘胜";
                        break;
                    case "B+":
                        r = "黑中盘胜";
                        break;
                    case "W-":
                        r = "黑中盘胜";
                        break;
                    case "B-":
                        r = "白中盘胜";
                        break;
                    default:
                        break;
                }
            }
            else {
                switch (rArr[1]) {
                    case "W+":
                        r = "白子胜";
                        break;
                    case "B+":
                        r = "黑子胜";
                        break;
                    case "W-":
                        r = "黑子胜";
                        break;
                    case "B-":
                        r = "白子胜";
                        break;
                    default:
                        break;
                }
                r = r + rArr[2] + "目";
            }
            return r;
        }
    };
    /**
     * 获取 死子
     */
    GosCommon.getEatChess = function (arr) {
        var eatChess = new Array();
        for (var i = 0; i < 19; i++) {
            for (var j = 0; j < 19; j++) {
                var eat = new Array();
                if (arr[i][j] != 0) {
                    eat.push(j);
                    eat.push(i);
                    eatChess.push(eat);
                }
            }
        }
        return eatChess;
    };
    return GosCommon;
}());
__reflect(GosCommon.prototype, "GosCommon");
//# sourceMappingURL=GosCommon.js.map