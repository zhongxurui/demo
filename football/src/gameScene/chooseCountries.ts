/**
 * chooseCountries.ts
 * created by zhongxurui on 18.05.28
 * Copyright (c) 2018年 BjpengkaiGame. All rights reserved.
 */
namespace game {

    const enum Choose_Tab {
        European = 0, //欧洲 
        Africa, //非洲
        Americas, //美洲
        Asia,  // 亚洲
    };
    export class chooseCountries extends eui.Component {

        private tab: eui.TabBar;
        private list: eui.List;
        private items: any;
        private ItemChoose: eui.Group;
        private cencel: eui.Group;
        private zhezhao: eui.Rect;
        private chooseImage: eui.Image;
        private chooseLable: eui.Label;
        private determine: eui.Group;
        public constructor() {
            super();
            this.skinName = "chooseCountries";
            this.ItemChoose.visible = false;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.OnAddStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.Remove, this);
        }

        private OnAddStage(): void {
            this.list.itemRenderer = chooseList;
            this.list.dataProvider = new eui.ArrayCollection(config.CountriesData.European);
            this.tab.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChanged, this);
            this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.showItemchoose, this);
            this.cencel.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { this.ItemChoose.visible = false }, this);
            this.zhezhao.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { this.ItemChoose.visible = false }, this);
            this.determine.addEventListener(egret.TouchEvent.TOUCH_TAP, this.thisOk, this);
        }

        private Remove(): void {
            console.log("移除页面")
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.OnAddStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.Remove, this);
            this.tab.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChanged, this);
            this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.showItemchoose, this);
            this.cencel.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { this.ItemChoose.visible = false }, this);
            this.zhezhao.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { this.ItemChoose.visible = false }, this);
            this.determine.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.thisOk, this);
        }

        private onTabChanged(e: eui.ItemTapEvent): void {
            this.showTab(e.itemIndex);
        }

        private showTab(t: Choose_Tab) {
            switch (t) {
                case Choose_Tab.European:
                    this.list.dataProvider = new eui.ArrayCollection(config.CountriesData.European);
                    break;
                case Choose_Tab.Africa:
                    this.list.dataProvider = new eui.ArrayCollection(config.CountriesData.Africa);
                    break;
                case Choose_Tab.Americas:
                    this.list.dataProvider = new eui.ArrayCollection(config.CountriesData.Americas);
                    break;
                case Choose_Tab.Asia:
                    this.list.dataProvider = new eui.ArrayCollection(config.CountriesData.Asia);
                    break;
            }
        }
        private showItemchoose(e: eui.ItemTapEvent): void {
            // console.log("选择了那个球队", e.item);
            if (!e.item) return;
            this.chooseLable.text = e.item.name;
            this.chooseImage.source = e.item.logo;
            this.ItemChoose.visible = true;
        }

        private thisOk(): void {
            // [need todo]
            
            this.parent.addChild(new game.caree);
            this.parent.removeChild(this);
        }
    }

    class chooseList extends eui.ItemRenderer {
        constructor() {
            super();
            this.skinName = 'ChooseList';
        }
    }
}