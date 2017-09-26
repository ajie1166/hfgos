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
    return GosCommon;
}());
__reflect(GosCommon.prototype, "GosCommon");
//# sourceMappingURL=GosCommon.js.map