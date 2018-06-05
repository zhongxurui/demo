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
 * gameStar.ts
 * created by zhongxurui on 18.06.01
 * Copyright (c) 2018年 BjpengkaiGame. All rights reserved.
 */
var game;
(function (game) {
    var gamestar = (function (_super) {
        __extends(gamestar, _super);
        // private robot: any = null;
        function gamestar() {
            var _this = _super.call(this) || this;
            _this.myScoreTime = 30; //初始值为30
            _this.SinMyScore = null;
            _this.RobotScore = null;
            _this.DoorIndex = 0;
            _this._ScenceManager = new game.ScenceManager();
            _this.RobotPlayer = false;
            _this.factor = 30; //一像素 == 物理世界30
            _this.skinName = "gameStar";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        Object.defineProperty(gamestar.prototype, "ScenceManager", {
            get: function () { return this._ScenceManager; },
            enumerable: true,
            configurable: true
        });
        ;
        gamestar.prototype.onAddToStage = function () {
            var _this = this;
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
            var guankaData = game.GuankaConfig.filter(function (x) { return x.id == game.Curplayer.GuankaId; }).shift();
            this.ScenceManager.parse(guankaData); //初始化关卡管理器
            /**开场动画 */
            var tw = egret.Tween.get(this.gameStar);
            tw.to({ scaleX: 1, scaleY: 1, alpha: 1 }, 600)
                .wait(800)
                .to({ alpha: 0 }, 600)
                .wait(800)
                .call(function () {
                agf.EventMgr.dispatchEvent(agf.EventType.STARGAME);
                _this.GuankaGuiji(_this.ballDoor);
            });
        };
        gamestar.prototype.RemoveSelf = function () {
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
        };
        gamestar.prototype.CreateWorld = function () {
            var wd = new p2.World({ gravity: [0, 0] }); //创建物理世界 无重力；
            this.World = wd;
        };
        gamestar.prototype.CreateBall = function () {
            var self = this;
            var ballW = this.ball.width;
            var ballH = this.ball.height;
            var ballX = this.ball.x;
            var bally = this.ball.y;
            var ballR = ballW / 2;
            var ballshape = new p2.Circle({ radius: ballR / this.factor });
            var ballBody = new p2.Body({ position: [375 / this.factor, 1047 / this.factor], mass: 1 });
            ballBody.damping = 0.6;
            ballBody.type = p2.Body.DYNAMIC;
            this.ballShape = ballshape;
            this.ballBody = ballBody;
            ballBody.id = 5;
            ballBody.addShape(ballshape);
            this.World.addBody(ballBody);
        };
        gamestar.prototype.CreatDoor = function () {
            var wallTopShape = new p2.Box({ width: this.ballDoor.width / this.factor, height: 20 / this.factor });
            var wallTopBody = new p2.Body({ position: [(this.ballDoor.x + this.ballDoor.width / 2) / this.factor, this.ballDoor.y / this.factor], mass: 2 });
            wallTopBody.type = p2.Body.KINEMATIC;
            wallTopBody.addShape(wallTopShape);
            this.DoorBottom = wallTopBody;
            this.DoorBottomShape = wallTopShape;
            this.World.addBody(wallTopBody);
            wallTopBody.id = 1;
            var Doorleft = new p2.Box({ width: 10 / this.factor, height: this.ballDoor.height / this.factor });
            var DoorleftBody = new p2.Body({ position: [this.ballDoor.x / this.factor, (this.ballDoor.y + this.ballDoor.height / 2) / this.factor], mass: 2 });
            DoorleftBody.type = p2.Body.KINEMATIC;
            DoorleftBody.addShape(Doorleft);
            this.DoorLeft = DoorleftBody;
            this.DoorLeftShape = Doorleft;
            this.World.addBody(DoorleftBody);
            DoorleftBody.id = 2;
            var DoorRight = new p2.Box({ width: 10 / this.factor, height: 66 / this.factor });
            var DoorRightBody = new p2.Body({ position: [(this.ballDoor.x + this.ballDoor.width) / this.factor, (this.ballDoor.y + this.ballDoor.height / 2) / this.factor], mass: 2 });
            DoorRightBody.addShape(DoorRight);
            DoorRightBody.type = p2.Body.KINEMATIC;
            this.DoorRightShape = DoorRight;
            this.DoorRightBody = DoorRightBody;
            this.World.addBody(DoorRightBody);
            DoorRightBody.id = 3;
        };
        //P2调试
        gamestar.prototype.createDebugDraw = function () {
            this.debugSprite = new egret.Sprite();
            this.addChild(this.debugSprite);
            this.debugDraw = new p2DebugDraw(this.World, this.debugSprite);
        };
        gamestar.prototype.beginMovePaddle = function (e) {
            this.lastX = e.stageX;
        };
        gamestar.prototype.movePaddle = function (e) {
            var moveX = e.stageX - this.lastX;
            this.ballBody.position[0] += moveX / this.factor;
            this.lastX = e.stageX;
        };
        gamestar.prototype.UpdateView = function () {
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
            if (this.ball.x > 760 || this.ball.x < 0 || this.ball.y < -10)
                this.TheBallOut();
        };
        //改变物理材质
        gamestar.prototype.createMaterial = function () {
            var PaddleMaterial = new p2.Material(1);
            var BallMaterial = new p2.Material(2);
            var BallCollidePaddle = new p2.ContactMaterial(PaddleMaterial, BallMaterial);
            BallCollidePaddle.restitution = 0.6; //弹性系数
            BallCollidePaddle.friction = 1; //摩擦系数
            this.DoorBottomShape.material = PaddleMaterial;
            this.DoorLeftShape.material = PaddleMaterial;
            this.DoorRightShape.material = PaddleMaterial;
            this.ballShape.material = BallMaterial;
            this.World.addContactMaterial(BallCollidePaddle);
        };
        gamestar.prototype.startGame = function () {
            this.ballBody.damping = 0; //设置运动阻尼： 为0 
            this.ballBody.velocity = [0, -30]; // 设置速度为30；
            this.ball_I.visible = false;
            var ballAnimation = game.createDragonBones("football");
            if (ballAnimation) {
                this.ball.addChild(ballAnimation);
                ballAnimation.x = this.ball.width / 2;
                ballAnimation.y = this.ball.height / 2;
                ballAnimation.scaleX = 0.8;
                ballAnimation.scaleY = 0.8;
                ballAnimation.animation.play(ballAnimation.animation.animationNames[0], 0);
                this.ballAnimation = ballAnimation;
            }
        };
        //碰撞检测
        gamestar.prototype.hitListener = function () {
            var self = this;
            this.World.on("beginContact", function (e) {
                agf.EventMgr.dispatchEvent(agf.EventType.BALLHIDE, e);
            });
        };
        gamestar.prototype.hideConcent = function (e) {
            console.log(e);
            egret.clearInterval(this.SinMyScore);
            egret.Tween.removeTweens(this.ballDoor);
            this.console.removeEventListener(egret.TouchEvent.TOUCH_END, this.startGame, this);
            this.console.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginMovePaddle, this);
            this.console.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.movePaddle, this);
            this.ballAnimation.animation.stop();
            this.ball_I.visible = true;
            if (e.data.bodyA.id == 1 || e.data.bodyB.id == 1) {
                this.test_lable.text = "球进啦~";
                this.ballBody.damping = 1;
                if (game.gameOnline == 1) {
                    this.WxGameFinish();
                }
                else if (game.gameOnline == 2) {
                    this.H5gameFinish();
                }
                else {
                }
            }
            else {
                this.ballBody.damping = 0.95;
                this.ballBody.angularDamping = 0.95;
                this.ballBody.angularVelocity = 10;
                this.ballBody.angle = 0;
                this.RobotPlayer == true ? this.RobotPlayer = false : this.RobotPlayer = true;
                egret.setTimeout(function () {
                    agf.EventMgr.dispatchEvent(agf.EventType.ROBOTBEGIN);
                }, this, 1500);
            }
        };
        gamestar.prototype.WxGameFinish = function () {
            var _this = this;
            this.test_lable.text = "";
            wx.triggerGC(); //加速微信垃圾回收
            game.Util.getInstance().ShowLoading("球进啦~~~");
            egret.setTimeout(function () {
                game.Util.getInstance().HideLoading();
                _this.RobotPlayer == true ? _this.RobotPlayer = false : _this.RobotPlayer = true;
                agf.EventMgr.dispatchEvent(agf.EventType.ROBOTBEGIN);
            }, this, 1500);
        };
        gamestar.prototype.H5gameFinish = function () {
            egret.setTimeout(function () {
                this.test_lable.text = "";
                this.RobotPlayer == true ? this.RobotPlayer = false : this.RobotPlayer = true;
                agf.EventMgr.dispatchEvent(agf.EventType.ROBOTBEGIN);
            }, this, 1500);
        };
        gamestar.prototype.TheBallOut = function () {
            this.console.removeEventListener(egret.TouchEvent.TOUCH_END, this.startGame, this);
            this.console.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginMovePaddle, this);
            this.console.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.movePaddle, this);
            this.ballBody.position = [375 / this.factor, 1047 / this.factor];
            this.ballBody.velocity = [0, 0]; // 设置速度为30；
            this.ballAnimation.animation.stop();
            //动画就不销毁了， 因为已经存储在动画池子里了，下次调用会从池子里拿取，而不是新建 所以不用去销毁它，内存不会泄漏；
            this.ball_I.visible = true;
            egret.Tween.removeTweens(this.ballDoor);
            egret.clearInterval(this.SinMyScore);
            this.RobotPlayer == true ? this.RobotPlayer = false : this.RobotPlayer = true;
            console.log(this.RobotPlayer);
            agf.EventMgr.dispatchEvent(agf.EventType.ROBOTBEGIN);
        };
        /**解析球门位置 */
        gamestar.prototype.GuankaGuiji = function (roc) {
            var _this = this;
            var tw = egret.Tween.get(roc, { loop: true });
            var tarjectory = this.ScenceManager.tarjectory;
            if (tarjectory.length > 0) {
                this.ballDoor.x = tarjectory[0][0];
                this.ballDoor.y = tarjectory[0][1];
                var _loop_1 = function (i) {
                    tw.to({ x: tarjectory[i][0], y: tarjectory[i][1] }, 1500).call(function () {
                        // console.log("四季冷暖是你", tarjectory[i][0], tarjectory[i][1]);
                        _this.DoorIndex = i;
                    });
                };
                for (var i = 1; i < tarjectory.length; i++) {
                    _loop_1(i);
                }
            }
            else {
                console.log("位置出错： 提供原始坐标");
                this.ballDoor.y = 255;
                this.ballDoor.x = 271;
                tw.to({ x: 634, y: 255 }, 2000);
                tw.to({ x: 20, y: 255 }, 4000);
                tw.to({ x: 271, y: 255 }, 2000);
            }
        };
        /**游戏结束 */
        gamestar.prototype.gameEnd = function (e) {
            console.log("比赛结束");
            //比赛结束逻辑["todo"]
            egret.clearInterval(this.SinMyScore);
            this.SinMyScore = null;
            agf.EventMgr.removeEventListener(agf.EventType.PLAYEREND, this.gameEnd, this);
            agf.EventMgr.removeEventListener(agf.EventType.STARGAME, this.SinMyScoreStar, this);
            agf.EventMgr.removeEventListener(agf.EventType.ROBOTBEGIN, this.RobotBeginPlay, this);
        };
        /** 玩家开始踢球 */
        gamestar.prototype.SinMyScoreStar = function () {
            var _this = this;
            this.console.addEventListener(egret.TouchEvent.TOUCH_END, this.startGame, this);
            this.console.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginMovePaddle, this);
            this.console.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.movePaddle, this);
            this.SinMyScore = egret.setInterval(function (res) {
                _this.myScoreTime -= 1;
                if (_this.myScoreTime <= 0) {
                    agf.EventMgr.dispatchEvent(agf.EventType.PLAYEREND);
                }
            }, this, 1000);
        };
        gamestar.prototype.RobotPlaying = function () {
            var robot = this.ScenceManager.Robot;
            if (!robot)
                return;
            var timer = new egret.Timer(10, Math.floor(robot.time * 1000 / 10));
            this.timer = timer;
            //注册事件侦听器
            timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
            //开始计时
            timer.start();
        };
        gamestar.prototype.timerFunc = function () {
            if (this.ballDoor.x > this.ballBody.position[0] * this.factor) {
                this.ballBody.position[0] += 2 / this.factor;
            }
            else {
                this.ballBody.position[0] -= 2 / this.factor;
            }
        };
        gamestar.prototype.timerComFunc = function () {
            this.timer.stop();
            this.startGame();
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
            this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
            this.timer = null;
        };
        /**切换方法  */
        gamestar.prototype.RobotBeginPlay = function () {
            console.log(this.RobotPlayer);
            this.ballBody.position = [375 / this.factor, 1047 / this.factor];
            this.GuankaGuiji(this.ballDoor);
            if (!this.RobotPlayer) {
                agf.EventMgr.dispatchEvent(agf.EventType.STARGAME);
            }
            else {
                /**机器人开始踢球 */
                this.RobotPlaying();
            }
        };
        return gamestar;
    }(eui.Component));
    game.gamestar = gamestar;
    __reflect(gamestar.prototype, "game.gamestar");
})(game || (game = {}));
//# sourceMappingURL=gameStar.js.map