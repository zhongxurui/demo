/**
 * gameMain.ts
 * created by zhongxurui on 18.05.28
 * Copyright (c) 2018年 BjpengkaiGame. All rights reserved.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var game;
(function (game) {
    var gameMin = (function (_super) {
        __extends(gameMin, _super);
        function gameMin() {
            var _this = _super.call(this) || this;
            _this.skinName = "gameMin";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.OnAddStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.Remove, _this);
            return _this;
        }
        gameMin.prototype.OnAddStage = function () {
            this.shengya.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoShengya, this);
            var logoAnimation = game.createDragonBones("logoanime");
            if (logoAnimation) {
                this.logo_db.addChild(logoAnimation);
                logoAnimation.x = this.logo_db.width / 2;
                logoAnimation.y = this.logo_db.height / 2;
                logoAnimation.animation.play(logoAnimation.animation.animationNames[0], 1);
                logoAnimation.animation.timeScale = 0.6;
            }
            var logoWumenAnimation = game.createDragonBones("girlidle");
            if (logoWumenAnimation) {
                this.logowomen.addChild(logoWumenAnimation);
                logoWumenAnimation.x = this.logowomen.width / 2;
                logoWumenAnimation.y = this.logowomen.height / 2 + 80;
                logoWumenAnimation.animation.play(logoWumenAnimation.animation.animationNames[0], 0);
            }
        };
        gameMin.prototype.gotoShengya = function () {
            // if () {
            // }
            this.parent.addChild(new game.chooseCountries);
            this.parent.removeChild(this);
        };
        gameMin.prototype.Remove = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.OnAddStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.Remove, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoShengya, this);
        };
        return gameMin;
    }(eui.Component));
    game.gameMin = gameMin;
    __reflect(gameMin.prototype, "game.gameMin");
})(game || (game = {}));
//# sourceMappingURL=gameMain.js.map