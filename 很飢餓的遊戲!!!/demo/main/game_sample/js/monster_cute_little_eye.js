var Monster_cute_little_eye = function(map, options) {
    
    this.monster_cute_little_eye = new Framework.AnimationSprite({url:define.materialPath + 'monster_cute_litter_eye.png', col:3 , row:4 , loop:true , speed:12}); 
    this.monster_cute_little_eye.scale = 1.5;
    this.monster_cute_little_eye.index = 1;
    var PIXEL_CONST = 64;

    this.mapPosition = {x:0, y:0};
    this.walkTarget = {x:0, y:0};
    this.spritePosition = {x:0, y:0};
    this.constants = new Constants();
    this.map = map;
    this.isdieing = false;
    this.isdead = false;
    this.dieingCounter = 0;
    
    this.is_start = false;

    this.canWalking = true;

    this.StepMovedCallBack = [];

    this.isWalking = false;

    var m_monster = this;

    this.monsterDirection = this.constants.DirectionEnum.DOWN;

    this.walk = function(moveStep){
        if(this.isWalking === false){
            if(moveStep.x > 0){
                this.playerDirection = this.constants.DirectionEnum.RIGHT;
            }else if(moveStep.x <0){
                this.playerDirection = this.constants.DirectionEnum.LEFT;
            }

            if(moveStep.y > 0){
                this.playerDirection = this.constants.DirectionEnum.DOWN;
            }else if(moveStep.y < 0){
                this.playerDirection = this.constants.DirectionEnum.UP;
            }
            this.isWalking = true;
            this.walkTarget = {x:this.mapPosition.x + moveStep.x, y:this.mapPosition.y + moveStep.y};
            this.monster_cute_little_eye.start({ from: this.playerDirection * 3, to: this.playerDirection * 3 + 2, loop: true});
        }
    }

    this.die = function(){
        this.isdead = true;
    }

    this.stopWalk = function()
    {
        this.canWalking = false;
    }

    this.walkEnd = function(){    }

    var walkSpeed = 8;
    this.walkAlittle = function(){

        if(this.playerDirection === this.constants.DirectionEnum.DOWN){
            this.spritePosition = {x:this.spritePosition.x, y:this.spritePosition.y + walkSpeed};
        }
        else if(this.playerDirection === this.constants.DirectionEnum.LEFT){
            this.spritePosition = {x:this.spritePosition.x - walkSpeed, y:this.spritePosition.y};
        }
        else if(this.playerDirection === this.constants.DirectionEnum.RIGHT){
            this.spritePosition = {x:this.spritePosition.x + walkSpeed, y:this.spritePosition.y};
        }
        else if(this.playerDirection === this.constants.DirectionEnum.UP){
            this.spritePosition = {x:this.spritePosition.x, y:this.spritePosition.y - walkSpeed};
        }
    }

    this.update = function(){
        if(this.isdead ){ return; }
        this.monster_cute_little_eye.update();
        if(this.isWalking){
            if(this.walkTarget.x * PIXEL_CONST === this.spritePosition.x && this.walkTarget.y * PIXEL_CONST === this.spritePosition.y){
                this.isWalking = false;
                this.monster_cute_little_eye.stop();
                this.monster_cute_little_eye.index = this.playerDirection * 3 + 1;
                this.mapPosition = this.walkTarget;
                //callback
                for(var i=0; i<this.StepMovedCallBack.length; i++){
                    this.StepMovedCallBack[i](this);
                }
            }else{
                this.walkAlittle();
            }
        }else
        {
            if(this.canWalking)
            {
                this.randomWalk();
            }
        }
    }


    this.draw = function(ctx){
        if(this.isdead){ return; }
        var xx = 13 + this.mapPosition.x - this.map.playerPositionOnMap.x;
        var yy = 7 + this.mapPosition.y - this.map.playerPositionOnMap.y;

        this.monster_cute_little_eye.position = {x: xx*64, y: yy*64};
        if(this.is_start){
            this.monster_cute_little_eye.draw(ctx);
        }
    }
    var walkDir = 0;
    this.randomWalk = function()
    {
        //var randNum = Math.floor(Math.random() * 100);
        var randNum = Framework.Game._currentLevel.cycleCount % 553;
        walkDir++;
        var walkStep = {x:0,y:0}
        if(randNum % 117 == 0)
        {
            walkStep.x = 1
        }else if(randNum % 79 == 0)
        {
            walkStep.x = -1
        }else if(randNum % 133 == 0)
        {
            walkStep.y = 1
        }else if(randNum % 157 == 0)
        {
            walkStep.y = -1
        }else
        {
            walkDir = 0;
            return;
        }
        // this.walk(walkStep);
        // console.log(this.mapPosition.x,this.mapPosition.y );
        // console.log(this.map.playerPositionOnMap);

        if( Math.abs((this.mapPosition.x-this.map.playerPositionOnMap.x)) <6 &&　Math.abs((this.mapPosition.y-this.map.playerPositionOnMap.y)) <6){
            if(this.map.checkIsWalkAble(this.mapPosition.x + walkStep.x,this.mapPosition.y + walkStep.y))
            {
                // console.log("checkIsWalkAble");
                this.walk(walkStep);
                this.is_start = true;
            }
        }else{
            this.is_start = false;
        }
    }

    this.isWalkable  = function(is_start){
        console.log(this.mapPosition.x + walkStep.x,this.mapPosition.y + walkStep.y);
        // if(this.map.checkIsWalkAble(this.mapPosition.x + walkStep.x,this.mapPosition.y + walkStep.y))
        // {
        //     this.walk(walkStep);
        // }
        // this.is_start = is_start;
    }

};

Object.defineProperty(Monster_cute_little_eye.prototype, 'position', {
    get: function() {
        return this.mapPosition;
    },
    set: function(newValue) {
        this.mapPosition = newValue;
        this.spritePosition = {x:this.mapPosition.x * 64, y: this.mapPosition.y * 64};
    }
}); 

Object.defineProperty(Monster.prototype, 'isDead', {
    get: function() {
        return this.isdead;
    }
}); 