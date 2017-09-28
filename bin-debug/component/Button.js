var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author
 *
 */
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(res) {
        var _this = _super.call(this) || this;
        _this.btn = new egret.Bitmap(res);
        _this.btn.touchEnabled = true;
        _this.addChild(_this.btn);
        return _this;
    }
    // 设置禁用样式
    Button.prototype.setDisableImage = function (res) {
        this.btnDis = new egret.Bitmap(res);
        this.btnDis.visible = false;
        this.addChild(this.btnDis);
    };
    Button.prototype.setEnabled = function (bEnable) {
        this.btnDis.visible = !bEnable;
        this.btn.visible = bEnable;
    };
    return Button;
}(egret.Sprite));
__reflect(Button.prototype, "Button");
//# sourceMappingURL=Button.js.map