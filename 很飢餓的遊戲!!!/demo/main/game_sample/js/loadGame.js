//立即執行函式, 並封裝所有變數避免衝突
var loadGameEnd;
(function(){
    //動態依序載入JS
    //ref: http://blog.darkthread.net/blogs/darkthreadtw/archive/2009/01/15/4061.aspx
    var  importJS = function(jsConf, src, lookFor) {
        var headID = document.getElementsByTagName("head")[0]; 
        var newJs = document.createElement('script');
        newJs.type = 'text/javascript';
        newJs.src= jsConf[0].src;
        headID.appendChild(newJs);
        wait_for_script_load(jsConf, function() {
            jsConf.splice(0, 1);
            if(jsConf.length > 0) {
                importJS(jsConf, lookFor);
				if(typeof blanket != "undefined"){
					blanket.utils.cache[jsConf[0].src] = {};
					blanket.utils.attachScript({url: jsConf[0].src}, function (content) {
						blanket.instrument({inputFile: content, inputFileName: jsConf[0].src},function (instrumented) {
							blanket.utils.cache[jsConf[0].src].loaded = true;
							blanket.utils.blanketEval(instrumented);
							blanket.requiringFile(jsConf[0].src, true);
						});
					});	
				}
            }else
            {
                loadGameEnd = true;
            }
        });
    }
    var wait_for_script_load = function(jsConf, callback) {
        var interval = setInterval(function() {
            if (typeof jsConf[0].lookFor === 'undefined') {
                jsConf[0].lookFor = '';
            }
            if (jsConf[0].lookFor === '') {
                clearInterval(interval);
                callback();
            } else if (eval("typeof " + jsConf[0].lookFor) !== 'undefined') {
                    clearInterval(interval);
                    callback();      
                }
            }, 50);
    }
    //陣列和載入JS檔的順序相同, lookFor為在要載入的檔案中, 
    //有用到的全域變數, importJS這個function, 會在找到lookFor的變數後
    //才會繼續loading下一個檔案, 如果沒有需要lookFor, 則以空字串代表
    var listScript = 
    [
        { src: 'game_sample/js/define.js', lookFor: 'define' },
        { src: 'game_sample/js/myMenu.js', lookFor: 'MyMenu' },
        { src: 'game_sample/js/myMenu_tutorial.js', lookFor: 'MyMenu_tutorial' },
        { src: 'game_sample/js/myMenu_gameteam.js', lookFor: 'MyMenu_gameteam' },
        { src: 'game_sample/js/constants.js', lookFor: 'Constants' },
        { src: 'game_sample/js/score.js', lookFor: 'Score' },
        { src: 'game_sample/js/bombMan.js', lookFor: 'BombMan' },
        { src: 'game_sample/js/food_base.js', lookFor: 'Food_base' },
        { src: 'game_sample/js/item_lamp.js', lookFor: 'Item_lamp' },
        { src: 'game_sample/js/map_item_tree.js', lookFor: 'Map_item_tree' },
        { src: 'game_sample/js/item_grass.js', lookFor: 'Item_grass' },
        { src: 'game_sample/js/item_grass_picked.js', lookFor: 'Item_grass_picked' },
        { src: 'game_sample/js/item_rope.js', lookFor: 'Item_rope' },
        { src: 'game_sample/js/item_stone.js', lookFor: 'Item_stone' },
        { src: 'game_sample/js/item_droplet.js', lookFor: 'Item_droplet' },
        { src: 'game_sample/js/item_bee_sting.js', lookFor: 'Item_bee_sting' },
        { src: 'game_sample/js/item_gold.js', lookFor: 'Item_gold' },
        { src: 'game_sample/js/item_bush.js', lookFor: 'Item_bush' },
        { src: 'game_sample/js/item_ice.js', lookFor: 'Item_ice' },
        { src: 'game_sample/js/item_armor.js', lookFor: 'Item_armor' },
        { src: 'game_sample/js/item_wood_armor.js', lookFor: 'Item_wood_armor' },
        { src: 'game_sample/js/item_helmat.js', lookFor: 'Item_helmat' },
        { src: 'game_sample/js/item_flint.js', lookFor: 'Item_flint' },
        { src: 'game_sample/js/item_pigskin.js', lookFor: 'Item_pigskin' },
        { src: 'game_sample/js/item_snow_ball.js', lookFor: 'Item_snow_ball' },
        { src: 'game_sample/js/item_space_wand.js', lookFor: 'Item_space_wand' },
        { src: 'game_sample/js/item_king_wand.js', lookFor: 'Item_king_wand' },
        { src: 'game_sample/js/item_wood.js', lookFor: 'Item_wood' },
        { src: 'game_sample/js/item_campfire.js', lookFor: 'Item_campfire' },
        { src: 'game_sample/js/item_camp.js', lookFor: 'Item_camp' },
        { src: 'game_sample/js/item_firebundle.js', lookFor: 'Item_firebundle' },
        { src: 'game_sample/js/item_flower.js', lookFor: 'Item_flower' },
        { src: 'game_sample/js/item_flower_picked.js', lookFor: 'Item_flower_picked' },
        { src: 'game_sample/js/item_berry.js', lookFor: 'Item_berry' },
        { src: 'game_sample/js/item_black_berry.js', lookFor: 'Item_black_berry' },
        { src: 'game_sample/js/item_waikei_homework.js', lookFor: 'Item_waikei_homework' },
        { src: 'game_sample/js/item_spider_web.js', lookFor: 'Item_spider_web' },
        { src: 'game_sample/js/item_flower_growed_dig.js', lookFor: 'Item_flower_growed_dig' },
        { src: 'game_sample/js/item_honey.js', lookFor: 'Item_honey' },
        { src: 'game_sample/js/item_meat.js', lookFor: 'Item_meat' },
        { src: 'game_sample/js/item_monster_meat.js', lookFor: 'Item_monster_meat' },
        { src: 'game_sample/js/item_flower_growed_dig.js', lookFor: 'Item_flower_growed_dig' },
        { src: 'game_sample/js/item_sapling.js', lookFor: 'Item_sapling' },
        { src: 'game_sample/js/item_grass_growed_dig.js', lookFor: 'Item_grass_growed_dig' },
        { src: 'game_sample/js/item_bush_growed_dig.js', lookFor: 'Item_bush_growed_dig' },
        { src: 'game_sample/js/item_sapling_growed_dig.js', lookFor: 'Item_sapling_growed_dig' },
        { src: 'game_sample/js/item_sapling_dig.js', lookFor: 'Item_sapling_dig' },
        { src: 'game_sample/js/drama0.js', lookFor: 'Drama0' },
        { src: 'game_sample/js/item_blank.js', lookFor: 'Item_blank' },
        { src: 'game_sample/js/item_tree_dig.js', lookFor: 'Item_tree_dig' },
        { src: 'game_sample/js/item_bush_dig.js', lookFor: 'Item_bush_dig' },
        { src: 'game_sample/js/item_grass_dig.js', lookFor: 'Item_grass_dig' },
        { src: 'game_sample/js/item_flower_dig.js', lookFor: 'Item_flower_dig' },
        { src: 'game_sample/js/item_branch.js', lookFor: 'Item_branch' },
        { src: 'game_sample/js/character_description.js', lookFor: 'Character_description' },
        { src: 'game_sample/js/synthesisBar.js', lookFor: 'SynthesisBar' },
        { src: 'game_sample/js/equipmentBar.js', lookFor: 'EquipmentBar' },
        { src: 'game_sample/js/clock.js', lookFor: 'Clock' },
        { src: 'game_sample/js/backpack.js', lookFor: 'Backpack' },
        { src: 'game_sample/js/level2_change.js', lookFor: 'Level2_change' },
        { src: 'game_sample/js/handle_initial_character.js', lookFor: 'Handle_initial_character' },
        { src: 'game_sample/js/skill_handler.js', lookFor: 'Skill_handler' },
        { src: 'game_sample/js/spear_handler.js', lookFor: 'Spear_handler' },
        { src: 'game_sample/js/skill_timer.js', lookFor: 'Skill_timer' },
        { src: 'game_sample/js/flying_arror.js', lookFor: 'Flying_arror' },
        { src: 'game_sample/js/player_hide_animation.js', lookFor: 'Player_hide_animation' },
        { src: 'game_sample/js/proxy.js', lookFor: 'Proxy' },
        { src: 'game_sample/js/object_factory.js', lookFor: 'Object_factory' },
        { src: 'game_sample/js/weapon.js', lookFor: 'Weapon' },
        { src: 'game_sample/js/tool.js', lookFor: 'Tool' },
        { src: 'game_sample/js/reduceDurabilityVisitor.js', lookFor: 'ReduceDurabilityVisitor' },
        { src: 'game_sample/js/normal_attack.js', lookFor: 'Normal_attack' },
        { src: 'game_sample/js/magic_attack.js', lookFor: 'Magic_attack' },
        { src: 'game_sample/js/arror_attack.js', lookFor: 'Arror_attack' },
        { src: 'game_sample/js/null_attack.js', lookFor: 'Null_attack' },
        { src: 'game_sample/js/handle_game_over.js', lookFor: 'Handle_game_over' },
        { src: 'game_sample/js/monster_base.js', lookFor: 'Monster_base' },
        { src: 'game_sample/js/monster_bat.js', lookFor: 'Monster_bat' },
        { src: 'game_sample/js/bat_wing.js', lookFor: 'Bat_wing' },
        { src: 'game_sample/js/item_eyeball.js', lookFor: 'Item_eyeball' },
        { src: 'game_sample/js/monster_pig.js', lookFor: 'Monster_pig' },
        { src: 'game_sample/js/monster_cow.js', lookFor: 'Monster_cow' },
        { src: 'game_sample/js/monster_bee.js', lookFor: 'Monster_bee' },
        { src: 'game_sample/js/monster_cute_little_eye.js', lookFor: 'Monster_cute_little_eye' },
        { src: 'game_sample/js/monster_boss.js', lookFor: 'Monster_boss' },
        { src: 'game_sample/js/map_selector.js', lookFor: 'Map_selector' },
        { src: 'game_sample/js/local_map_0.js', lookFor: 'Local_map_0' },
        { src: 'game_sample/js/fishing.js', lookFor: 'Fishing' },
        { src: 'game_sample/js/item_fish.js', lookFor: 'Item_fish' },
        { src: 'game_sample/js/item_fake.js', lookFor: 'Item_fake' },
        { src: 'game_sample/js/npc1.js', lookFor: 'Npc1' },
        { src: 'game_sample/js/npc2.js', lookFor: 'Npc2' },
        { src: 'game_sample/js/npc_event.js', lookFor: 'Npc_event' },
        { src: 'game_sample/js/building_remance.js', lookFor: 'Building_remance' },
        { src: 'game_sample/js/creation_blood_status.js', lookFor: 'Creation_blood_status' },
        { src: 'game_sample/js/game_object_detail.js', lookFor: 'Game_object_detail' },
        { src: 'game_sample/js/level_up_animation.js', lookFor: 'Level_up_animation' },
        { src: 'game_sample/js/world_map.js', lookFor: 'World_map' },
        { src: 'game_sample/js/gameOver.js', lookFor: 'GameOver' },
        { src: 'game_sample/js/mainGame.js'}
    ]
    importJS(listScript);
})();