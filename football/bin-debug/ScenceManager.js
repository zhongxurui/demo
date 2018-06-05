/**
 * ScenceManager.ts
 * created by zhongxurui on 18.06.05
 * Copyright (c) 2018年 BjpengkaiGame. All rights reserved.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var ScenceManager = (function () {
        function ScenceManager() {
            this.id = 0; //初始id为0
            this.name = "china"; //关卡名称
            this.type = 1 /* U17 */; //比赛类型
            this.movingSpeed = 0; //球门移动速度
            this.tarjectory = []; // 球门移动轨迹
            this.goalLength = 0; // 球门大小
            this.court = 4 /* CAIHANGQIUCHANG */; // 场地类型 更换皮肤
            /**
             * 对战机器人数据
             */
            this._Robot = null;
        }
        /**
         * 解析关卡数据
         */
        ScenceManager.prototype.parse = function (data) {
            if (!data)
                return;
            this.id = parseInt(data.id);
            this.name = data.name;
            this.movingSpeed = parseInt(data.movingSpeed);
            this.court = parseInt(data.court);
            //解析机器人数据
            this._Robot = {
                name: data.name,
                hit: parseInt(data.hit),
                time: parseInt(data.time)
            };
            //处理球门移动数据 转换为Array
            if (data.trajectory.split("-").length > 0) {
                var tar = [];
                for (var i = 0; i < data.trajectory.split("-").length; i++) {
                    var Inits = data.trajectory.split("-")[i].split(',');
                    tar.push([parseInt(Inits[0]), parseInt(Inits[1])]);
                }
                this.tarjectory = tar;
            }
        };
        Object.defineProperty(ScenceManager.prototype, "Robot", {
            get: function () { return this._Robot; },
            enumerable: true,
            configurable: true
        });
        ;
        return ScenceManager;
    }());
    game.ScenceManager = ScenceManager;
    __reflect(ScenceManager.prototype, "game.ScenceManager");
})(game || (game = {}));
//# sourceMappingURL=ScenceManager.js.map