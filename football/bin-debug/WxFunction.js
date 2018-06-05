var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var Util = (function () {
        function Util() {
        }
        Util.getInstance = function () {
            if (Util.instance == null) {
                Util.instance = new Util();
            }
            return Util.instance;
        };
        Util.prototype.ShowLoading = function (title) {
            if (title === void 0) { title = "加载中"; }
            wx.showLoading({
                title: title,
                success: function () { },
                fail: function () { },
                complete: function (res) { },
                mask: true
            });
        };
        Util.prototype.HideLoading = function () {
            wx.hideLoading({
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { }
            });
        };
        Util.prototype.shareAppMessage = function (title, imageUrl, query, onSuccess) {
            wx.shareAppMessage({
                title: title,
                imageUrl: imageUrl,
                query: null,
                success: function () { },
                fail: function (res) {
                },
                complete: function (res) {
                }
            });
        };
        Util.prototype.showShareMenu = function () {
            wx.showShareMenu({
                withShareTicket: false,
                success: function (res) {
                },
                fail: function (res) {
                },
                complete: function (res) {
                }
            });
        };
        return Util;
    }());
    game.Util = Util;
    __reflect(Util.prototype, "game.Util");
})(game || (game = {}));
//# sourceMappingURL=WxFunction.js.map