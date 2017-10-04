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
    /**
     * 根据name和position加载资源 生成bitmap
     */
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
    /**
     * 字符串截取
     */
    public static subString(str: string, len: number) {
        return str.length > 10 ? str.substring(0, len) + "..." : str;
    }

    /**
     * 创建字符串
     */
    public static createTextField(txt: string, textColor: number, size: number, position: any): egret.TextField {
        let txtField: egret.TextField = new egret.TextField();
        txtField.textColor = textColor;
        txtField.text = txt;
        txtField.x = position["x"];
        txtField.y = position["y"];
        txtField.size = size;
        //txtField.bold = true;
        return txtField;
    }

    /**
     * 分析结果
     *  //匹配：B+200,W+200,B-200,B+23.5(\+|-)= B+80.0\n\n,B+R,B+Resign
     * "0" 表示和局
     * "B+score" 表示黑胜 "W+score" 表示白胜, 例如 "B+2.5", "W+64" or "B+0.5" "B+R"/"B+Resign" 和 "W+R"/"W+Resign" 表示中盘胜
     */
    public static getGameResult(result): string {
        if (result == 0) {
            return "和局";
        } else {
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
            } else {
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
    }

    private static getEatChess(arr) {
        let eatChess = "";
        for (let i = 0; i < 19; i++) {
            for (let j = 0; j < 19; j++) {

            }
        }
    }
}