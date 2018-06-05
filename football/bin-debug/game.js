var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * game.ts
 * created by zhongxurui on 18.6.01
 * Copyright (c) 2018年 BjpengkaiGame. All rights reserved.
 */
/** 全局文件 类似于微信小程序 中的 app.js**/
var game;
(function (game) {
    game.INSTRING = "-1"; //定义一个无效类型 
    game.INNUMBER = -1; // 定义一个整形类型
    game.gameOnline = game.INNUMBER; // 游戏环境标识
    game.GuankaConfig = null;
    /**
   * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
   * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
   */
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    game.createBitmapByName = createBitmapByName;
})(game || (game = {}));
//自定义事件机制
var agf;
(function (agf) {
    /** 事件管理器，提供全局事件的相关接口。 */
    var handler = new egret.EventDispatcher();
    var EventMgr = (function () {
        function EventMgr() {
        }
        /** 添加事件listener */
        EventMgr.addEventListener = function (type, callback, thisObj) {
            handler.addEventListener(type, callback, thisObj);
        };
        ;
        /** 移除事件listener */
        EventMgr.removeEventListener = function (type, callback, thisObj) {
            handler.removeEventListener(type, callback, thisObj);
        };
        ;
        // /** 触发事件 */
        EventMgr.dispatchEvent = function (type, data) {
            if (data === 0) {
                data = null;
            }
            ;
            handler.dispatchEventWith(type, false, data);
        };
        ;
        return EventMgr;
    }());
    agf.EventMgr = EventMgr;
    __reflect(EventMgr.prototype, "agf.EventMgr");
    /**自定义事件类型 */
    agf.EventType = {
        PLAYEREND: "PlayerEnd",
        STARGAME: "stargame",
        ROBOTBEGIN: "RObotBegin",
        BALLHIDE: "ballhide",
    };
})(agf || (agf = {}));
//# sourceMappingURL=game.js.map