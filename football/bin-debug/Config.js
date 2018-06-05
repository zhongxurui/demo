/**
 * Config.ts
 * created by zhongxurui on 18.05.28
 * Copyright (c) 2018年 BjpengkaiGame. All rights reserved.
 */
/*****
 * config配置文件
 */
var game;
(function (game) {
    var host = "";
    var Md5key = "tkq:B5Y_mBl9:l/9"; //Md5加密key
    var CountriesData = {
        European: [
            { name: "俄罗斯", logo: "eluosi_png" },
            { name: "法国", logo: "faguo_png" },
            { name: "葡萄牙", logo: "putaoya_png" },
            { name: "德国", logo: "deguo_png" },
            { name: "塞尔维亚", logo: "saierweiya_png" },
            { name: "波兰", logo: "bolan_png" },
            { name: "英格兰", logo: "yingguo_png" },
            { name: "西班牙", logo: "xibanya_png" },
            { name: "比利时", logo: "bilishi_png" },
            { name: "冰岛", logo: "bingdao_png" },
            { name: "瑞士", logo: "ruishi_png" },
            { name: "克罗地亚", logo: "keluodiya_png" },
            { name: "瑞典", logo: "ruidian_png" },
            { name: "丹麦", logo: "danmai_png" },
        ],
        Africa: [
            { name: "突尼斯", logo: "tunisi_png" },
            { name: "尼日利亚", logo: "niriliya_png" },
            { name: "摩洛哥", logo: "moluoge_png" },
            { name: "塞内加尔", logo: "saineijiaer_png" },
            { name: "塞尔维亚", logo: "saierweiya_png" },
            { name: "埃及", logo: "aiji_png" },
        ],
        Americas: [
            { name: "巴西", logo: "baxi_png" },
            { name: "阿根廷", logo: "agenting_png" },
            { name: "乌拉圭", logo: "wulagui_png" },
            { name: "哥伦比亚", logo: "gelunbiya_png" },
            { name: "秘鲁", logo: "bilu_png" },
            { name: "哥斯达黎加", logo: "gesidalijia_png" },
            { name: "墨西哥", logo: "moxige_png" },
            { name: "巴拿马", logo: "banama_png" },
        ],
        Asia: [
            { name: "日本", logo: "riben_png" },
            { name: "韩国", logo: "hanguo_png" },
            { name: "沙特", logo: "shate_png" },
            { name: "澳大利亚", logo: "aodaliya_png" },
            { name: "中国", logo: "zhongguo_png" },
            { name: "伊朗", logo: "yilang_png" },
        ]
    };
    game.config = {
        Md5key: Md5key,
        host: host,
        CountriesData: CountriesData,
    };
})(game || (game = {}));
//# sourceMappingURL=Config.js.map