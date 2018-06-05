/**
 * 封装wxRequest function
 * zhongxurui
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var HTTPCLI = (function () {
        function HTTPCLI() {
            this.onSuccess = null;
            this.onFailed = null;
        }
        HTTPCLI.wxHttpRequest = function (url, data, onsuccess, onFailed) {
            var client = new HTTPCLI();
            client.wxRequest(url, data, onsuccess, onFailed);
        };
        HTTPCLI.prototype.wxRequest = function (url, data, onsuccess, onFailed) {
            game.Util.getInstance().ShowLoading();
            wx.request({
                url: url,
                data: data,
                method: "GET",
                dataType: "json",
                header: { 'content-type': 'application/json' },
                success: function (res) {
                    game.Util.getInstance().HideLoading();
                    if (res.statusCode == 200) {
                        onsuccess(res);
                    }
                    else {
                        onFailed(res);
                    }
                },
                fail: function (res) {
                    game.Util.getInstance().HideLoading();
                    onFailed(res);
                },
                complete: function (res) {
                }
            });
        };
        return HTTPCLI;
    }());
    game.HTTPCLI = HTTPCLI;
    __reflect(HTTPCLI.prototype, "game.HTTPCLI");
})(game || (game = {}));
//# sourceMappingURL=HttpClient.js.map