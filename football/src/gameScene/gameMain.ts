/**
 * gameMain.ts
 * created by zhongxurui on 18.05.28
 * Copyright (c) 2018年 BjpengkaiGame. All rights reserved.
 */

namespace game {
    export class gameMin extends eui.Component {
        private shengya: eui.Image;
        private logo_db: eui.Group;
        private logowomen: eui.Group;
        public constructor() {
            super();
            this.skinName = "gameMin";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.OnAddStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.Remove, this);
        }

        private OnAddStage(): void {
            this.shengya.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoShengya, this);
            let logoAnimation: dragonBones.EgretArmatureDisplay = createDragonBones("logoanime");
            if (logoAnimation) {
                this.logo_db.addChild(logoAnimation);
                logoAnimation.x = this.logo_db.width / 2;
                logoAnimation.y = this.logo_db.height / 2;

                logoAnimation.animation.play(logoAnimation.animation.animationNames[0], 1);
                logoAnimation.animation.timeScale = 0.6;
            }
            let logoWumenAnimation: dragonBones.EgretArmatureDisplay = createDragonBones("girlidle");
            if (logoWumenAnimation) {
                this.logowomen.addChild(logoWumenAnimation);
                logoWumenAnimation.x = this.logowomen.width / 2;
                logoWumenAnimation.y = this.logowomen.height / 2 + 80;
                logoWumenAnimation.animation.play(logoWumenAnimation.animation.animationNames[0], 0);
            }
        }

        private gotoShengya(): void {
            // if () {

            // }
            this.parent.addChild(new game.chooseCountries);
            this.parent.removeChild(this);
        }

        private Remove(): void {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.OnAddStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.Remove, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoShengya, this);
        }
    }
}