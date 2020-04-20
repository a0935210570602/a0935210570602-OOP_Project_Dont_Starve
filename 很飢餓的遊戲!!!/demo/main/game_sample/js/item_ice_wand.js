var Item_ice_wand = function() {
    this.item_ice_wand = new Framework.Sprite(define.materialPath + 'item_ice_wand.png'); 
    this.item_ice_wand.scale = 2;
    this.mapPosition = {x:0, y:0};
    this.status = true;
    this.isRegenerate = false;
    this.item_num = 30;
    //equipment: 可入裝備欄的物件 material: 可堆疊的基本物件 tool: 不可堆疊的其他物件 food: 可堆疊的食物
    this.type = "equipment";
    //可疊加物件有amount 不可疊加有durability
    this.durability = 100;
    this.place = "hand";
    this.inEquipmentbar = false;
    this.item_can_be_picked = true;
    this.attack_point = 2;

    this.update = function(){
        this.status = false;
    }

    this.draw = function(ctx){
        this.item_ice_wand.draw(ctx);
    }

};

Object.defineProperty(Item_ice_wand.prototype, 'position', {
    get: function() {
        return this.mapPosition;
    },
    set: function(newValue) {
        this.mapPosition = newValue;
        this.item_ice_wand.position = {x: this.mapPosition.x * 64, y: this.mapPosition.y * 64};
    }
}); 
