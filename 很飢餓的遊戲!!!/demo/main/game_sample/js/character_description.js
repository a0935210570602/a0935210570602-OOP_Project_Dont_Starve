var Character_description = function(backpackList) {
    this.back_ground_picture = new Framework.Sprite(define.characterDescriptionPath + 'character_descript_scroll.png'); 
    this.character_image = new Framework.Sprite(define.characterDescriptionPath + 'character_image.png'); 
    this.experience_chart = new Framework.Sprite(define.characterDescriptionPath + 'experience_chart.png'); 
    this.character_level = 1;
    this.character_descruption = [];
    this.character_descruption[0] = new Framework.Sprite(define.characterDescriptionPath + 'health_point.png'); 
    this.character_descruption[1] = new Framework.Sprite(define.characterDescriptionPath + 'magic_point.png'); 
    this.character_descruption[2] = new Framework.Sprite(define.characterDescriptionPath + 'physical_attack.png'); 
    this.character_descruption[3] = new Framework.Sprite(define.characterDescriptionPath + 'magic_attack.png'); 
    this.character_descruption[4] = new Framework.Sprite(define.characterDescriptionPath + 'arrow_attack.png'); 
    this.character_descruption[5] = new Framework.Sprite(define.characterDescriptionPath + 'power.png'); 
    this.character_descruption[6] = new Framework.Sprite(define.characterDescriptionPath + 'intelligence.png'); 
    this.character_descruption[7] = new Framework.Sprite(define.characterDescriptionPath + 'defense.png'); 
    this.character_descruption[8] = new Framework.Sprite(define.characterDescriptionPath + 'skill.png'); 
    this.push_button = new Framework.Sprite(define.characterDescriptionPath + 'push_button.png'); 
    
    this.character_descruption_point = [];
    this.character_descruption_point[0] = 1;
    this.character_descruption_point[1] = 5;
    this.character_descruption_point[2] = 4;
    this.character_descruption_point[3] = 5;
    this.character_descruption_point[4] = 2;
    this.character_descruption_point[5] = 2;
    this.character_descruption_point[6] = 3;
    this.character_descruption_point[7] = 6;
    this.character_descruption_point[8] = 8;

    this.character_descruption_text = [];
    this.character_descruption_text[0] = "生命";
    this.character_descruption_text[1] = "魔力";
    this.character_descruption_text[2] = "物功";
    this.character_descruption_text[3] = "魔攻";
    this.character_descruption_text[4] = "弓攻";
    this.character_descruption_text[5] = "力量";
    this.character_descruption_text[6] = "智力";
    this.character_descruption_text[7] = "防禦";
    this.character_descruption_text[8] = "技巧";
    // for(var i=0;i<9;i++){
    //     this.character_descruption_point[i] = 6;
    // }
    this.push_button.scale = 0.5;
    this.back_ground_picture.scale = 3;
    this.character_image.scale = 0.75;
    this.experience_chart.scale = 4;
    this.capabilityt_point = 0;
    this.experience_chart.position = {x: 14*64, y: 2*64};  
    this.back_ground_picture.position = {x: 13*64, y: 7*64};    
    this.character_image.position = {x:11*64, y:4*64};

    this.character_current_experience = 0;
    this.character_levelup_experience = 10;
    for(var i=0;i<9;i++){
        this.character_descruption[i].scale = 0.6;
        if(i<5){
            this.character_descruption[i].position = {x: 8.5*64, y:7*64+i*80-48};
        }else{
            this.character_descruption[i].position = {x: 14*64, y:i*80};
        }
    }

    this.draw = function(ctx){
        this.back_ground_picture.draw(ctx);
        this.character_image.draw(ctx);
        for(var i=0;i<9;i++){
            this.character_descruption[i].draw(ctx);
            ctx.font = "bold 24px serif";
            ctx.fillStyle = "black";
            ctx.lineWidth = 2.5;
            ctx.fillText(this.character_descruption_text[i], this.character_descruption[i].position.x+55,  this.character_descruption[i].position.y+5);

            for(var j=0;j<this.character_descruption_point[i];j++){
                ctx.beginPath();
                ctx.rect(this.character_descruption[i].position.x+95 + j*25, this.character_descruption[i].position.y-10, 20, 15);
                if(this.character_descruption_point[i]<4){
                    ctx.fillStyle = "Red";
                }else if(this.character_descruption_point[i]<6){
                    ctx.fillStyle = "yellow";
                }else{
                    ctx.fillStyle = "Green";
                }
                ctx.fill();
                ctx.closePath();
            }
        }
        ctx.font = "bold 48px serif";
        ctx.fillStyle = "black";
        ctx.lineWidth = 2.5;
        ctx.fillText("Lv " + this.character_level, 10*64+20, 2*64);
        var experience_scale;
        if(this.experience == 0){
            experience_scale = -1;
        }else{
            experience_scale = 15/(this.character_levelup_experience/this.experience);
        }
        // console.log("experience = ",this.experience);
        // console.log("character_level = ",this.character_level);
        // console.log("character_levelup_experience = ",this.character_levelup_experience);

        for(var i=0;i<=experience_scale;i++){
            ctx.beginPath();
            ctx.rect(729+i*23, 98, 20, 30);
            ctx.fillStyle = "blue";
            ctx.fill();
            ctx.closePath();
        }
        this.experience_chart.draw(ctx);
        ctx.font = "bold 24px serif";
        ctx.fillStyle = "black";
        ctx.lineWidth = 2.5;
        ctx.fillText("( " + this.experience+" / "+ this.character_levelup_experience +")", 1135, 2*64-5);
        ctx.font = "bold 24px serif";
        ctx.fillStyle = "black";
        ctx.lineWidth = 2.5;
        ctx.fillText("能力值點數: "+this.capabilityt_point, 1135, 2*64-5);
        if(this.capabilityt_point!=0){
            for(var i=2;i<9;i++){
                this.push_button.position = {x:this.character_descruption[i].position.x-56, y:this.character_descruption[i].position.y};
                this.push_button.draw(ctx);
            }
        }
    }

    this.update = function(player){
        this.experience = player.experience;
        this.character_level = player.level;
        this.character_levelup_experience = player.levelup_experience;
        this.capabilityt_point = player.capabilityt_point;
    }
    this.isChangeCapability = function(which_capability){
        if(this.capabilityt_point!=0){

        }
    }
    this.click = function(e){
        // if(e.x >= 470 && e.x <=510){
        //     if(e.y >=540 && e.y<= 560){
        //         this.isChangeCapability(3);
        //     }else if(e.y >=622 && e.y<= 642){
        //         this.isChangeCapability(4);
        //     }else if(e.y >=700 && e.y<= 720){
        //         this.isChangeCapability(5);
        //     }
        // }else if(e.x >= 822 && e.x <=859){
        //     if(e.y >=382 && e.y<= 402){
        //         this.isChangeCapability(6);
        //     }else if(e.y >=461 && e.y<= 481){
        //         this.isChangeCapability(7);
        //     }else if(e.y >=622 && e.y<= 642){
        //         this.isChangeCapability(8);
        //     }else if(e.y >=700 && e.y<= 720){
        //         this.isChangeCapability(9);
        //     }
        // }
    }
};