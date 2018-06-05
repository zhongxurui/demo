/**
 * game.ts
 * created by zhongxurui on 18.6.01
 * Copyright (c) 2018年 BjpengkaiGame. All rights reserved.
 */
/** 全局文件 类似于微信小程序 中的 app.js**/
namespace game {
	export const INSTRING: string = "-1"; //定义一个无效类型 
	export const INNUMBER: number = -1;  // 定义一个整形类型
	export const enum Online {  //定义一个枚举值 用来区分当前环境
		wx = 1, // 微信环境 1
		h5 = 2, // h5环境  2
	}
	export let gameOnline: number = INNUMBER; // 游戏环境标识
	export let Md5: md5;  // md5加密方式

	export let GuankaConfig: any = null;
	/**
   * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
   * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
   */
	export function createBitmapByName(name: string): egret.Bitmap {
		let result = new egret.Bitmap();
		let texture: egret.Texture = RES.getRes(name);
		result.texture = texture;
		return result;
	}
}

//自定义事件机制
namespace agf {
	/** 事件管理器，提供全局事件的相关接口。 */
	var handler = new egret.EventDispatcher();
	export class EventMgr {
		/** 添加事件listener */
		static addEventListener(type: string, callback: Function, thisObj: any): void {
			handler.addEventListener(type, callback, thisObj);
		};
		/** 移除事件listener */
		static removeEventListener(type: string, callback: Function, thisObj: any): void {
			handler.removeEventListener(type, callback, thisObj);
		};
		// /** 触发事件 */
		static dispatchEvent(type: string, data?: any): void {
			if (data === 0) { data = null };
			handler.dispatchEventWith(type, false, data);
		};
	}
	/**自定义事件类型 */
	export const EventType = {
		PLAYEREND: "PlayerEnd", //游戏结束
		STARGAME: "stargame",  // 游戏开始
		ROBOTBEGIN:  "RObotBegin", //机器人开始游戏
		BALLHIDE: "ballhide",//
	}
}
