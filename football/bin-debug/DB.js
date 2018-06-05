/**
 *
 * 创建骨骼动画
/**
 * DB.ts
 * created by zhongxurui on 18.05.28
 * Copyright (c) 2018年 BjpengkaiGame. All rights reserved.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     * 创建骨骼动画
     */
    var DragonboneCacheObject = (function () {
        function DragonboneCacheObject() {
            this.armature = null;
        }
        return DragonboneCacheObject;
    }());
    __reflect(DragonboneCacheObject.prototype, "DragonboneCacheObject");
    var anim_cache_pool = [];
    function get_cached_anim(name) {
        var obj = anim_cache_pool.filter(function (x) { return x.name == name; }).shift();
        if (obj)
            return obj.armature;
        return null;
    }
    function createDragonBones(name) {
        var animation = get_cached_anim(name);
        if (animation) {
            // console.log("拿取已有的animation： ", animation)
            return animation;
        }
        ;
        var dragonBonesDatas = RES.getRes(name + "_ske_json");
        var textureData = RES.getRes(name + "_tex_json");
        var texture = RES.getRes(name + "_png");
        // console.log(dragonBonesDatas, textureData, texture)
        try {
            var egretFactory = dragonBones.EgretFactory.factory;
            egretFactory.parseDragonBonesData(dragonBonesDatas);
            egretFactory.parseTextureAtlasData(textureData, texture);
            var armatureDisplay = egretFactory.buildArmatureDisplay(name);
            var cache_obj = new DragonboneCacheObject();
            cache_obj.name = name;
            cache_obj.armature = armatureDisplay;
            anim_cache_pool.push(cache_obj);
            return armatureDisplay;
        }
        catch (e) {
            egret.warn('create dragonBones Res is null');
            return;
        }
    }
    game.createDragonBones = createDragonBones;
})(game || (game = {}));
//# sourceMappingURL=DB.js.map