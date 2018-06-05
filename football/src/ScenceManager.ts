/**
 * ScenceManager.ts
 * created by zhongxurui on 18.06.05
 * Copyright (c) 2018年 BjpengkaiGame. All rights reserved.
 */

namespace game {


    /**
     * 比赛类型 
     */
    const enum completeType {
        U17 = 1, // u17比赛类型 
        U20 = 2, // u20
        U23 = 3, // u30
    }

    /**
     * 球门大小
     */
    const enum BallDoorSize {
        Big = 1,
        middle = 2,
        smaill = 3
    }

    /**
     * 球场
     */
    const enum BallCHang {
        ZHENGCHANG = 1,
        XUEDIQIUCHANG = 2,
        HONGTUQIUCHANG = 3,
        CAIHANGQIUCHANG = 4,
        TIANKONGZHICHENG = 5,
        NIDIQIUCHANG = 6
    }

    export class ScenceManager {
        public constructor() {

        }

        public id: number = 0; //初始id为0
        public name: string = "china" //关卡名称
        public type: number = completeType.U17 //比赛类型
        public movingSpeed: number = 0; //球门移动速度
        public tarjectory: any = []; // 球门移动轨迹
        public goalLength: number = 0; // 球门大小
        public court: number = BallCHang.CAIHANGQIUCHANG; // 场地类型 更换皮肤
        /**
         * 解析关卡数据
         */
        public parse(data: any): void {
            if (!data) return;
            this.id = parseInt(data.id);
            this.name = data.name;
            this.movingSpeed = parseInt(data.movingSpeed);
            this.court = parseInt(data.court);
           

           //解析机器人数据
            this._Robot = {
                name: data.name,
                hit: parseInt(data.hit),
                time: parseInt(data.time)
            }
            //处理球门移动数据 转换为Array
            if (data.trajectory.split("-").length > 0) {
                let tar: number[][] = [];
                for (let i = 0; i < data.trajectory.split("-").length; i++) {
                    let Inits = data.trajectory.split("-")[i].split(',');
                    tar.push([parseInt(Inits[0]), parseInt(Inits[1])])
                }
                this.tarjectory = tar;
            }
        }

        /**
         * 对战机器人数据
         */
        private _Robot: RobotData = null;
        public get Robot() { return this._Robot };

    }
    type RobotData = {
        name: string,
        hit: number,
        time: number
    }

}