//保持连接
var OP_PING = 0; //发心跳

//登录认证
var OP_LOGIN_REQ = 1000;
var OP_LOGIN_REP = 1001;

// ==========游戏相关协议2000开头===========
//游戏过程  28～60
//创建对局
var OP_NEW_REQ = 2001;
var OP_NEW_REP = 2002;
//首页上需要及时更新的列表5～27
var OP_S_GAME = 2005; //关注数

//1.快速加入
var OP_QUICK_JOIN_REQ = 2006;
var OP_QUICK_JOIN_REP = 2007;

// 邀请加入
var OP_JOIN_REQ = 2008;
var OP_JOIN_REP = 2009;

//2.观战  3.下棋者再次进入
var OP_SPECTATORS_REQ = 2010;
var OP_SPECTATORS_REP = 2011;

//下发规则(匹配上之后，并且只发给快速匹配的玩家)
var OP_RULE_REP = 2012;

//确认规则
var OP_CONFIRM_RULE_REQ = 2013;
var OP_CONFIRM_RULE_REP = 2014;

//开始游戏
var OP_GAME_START_REP = 2015;

//移动棋子
var OP_MOVE_REQ = 2100;
var OP_MOVE_REP = 2101;

//停一手
var OP_PASS_REQ = 2110;
var OP_PASS_REP = 2111;

//点目
var OP_COUNTING_REQ = 2120;
var OP_COUNTING_REP = 2121;
var OP_CONF_COUNTING_REQ = 2122;
var OP_CONF_COUNTING_REP = 2123;

var OP_FORCE_COUNTING_REQ = 2124;
var OP_FORCE_COUNTING_REP = 2125;

//认输
var OP_RESIGN = 2130;
var OP_CONF_DRAW_REP = 301;

//求和
var OP_DRAW_REQ = 2140;
var OP_DRAW_REP = 2141;
var OP_CONF_DRAW_REQ = 2142;

//结束
var OP_LEAVE = 2150;
var OP_S_END = 2200;

var OP_CANCEL = 2201;

//邀请游戏    100开始
var OP_INVITE_REQ = 2300; //邀请
var OP_INVITE_REP = 2301;
var OP_CONF_INVITE_REQ = 2302;
var OP_CONF_INVITE_REP = 2303;

var OP_JOIN_MATCH_REQ = 2600;// 赛事-开始比赛
var OP_JOIN_MATCH_REP = 2601;

var OP_DEL_REQ = 2401;
var OP_DEL_REP = 2402;

//获取对局的界面上的棋谱(去除死子）
OP_FETCH_SNAPSHOT_REQ = 2500;
OP_FETCH_SNAPSHOT_REP = 2501;

// ==========聊天相关协议3000开头===========
//IM   150开始
var OP_MSG_REQ = 3000; //聊天发消息
var OP_MSG_REP = 3001;

//加好友
var OP_JOIN_FRIEND_REQ = 4000;
var OP_JOIN_FRIEND_REP = 4001;

//200开始
//异常断线
var SS_OFFLINE_REQ = 5000;
var SS_OFFLINE_REP = 5001;

var TSDT = {};
/*TSDT[OP_LOGIN_REQ] = {
    op: "",
    player_id: "",
    request_id: "",
    object: {
        player_id: "",
        version: "1.0.0",
        date: ""
    }
};*/

//登陆
TSDT[OP_LOGIN_REQ] = {
    op: "",
    request_id: "",
    player_id: "",
    object: "",
    game_id: ""
};
//下棋者再次进入
TSDT[OP_SPECTATORS_REQ] = {
    op: "",
    request_id: "",
    player_id: "",
    object: "",
    game_id: ""
};

//心跳
TSDT[OP_PING] = {
    op: "",
    request_id: "",
    player_id: "",
    object: "",
    game_id: ""
};
//确认规则
TSDT[OP_CONFIRM_RULE_REQ] = {
    op: "",
    request_id: "",
    player_id: "",
    object: "",
    game_id: ""
};
//走子
TSDT[OP_MOVE_REQ] = {
    op: "",
    request_id: "",
    player_id: "",
    object: "",
    game_id: ""
};
//获取当前棋谱
TSDT[OP_FETCH_SNAPSHOT_REQ] = {
    op: "",
    request_id: "",
    player_id: "",
    object: "",
    game_id: ""
};
//加入赛事
TSDT[OP_JOIN_MATCH_REQ] = {
    op: "",
    request_id: "",
    player_id: "",
    object: "",
    game_id: ""
};

//点目
TSDT[OP_COUNTING_REQ] = {
    op: "",
    request_id: "",
    player_id: "",
    object: "",
    game_id: ""
};

//处理对方点目
TSDT[OP_CONF_COUNTING_REQ] = {
    op: "",
    request_id: "",
    player_id: "",
    object: "",
    game_id: ""
};
/**
 * 结束
 */
TSDT[OP_RESIGN] = {
    op: "",
    request_id: "",
    player_id: "",
    object: "",
    game_id: ""
};

//停一手
TSDT[OP_PASS_REQ] = {
    op: "",
    request_id: "",
    player_id: "",
    object: "",
    game_id: ""
};

//创建对局
TSDT[OP_NEW_REQ] = {
    op: "",
    request_id: "",
    player_id: "",
    object: {
        gameSetting: {
            boardSize: "19",
            colorType: "2",
            handicap: "0",
            gameTime: "3",
            resultAffectRank: "false",
            publicGame: "true",
        }
    }
};
//匹配
TSDT[OP_QUICK_JOIN_REQ] = {
    op: "",
    request_id: "",
    player_id: "",
    object: {
        boardSize: "",
        room_code: "0"
    },
    game_id: ""
};
TSDT[OP_RULE_REP] = {
    gameData: {

    },
    unpack: function () {

    }
};

var GameRequest = {
    op: "",
    request_id: Utility.getRequestId(),
    player_id: "",
    object: "",
    game_id: ""
};

var GameResponse = {
    op: "",
    code: "",
    msg: "",
    request_id: "",
    player_id: "",
    object: "",
    game_id: ""
};