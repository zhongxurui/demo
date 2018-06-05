/**
 * 
 * 创建骨骼动画 
/**
 * DB.ts
 * created by zhongxurui on 18.05.28
 * Copyright (c) 2018年 BjpengkaiGame. All rights reserved.
 */

namespace game {
    /**
     * 创建骨骼动画
     */
    class DragonboneCacheObject {
        public armature: dragonBones.EgretArmatureDisplay = null;
        public name: string;
    }
    let anim_cache_pool: DragonboneCacheObject[] = [];

    function get_cached_anim(name: string): dragonBones.EgretArmatureDisplay {
        let obj: DragonboneCacheObject = anim_cache_pool.filter(x => { return x.name == name }).shift();
        if (obj) return obj.armature;
        return null;
    }
    export function createDragonBones(name: string): dragonBones.EgretArmatureDisplay {

        let animation: dragonBones.EgretArmatureDisplay = get_cached_anim(name);
        if (animation) {
            // console.log("拿取已有的animation： ", animation)
            return animation
        };

        let dragonBonesDatas = RES.getRes(name + "_ske_json");
        let textureData = RES.getRes(name + "_tex_json");
        let texture = RES.getRes(name + "_png");
        // console.log(dragonBonesDatas, textureData, texture)
        try {
            let egretFactory: dragonBones.EgretFactory = dragonBones.EgretFactory.factory;
            egretFactory.parseDragonBonesData(dragonBonesDatas);
            egretFactory.parseTextureAtlasData(textureData, texture);

            let armatureDisplay: dragonBones.EgretArmatureDisplay = egretFactory.buildArmatureDisplay(name);
            let cache_obj: DragonboneCacheObject = new DragonboneCacheObject();
            cache_obj.name = name;
            cache_obj.armature = armatureDisplay;
            anim_cache_pool.push(cache_obj);
            return armatureDisplay;
        } catch (e) {
            egret.warn('create dragonBones Res is null');
            return;
        }
    }
}
