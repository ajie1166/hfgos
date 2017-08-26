/**
 * by lijie 通用类
 */
class GosCommon {
    /**
     * 根据default.res.json配置文件的资源名字name 获取该资源地址,并创建bitmap对象
     */
    public static createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    public static createBitmapByNameAndPosition(name: string, position: any) {
        let x: number = position["x"] || 0;
        let y: number = position["y"] || 0;
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        result.x = x;
        result.y = y;
        return result;
    }
}