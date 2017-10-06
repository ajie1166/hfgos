var oGameData = {
    'oBlockIndex': {},
    'oAllBlockIndex': {},
    'oLastEatGos': { 'x': -1, 'y': -1 },
    'oLastSetGos': { 'x': -1, 'y': -1 },
    'oMarkGos': {},
    'oMarkMap': {},
    'oMap': {},
    'oSteps': {},
    'nStep': 0,
    'oRoomInfo': {},
    'steps': 0,
    'selfChessType': 0,//0 黑子  1 白子
    'chessAvailable': 0,//1 有权限  0 无权限
    'black_arr': {},
    'white_arr': {},
    'chessBook': {},
    'deleteChess': {},
    'lastChessCoordinate': {}//上个子坐标
};


var arr = new Array(19);
var step = 0;//当前步骤
var isview = false;//是否在查看过往步骤
oGameData["black_arr"] = new Array(19);//新建一个二维数组，用于存储当前步骤的棋子布局
oGameData["black_arr"] = Utility.initArr(oGameData["black_arr"]);

oGameData["white_arr"] = new Array(19);//新建一个二维数组，用于存储当前步骤的棋子布局
oGameData["white_arr"] = Utility.initArr(oGameData["white_arr"]);

var obj = new Object();
obj.record = {};
localStorage.setItem("gogame", JSON.stringify(obj));
var ChessController = {

    /**
     * 初始化数组
     */
    init: function () {
        var self = this;
        for (var i = 0; i < 19; i++) {
            var arrj = new Array(19);
            var arrObj = new Array(19);
            //var obj = new Object();
            for (var j = 0; j < 19; j++) {
                arrj[j] = 0;
                arrObj[j] = {};
            }
            arr[i] = arrj;
            oGameData["chessBook"][i] = arrObj;
        }
        console.log(oGameData["chessBook"]);
    },
    //存储本步骤的棋盘数组
    saveStep: function () {
        obj = JSON.parse(localStorage.getItem("gogame"));
        obj.record[step] = arr;
        localStorage.setItem("gogame", JSON.stringify(obj));
        step++;
        //document.querySelector("#totalstep").innerHTML = step;
    },
    /**
     * x x轴坐标 第几个 0开始  y...
     */
    checkAvailChess: function (x, y, color) {
        var self = this;
        if (arr[x][y] == 0) {
            //判断是否在不可着子区域
            if (color == 0) {
                if (oGameData["black_arr"][x][y] == "b") {
                    return false;
                    // alert("根据规则，此处不可马上下子，\n请在别处另着一子后再回来！！！");
                } else {
                    arr[x][y] = "b";

                    //将监测是否可以提子的数组置为19*19的0数组
                    oGameData["black_arr"] = Utility.initArr(oGameData["black_arr"]);

                    //检查是否可以提子，可以提子就提子
                    self.checkPiece(x, y, color);
                    //存储步骤
                    self.saveStep();
                }
            } else if (color == 1) {
                if (oGameData["white_arr"][x][y] == "w") {
                    return false;
                    //alert("根据规则，此处不可马上下子，\n请在别处另着一子后再回来！！！");
                } else {
                    arr[x][y] = "w";
                    //将监测是否可以提子的数组置为19*19的0数组
                    oGameData["white_arr"] = Utility.initArr(oGameData["white_arr"]);

                    //检查是否可以提子，可以提子就提子
                    self.checkPiece(x, y, color);

                    //存储步骤
                    self.saveStep();
                }
            }
            // console.log(arr);
            //console.log(oGameData["black_arr"]);
            // console.log(oGameData["white_arr"]);
            return true;
        } else {
            return false;
        }
    },

    //检查该落子是否可以提子，可以就提子
    checkPiece: function (coordinate_x, coordinate_y, color) {
        var self = this;
        //alert(coordinate_x);
        var myside = "";
        var otherside = "";
        var iskill = false;
        if (color == 0) {
            myside = "b";
            otherside = "w";
        } else if (color == 1) {
            myside = "w";
            otherside = "b";
        }

        //如果该子上方是对方棋子或者为第一行
        if ((coordinate_y > 0 && arr[coordinate_x][coordinate_y - 1] == otherside)) {
            if (self.checkOthersidePiece(coordinate_x, coordinate_y - 1, otherside)) {
                iskill = true;
            }
        }
        //如果该子左方是对方棋子或者为第一行
        if ((coordinate_x > 0 && arr[coordinate_x - 1][coordinate_y] == otherside)) {
            if (self.checkOthersidePiece(coordinate_x - 1, coordinate_y, otherside)) {
                iskill = true;
            }
        }
        //如果该子右方是对方棋子或者为第十九行
        if ((coordinate_x < 18 && arr[coordinate_x + 1][coordinate_y] == otherside)) {
            if (self.checkOthersidePiece(coordinate_x + 1, coordinate_y, otherside)) {
                iskill = true;
            }
        }
        //如果该子下方是对方棋子或者为第十九行
        if ((coordinate_y < 18 && arr[coordinate_x][coordinate_y + 1] == otherside)) {
            if (self.checkOthersidePiece(coordinate_x, coordinate_y + 1, otherside)) {
                iskill = true;
            }
        }

        //如果有提掉对方棋子
        if (iskill == true) {

            //监测本子落子后己方棋子是否会被提
        } else {
            //alert(JSON.stringify(arr));
            self.checkOthersidePiece(coordinate_x, coordinate_y, myside);
        }
    },
    checkOthersidePiece: function (coordinate_x, coordinate_y, side) {
        var self = this;
        //新建一个二维数组，用于排放与该子连接的本方棋子
        var connection_arr = new Array(19);
        for (var i = 0; i < 19; i++) {
            var connection_arrj = new Array(19);
            for (var j = 0; j < 19; j++) {
                connection_arrj[j] = 0;
            }
            connection_arr[i] = connection_arrj;
        }
        var isdead = true;//是否被提，默认为被提
        var deadcount = 0;

        //alert("1111"+JSON.stringify(connection_arr)+coordinate_x+":"+coordinate_y);
        //将所有与本子相连的同色棋子组成本数组
        connection_arr = self.setconnection_arr(connection_arr, coordinate_x, coordinate_y, side);
        //alert("2222"+JSON.stringify(connection_arr));

        //遍历该connection_arr数组，若有3则，不死
        for (var i in connection_arr) {
            for (var j in connection_arr[i]) {
                if (connection_arr[i][j] == 3) {
                    //console.log("i+j:"+i+"+"+j);
                    isdead = false;
                }
            }
        }

        //如果会被提，则提子
        if (isdead == true) {
            for (var i in connection_arr) {
                for (var j in connection_arr[i]) {
                    if (connection_arr[i][j] == side) {
                        arr[i][j] = 0;
                        deadcount++;

                        //将connection_arr中标志位为side的数组放入his_arr中供提子限制规则查询使用
                        if (side == "b") {
                            oGameData["black_arr"][i][j] = "b";
                        } else if (side == "w") {
                            oGameData["white_arr"][i][j] = "w";
                        }
                    }
                }
            }
        }
        //  console.log("isdead:" + isdead + ":提子数量:" + deadcount);
        //若有提子返回true
        if (deadcount > 0) {
            return true;
        } else {
            return false;
        }
        console.log(connection_arr);
    },
    /**
 * 递归组织连接的此方棋子
 * @param connection_arr
 * @param coordinate_x
 * @param coordinate_y
 * @param side
 * @return {*}
 */
    setconnection_arr: function (connection_arr, coordinate_x, coordinate_y, side) {
        var self = this;
        //设置数组为本块相连的
        if (connection_arr[coordinate_x][coordinate_y] != side && arr[coordinate_x][coordinate_y] == side) {
            connection_arr[coordinate_x][coordinate_y] = side;
            //如果该黑子上方是白子并且不为第一行
            if (coordinate_y > 0 && arr[coordinate_x][coordinate_y - 1] == side) {
                connection_arr = self.setconnection_arr(connection_arr, coordinate_x, coordinate_y - 1, side);
            } else if (coordinate_y > 0 && arr[coordinate_x][coordinate_y - 1] == 0) {
                connection_arr[coordinate_x][coordinate_y - 1] = 3;
            }
            //如果该黑子左方是白子或者为第一行
            if (coordinate_x > 0 && arr[coordinate_x - 1][coordinate_y] == side) {
                connection_arr = self.setconnection_arr(connection_arr, coordinate_x - 1, coordinate_y, side);
            } else if (coordinate_x > 0 && arr[coordinate_x - 1][coordinate_y] == 0) {
                connection_arr[coordinate_x - 1][coordinate_y] = 3;
            }
            //如果该黑子右方是白子或者为第十九行
            if (coordinate_x < 18 && arr[coordinate_x + 1][coordinate_y] == side) {
                connection_arr = self.setconnection_arr(connection_arr, coordinate_x + 1, coordinate_y, side);
            } else if (coordinate_x < 18 && arr[coordinate_x + 1][coordinate_y] == 0) {
                connection_arr[coordinate_x + 1][coordinate_y] = 3;
            }
            //如果该黑子下方是白子或者为第十九行
            if (coordinate_y < 18 && arr[coordinate_x][coordinate_y + 1] == side) {
                connection_arr = self.setconnection_arr(connection_arr, coordinate_x, coordinate_y + 1, side);
            } else if (coordinate_y < 18 && arr[coordinate_x][coordinate_y + 1] == 0) {
                connection_arr[coordinate_x][coordinate_y + 1] = 3;
            }
        }

        //console.log("x:"+coordinate_x+"y:"+coordinate_y);
        return connection_arr;
    }
};

ChessController.init();