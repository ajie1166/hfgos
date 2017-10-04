// TypeScript file
/**
 * by lijie 
 */
declare module oGameData {
    var oBlockIndex: Object;
    var oAllBlockIndex: Object;
    var oLastEatGos: Object;
    var oLastSetGos: Object;
    var oMap: Object;
    var oSteps: {};
    var nStep: number;
    var steps: number;
    var selfChessType: {};
    var chessAvailable: {};
    var black_arr: {};
    var white_arr: {}
}
declare module ChessController {
    function checkAvailChess(x, y, color): any;
}