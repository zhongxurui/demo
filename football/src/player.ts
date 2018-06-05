/**
 * Player.ts
 * created by zhongxurui on 18.6.01
 * Copyright (c) 2018年 BjpengkaiGame. All rights reserved.
 */
namespace game {

    export let Curplayer: Player = null;
    /**
    * player 类
    */
    export class Player {
        public name: string = INSTRING; //微信昵称
        public id: number = INNUMBER; // 玩家game id
        public openid: string = INSTRING;  //玩家微信 openid
        public HeaderUrl: string = INSTRING;  // 玩家头像链接
        public GuankaId: string = "1" //关卡Id 先默认为1
        public constructor() {

        }
        public static createInstance(): Player {  // Player实例
            if (game.Curplayer == null) {
                game.Curplayer = new Player();
            }
            return game.Curplayer;
        }
    }
}