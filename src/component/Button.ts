/**
 *
 * @author 
 *
 */
class Button extends egret.Sprite {
    
    private btn: egret.Bitmap;
    private btnDis: egret.Bitmap;
    
	public constructor(res) {
        super();
        this.btn = new egret.Bitmap(res);
        this.btn.touchEnabled = true;
        this.addChild(this.btn);
	}
    
    // 设置禁用样式
    public setDisableImage(res) {
        this.btnDis = new egret.Bitmap(res);
        this.btnDis.visible = false;
        this.addChild(this.btnDis);
    }
    
    public setEnabled(bEnable) {
        this.btnDis.visible = !bEnable;
        this.btn.visible = bEnable;
    }
    
}