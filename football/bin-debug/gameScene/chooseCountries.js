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
/**
 * chooseCountries.ts
 * created by zhongxurui on 18.05.28
 * Copyright (c) 2018年 BjpengkaiGame. All rights reserved.
 */
var game;
(function (game) {
    ;
    var chooseCountries = (function (_super) {
        __extends(chooseCountries, _super);
        function chooseCountries() {
            var _this = _super.call(this) || this;
            _this.skinName = "chooseCountries";
            _this.ItemChoose.visible = false;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.OnAddStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.Remove, _this);
            return _this;
        }
        chooseCountries.prototype.OnAddStage = function () {
            var _this = this;
            this.list.itemRenderer = chooseList;
            this.list.dataProvider = new eui.ArrayCollection(game.config.CountriesData.European);
            this.tab.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChanged, this);
            this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.showItemchoose, this);
            this.cencel.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.ItemChoose.visible = false; }, this);
            this.zhezhao.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.ItemChoose.visible = false; }, this);
        };
        chooseCountries.prototype.Remove = function () {
            var _this = this;
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.OnAddStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.Remove, this);
            this.tab.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChanged, this);
            this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.showItemchoose, this);
            this.cencel.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.ItemChoose.visible = false; }, this);
            this.zhezhao.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.ItemChoose.visible = false; }, this);
        };
        chooseCountries.prototype.onTabChanged = function (e) {
            this.showTab(e.itemIndex);
        };
        chooseCountries.prototype.showTab = function (t) {
            switch (t) {
                case 0 /* European */:
                    this.list.dataProvider = new eui.ArrayCollection(game.config.CountriesData.European);
                    break;
                case 1 /* Africa */:
                    this.list.dataProvider = new eui.ArrayCollection(game.config.CountriesData.Africa);
                    break;
                case 2 /* Americas */:
                    this.list.dataProvider = new eui.ArrayCollection(game.config.CountriesData.Americas);
                    break;
                case 3 /* Asia */:
                    this.list.dataProvider = new eui.ArrayCollection(game.config.CountriesData.Asia);
                    break;
            }
        };
        chooseCountries.prototype.showItemchoose = function (e) {
            // console.log("选择了那个球队", e.item);
            if (!e.item)
                return;
            this.chooseLable.text = e.item.name;
            this.chooseImage.source = e.item.logo;
            this.ItemChoose.visible = true;
        };
        return chooseCountries;
    }(eui.Component));
    game.chooseCountries = chooseCountries;
    __reflect(chooseCountries.prototype, "game.chooseCountries");
    var chooseList = (function (_super) {
        __extends(chooseList, _super);
        function chooseList() {
            var _this = _super.call(this) || this;
            _this.skinName = 'ChooseList';
            return _this;
        }
        return chooseList;
    }(eui.ItemRenderer));
    __reflect(chooseList.prototype, "chooseList");
})(game || (game = {}));
//# sourceMappingURL=chooseCountries.js.map