var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Player.ts
 * created by zhongxurui on 18.6.01
 * Copyright (c) 2018年 BjpengkaiGame. All rights reserved.
 */
var game;
(function (game) {
    game.Curplayer = null;
    /**
    * player 类
    */
    var Player = (function () {
        function Player() {
            this.name = game.INSTRING; //微信昵称
            this.id = game.INNUMBER; // 玩家game id
            this.openid = game.INSTRING; //玩家微信 openid
            this.HeaderUrl = game.INSTRING; // 玩家头像链接
            this.GuankaId = "1"; //关卡Id 先默认为1
        }
        Player.createInstance = function () {
            if (game.Curplayer == null) {
                game.Curplayer = new Player();
            }
            return game.Curplayer;
        };
        return Player;
    }());
    game.Player = Player;
    __reflect(Player.prototype, "game.Player");
})(game || (game = {}));
//# sourceMappingURL=player.js.map