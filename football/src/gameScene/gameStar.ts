/**
 * gameStar.ts
 * created by zhongxurui on 18.06.01
 * Copyright (c) 2018年 BjpengkaiGame. All rights reserved.
 */
namespace game {
    export class gamestar extends eui.Component {

        private ball: eui.Group;  //足球
        private ballDoor: eui.Image; // 球门
        private console: eui.Group; //控制
        private ball_I: eui.Image;
        private test_lable: eui.Label;
        private myScoreTime: number = 30; //初始值为30
        private SinMyScore: number = null;
        private RobotScore: number = null;
        private DoorIndex: number = 0;
        private score: eui.Label;
        private _ScenceManager: ScenceManager = new ScenceManager();
        private gameStar: eui.Group;
        private get ScenceManager(): ScenceManager { return this._ScenceManager };


        private RobotPlayer: boolean = false;

        // private robot: any = null;
        public constructor() {
            super();
            this.skinName = "gameStar";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage(): void {
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.RemoveSelf, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.UpdateView, this);
            agf.EventMgr.addEventListener(agf.EventType.PLAYEREND, this.gameEnd, this);
            agf.EventMgr.addEventListener(agf.EventType.STARGAME, this.SinMyScoreStar, this);
            agf.EventMgr.addEventListener(agf.EventType.ROBOTBEGIN, this.RobotBeginPlay, this);
            agf.EventMgr.addEventListener(agf.EventType.BALLHIDE, this.hideConcent, this);
            this.CreateWorld();
            this.CreateBall();
            this.CreatDoor();
            this.createDebugDraw();
            this.createMaterial();
            this.hitListener();

            //初始化关卡数据
            let guankaData = game.GuankaConfig.filter(x => { return x.id == Curplayer.GuankaId }).shift();
            this.ScenceManager.parse(guankaData);  //初始化关卡管理器

            /**开场动画 */
            let tw = egret.Tween.get(this.gameStar);
            tw.to({ scaleX: 1, scaleY: 1, alpha: 1 }, 600)
                .wait(800)
                .to({ alpha: 0 }, 600)
                .wait(800)
                .call(
                () => {
                    agf.EventMgr.dispatchEvent(agf.EventType.STARGAME);
                    this.GuankaGuiji(this.ballDoor);
                })
        }

        private RemoveSelf(): void {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.RemoveSelf, this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.UpdateView, this);
            this.console.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginMovePaddle, this);
            this.console.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.movePaddle, this);
            this.console.removeEventListener(egret.TouchEvent.TOUCH_END, this.startGame, this);
            agf.EventMgr.removeEventListener(agf.EventType.PLAYEREND, this.gameEnd, this);
            agf.EventMgr.removeEventListener(agf.EventType.STARGAME, this.SinMyScoreStar, this);
            agf.EventMgr.removeEventListener(agf.EventType.ROBOTBEGIN, this.RobotBeginPlay, this);
            agf.EventMgr.removeEventListener(agf.EventType.BALLHIDE, this.hideConcent, this);
            egret.clearInterval(this.SinMyScore);
            egret.Tween.removeTweens(this.ballDoor);
        }

        private World: p2.World;  //物理世界
        private factor: number = 30; //一像素 == 物理世界30
        private CreateWorld() {
            let wd: p2.World = new p2.World({ gravity: [0, 0] }); //创建物理世界 无重力；
            this.World = wd;
        }

        private ballShape: p2.Shape;
        private ballBody: p2.Body;

        private CreateBall(): void {
            var self = this;
            let ballW: number = this.ball.width;
            let ballH: number = this.ball.height;
            let ballX: number = this.ball.x;
            let bally: number = this.ball.y;
            let ballR: number = ballW / 2;
            let ballshape: p2.Shape = new p2.Circle({ radius: ballR / this.factor });
            var ballBody: p2.Body = new p2.Body({ position: [375 / this.factor, 1047 / this.factor], mass: 1 });
            ballBody.damping = 0.6;
            ballBody.type = p2.Body.DYNAMIC;
            this.ballShape = ballshape;
            this.ballBody = ballBody;
            ballBody.id = 5;
            ballBody.addShape(ballshape);
            this.World.addBody(ballBody);
        }

        private DoorBottom: p2.Body;
        private DoorLeft: p2.Body;
        private DoorRightBody: p2.Body;
        private DoorBottomShape: p2.Shape;
        private DoorLeftShape: p2.Shape;
        private DoorRightShape: p2.Shape;
        private CreatDoor(): void {
            var wallTopShape: p2.Box = new p2.Box({ width: this.ballDoor.width / this.factor, height: 20 / this.factor });
            var wallTopBody: p2.Body = new p2.Body({ position: [(this.ballDoor.x + this.ballDoor.width / 2) / this.factor, this.ballDoor.y / this.factor], mass: 2 });

            wallTopBody.type = p2.Body.KINEMATIC;

            wallTopBody.addShape(wallTopShape);
            this.DoorBottom = wallTopBody;
            this.DoorBottomShape = wallTopShape;
            this.World.addBody(wallTopBody);
            wallTopBody.id = 1;
            var Doorleft: p2.Box = new p2.Box({ width: 10 / this.factor, height: this.ballDoor.height / this.factor });
            var DoorleftBody: p2.Body = new p2.Body({ position: [this.ballDoor.x / this.factor, (this.ballDoor.y + this.ballDoor.height / 2) / this.factor], mass: 2 })
            DoorleftBody.type = p2.Body.KINEMATIC;
            DoorleftBody.addShape(Doorleft);
            this.DoorLeft = DoorleftBody;
            this.DoorLeftShape = Doorleft;
            this.World.addBody(DoorleftBody);
            DoorleftBody.id = 2;
            var DoorRight: p2.Box = new p2.Box({ width: 10 / this.factor, height: 66 / this.factor });
            var DoorRightBody: p2.Body = new p2.Body({ position: [(this.ballDoor.x + this.ballDoor.width) / this.factor, (this.ballDoor.y + this.ballDoor.height / 2) / this.factor], mass: 2 })
            DoorRightBody.addShape(DoorRight);
            DoorRightBody.type = p2.Body.KINEMATIC;
            this.DoorRightShape = DoorRight;
            this.DoorRightBody = DoorRightBody;
            this.World.addBody(DoorRightBody);
            DoorRightBody.id = 3;
        }

        private debugDraw: p2DebugDraw;
        private debugSprite: egret.Sprite;

        //P2调试
        private createDebugDraw(): void {
            this.debugSprite = new egret.Sprite();
            this.addChild(this.debugSprite);
            this.debugDraw = new p2DebugDraw(this.World, this.debugSprite);
        }

        private lastX: number;

        private beginMovePaddle(e: egret.TouchEvent): void {
            this.lastX = e.stageX;
        }

        private movePaddle(e: egret.TouchEvent): void {
            var moveX: number = e.stageX - this.lastX;
            this.ballBody.position[0] += moveX / this.factor;
            this.lastX = e.stageX;
        }

        private UpdateView(): void {
            this.score.text = this.myScoreTime.toString();
            this.World.step(1 / 60);
            // this.debugDraw.drawDebug();  //开始绘制p2样图;
            this.ball.rotation = this.ballBody.angle * 180 / Math.PI;
            //更改球的运动轨迹
            this.ball.x = this.ballBody.position[0] * this.factor;
            this.ball.y = this.ballBody.position[1] * this.factor;

            //更改球门的运动轨迹
            this.DoorBottom.position = [(this.ballDoor.x + this.ballDoor.width / 2) / this.factor, this.ballDoor.y / this.factor];
            this.DoorLeft.position = [this.ballDoor.x / this.factor, (this.ballDoor.y + this.ballDoor.height / 2) / this.factor];
            this.DoorRightBody.position = [(this.ballDoor.x + this.ballDoor.width) / this.factor, (this.ballDoor.y + this.ballDoor.height / 2) / this.factor];

            //踢出界面
            if (this.ball.x > 760 || this.ball.x < 0 || this.ball.y < -10) this.TheBallOut();
        }

        //改变物理材质
        private createMaterial(): void {
            var PaddleMaterial: p2.Material = new p2.Material(1);
            var BallMaterial: p2.Material = new p2.Material(2);
            var BallCollidePaddle: p2.ContactMaterial = new p2.ContactMaterial(PaddleMaterial, BallMaterial);
            BallCollidePaddle.restitution = 0.6;    //弹性系数
            BallCollidePaddle.friction = 1;        //摩擦系数
            this.DoorBottomShape.material = PaddleMaterial;
            this.DoorLeftShape.material = PaddleMaterial;
            this.DoorRightShape.material = PaddleMaterial;
            this.ballShape.material = BallMaterial;
            this.World.addContactMaterial(BallCollidePaddle);
        }
        /**
         * 踢球
         */
        private ballAnimation: dragonBones.EgretArmatureDisplay;
        private startGame(): void {
            this.ballBody.damping = 0;  //设置运动阻尼： 为0 
            this.ballBody.velocity = [0, -30]; // 设置速度为30；
            this.ball_I.visible = false;
            let ballAnimation: dragonBones.EgretArmatureDisplay = createDragonBones("football");
            if (ballAnimation) {
                this.ball.addChild(ballAnimation);
                ballAnimation.x = this.ball.width / 2;
                ballAnimation.y = this.ball.height / 2;
                ballAnimation.scaleX = 0.8;
                ballAnimation.scaleY = 0.8;
                ballAnimation.animation.play(ballAnimation.animation.animationNames[0], 0)
                this.ballAnimation = ballAnimation;
            }
        }

        //碰撞检测
        private hitListener(): void {
            var self = this;
            this.World.on("beginContact", function (e: any) {
                agf.EventMgr.dispatchEvent(agf.EventType.BALLHIDE, e);
            });
        }
        private hideConcent(e: egret.Event): void {
            console.log(e)
            egret.clearInterval(this.SinMyScore);
            egret.Tween.removeTweens(this.ballDoor);
            this.console.removeEventListener(egret.TouchEvent.TOUCH_END, this.startGame, this)
            this.console.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginMovePaddle, this);
            this.console.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.movePaddle, this);
            this.ballAnimation.animation.stop();
            this.ball_I.visible = true;
            if (e.data.bodyA.id == 1 || e.data.bodyB.id == 1) {
                this.test_lable.text = "球进啦~";
                this.ballBody.damping = 1;
                if (game.gameOnline == 1) {
                    this.WxGameFinish();
                } else if (game.gameOnline == 2) {
                    this.H5gameFinish();
                } else {

                }
            } else {
                this.ballBody.damping = 0.95;
                this.ballBody.angularDamping = 0.95;
                this.ballBody.angularVelocity = 10;
                this.ballBody.angle = 0;
                this.RobotPlayer == true ? this.RobotPlayer = false : this.RobotPlayer = true;
                egret.setTimeout(() => {
                    agf.EventMgr.dispatchEvent(agf.EventType.ROBOTBEGIN);
                }, this, 1500)
            }
        }


        private WxGameFinish(): void {
            this.test_lable.text = "";
            wx.triggerGC(); //加速微信垃圾回收
            Util.getInstance().ShowLoading("球进啦~~~");
            egret.setTimeout(() => {
                Util.getInstance().HideLoading();

                this.RobotPlayer == true ? this.RobotPlayer = false : this.RobotPlayer = true;
                agf.EventMgr.dispatchEvent(agf.EventType.ROBOTBEGIN);
            }, this, 1500)
        }
        private H5gameFinish(): void {
            egret.setTimeout(function () {
                this.test_lable.text = "";
                this.RobotPlayer == true ? this.RobotPlayer = false : this.RobotPlayer = true;
                agf.EventMgr.dispatchEvent(agf.EventType.ROBOTBEGIN);
            }, this, 1500)
        }

        private TheBallOut(): void {
            this.console.removeEventListener(egret.TouchEvent.TOUCH_END, this.startGame, this)
            this.console.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginMovePaddle, this);
            this.console.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.movePaddle, this);
            this.ballBody.position = [375 / this.factor, 1047 / this.factor]
            this.ballBody.velocity = [0, 0]; // 设置速度为30；
            this.ballAnimation.animation.stop();
            //动画就不销毁了， 因为已经存储在动画池子里了，下次调用会从池子里拿取，而不是新建 所以不用去销毁它，内存不会泄漏；
            this.ball_I.visible = true;
            egret.Tween.removeTweens(this.ballDoor);
            egret.clearInterval(this.SinMyScore);
            this.RobotPlayer == true ? this.RobotPlayer = false : this.RobotPlayer = true;
            console.log(this.RobotPlayer)
            agf.EventMgr.dispatchEvent(agf.EventType.ROBOTBEGIN);
        }
        /**解析球门位置 */
        private GuankaGuiji(roc: egret.DisplayObject): void {
            let tw: egret.Tween = egret.Tween.get(roc, { loop: true });
            let tarjectory: number[][] = this.ScenceManager.tarjectory;
            if (tarjectory.length > 0) {
                this.ballDoor.x = tarjectory[0][0];
                this.ballDoor.y = tarjectory[0][1];
                for (let i = 1; i < tarjectory.length; i++) {
                    tw.to({ x: tarjectory[i][0], y: tarjectory[i][1] }, 1500).call(
                        () => {
                            // console.log("四季冷暖是你", tarjectory[i][0], tarjectory[i][1]);
                            this.DoorIndex = i
                        }
                    )
                }
            } else { // 给个默认值，如果出错的话
                console.log("位置出错： 提供原始坐标")
                this.ballDoor.y = 255;
                this.ballDoor.x = 271;
                tw.to({ x: 634, y: 255 }, 2000)
                tw.to({ x: 20, y: 255 }, 4000)
                tw.to({ x: 271, y: 255 }, 2000)
            }
        }

        /**游戏结束 */
        private gameEnd(e: egret.Event): void {
            console.log("比赛结束");
            //比赛结束逻辑["todo"]
            egret.clearInterval(this.SinMyScore);
            this.SinMyScore = null;
            agf.EventMgr.removeEventListener(agf.EventType.PLAYEREND, this.gameEnd, this);
            agf.EventMgr.removeEventListener(agf.EventType.STARGAME, this.SinMyScoreStar, this);
            agf.EventMgr.removeEventListener(agf.EventType.ROBOTBEGIN, this.RobotBeginPlay, this);
        }

        /** 玩家开始踢球 */
        private SinMyScoreStar(): void {
            this.console.addEventListener(egret.TouchEvent.TOUCH_END, this.startGame, this)
            this.console.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginMovePaddle, this);
            this.console.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.movePaddle, this);
            this.SinMyScore = egret.setInterval(res => {
                this.myScoreTime -= 1;
                if (this.myScoreTime <= 0) {
                    agf.EventMgr.dispatchEvent(agf.EventType.PLAYEREND);
                }
            }, this, 1000);
        }

        private RobotPlaying(): void {
            let robot = this.ScenceManager.Robot;
            if (!robot) return;

            var timer: egret.Timer = new egret.Timer(10, Math.floor(robot.time * 1000 / 10));
            this.timer = timer;
            //注册事件侦听器
            timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
            //开始计时
            timer.start();
        }

        private timer: egret.Timer;
        private timerFunc(): void {
            if (this.ballDoor.x > this.ballBody.position[0] * this.factor) {
                this.ballBody.position[0] += 2 / this.factor;
            } else {
                this.ballBody.position[0] -= 2 / this.factor;
            }
        }
        private timerComFunc(): void {
            this.timer.stop();
            this.startGame();
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
            this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
            this.timer = null;
        }
        /**切换方法  */
        private RobotBeginPlay(): void {
            console.log(this.RobotPlayer)
            this.ballBody.position = [375 / this.factor, 1047 / this.factor];
            this.GuankaGuiji(this.ballDoor);
            if (!this.RobotPlayer) {
                agf.EventMgr.dispatchEvent(agf.EventType.STARGAME)
            }
            else {
                /**机器人开始踢球 */
                this.RobotPlaying();
            }
        }
    }
}