/**
 * career.ts
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
    var caree = (function (_super) {
        __extends(caree, _super);
        function caree() {
            var _this = _super.call(this) || this;
            _this.skinName = "shengya";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddStage, _this);
            return _this;
        }
        caree.prototype.onAddStage = function () {
            this.test.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoTest, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.Remove, this);
        };
        caree.prototype.gotoTest = function () {
            this.parent.addChild(new game.gamestar);
            this.parent.removeChild(this);
        };
        caree.prototype.Remove = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.Remove, this);
            if (this.test.hasEventListener(egret.TouchEvent.TOUCH_TAP))
                this.test.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoTest, this);
        };
        return caree;
    }(eui.Component));
    game.caree = caree;
    __reflect(caree.prototype, "game.caree");
})(game || (game = {}));
//# sourceMappingURL=career.js.map