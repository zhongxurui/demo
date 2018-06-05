/**
 * career.ts
 * created by zhongxurui on 18.05.28
 * Copyright (c) 2018年 BjpengkaiGame. All rights reserved.
 */

namespace game {
    export class caree extends eui.Component {
        private test: eui.Image;
        public constructor() {
            super();
            this.skinName = "shengya";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddStage, this);
        }

        private onAddStage(): void {
            this.test.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoTest, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.Remove, this);
        }

        private gotoTest(): void {
            this.parent.addChild(new game.gamestar);
            this.parent.removeChild(this);
        }
        private Remove(): void {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.Remove, this);
            if (this.test.hasEventListener(egret.TouchEvent.TOUCH_TAP)) this.test.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoTest, this);
        }
    }
}