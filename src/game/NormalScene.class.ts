import {ScenesManager} from "../engine/ScenesManager.class";
import {Scene} from "../engine/Scene.class";
import * as PIXI from 'pixi.js';

// Class
export class NormalScene extends Scene {

    private buttonMachine: PIXI.Sprite;
    private tiles: PIXI.Texture;
    private slot: PIXI.Sprite;

    readonly STATE_ZERO:number = 0;
    readonly STATE_INIT:number = 1;
    readonly STATE_MOVING:number = 2;
    readonly STATE_CHECK_WIN:number = 3;
        
    readonly SLOT_NUMBER:number = 5;
    readonly INITIAL_X:number = 25;
    readonly TILE_HEIGHT:number = 100;
    readonly TILE_WIDTH:number = 100;
    readonly N_CYCLE:number = 5;
    readonly TOT_TILES:number= 7;

    private gameStatus:number = 0;
    private finalTileY:any = [];
    private slotSprite:any = [];
    private preChoosedPosition:any = [];
    readonly INC:any = [20,20,25,25,25];
    //private stage:any;
    //private renderer;
    
    constructor() {
        super();

        this.buttonMachine = new PIXI.Sprite(PIXI.Texture.fromImage("img/buttonMachine.png"));
        this.buttonMachine.on("mouseup", this.run);

        this.tiles = PIXI.Texture.fromImage("img/tiles.png");

        this.slot = new PIXI.Sprite(PIXI.Texture.fromImage("img/slot.png"));
       
        this.slot.position.x = 0;
        this.slot.position.y = 0;

        this.buttonMachine.position.x = 600;
        this.buttonMachine.position.y = 150;

        this.slot.scale.x = 1.5;
        this.slot.scale.y = 1.5;

        this.buttonMachine.interactive = true;
        //this.slot.interactive = true;
        //this.tiles.interactive = true;

        this.gameStatus = this.STATE_INIT;


        /*this.stage = new PIXI.Stage(0x000000);
        this.renderer = PIXI.autoDetectRenderer(
            window.screen.width, window.screen.height,
            {antialiasing: false, transparent: false, resolution: 1}  
        );*/

        //this.addChild(this.renderer.view);
        this.addChild(this.slot);
        this.addChild(this.buttonMachine);

        this.preChoosedPosition = [1,2,3,4,5];

        for(var i = 0; i < this.SLOT_NUMBER; i++) {
            this.slotSprite[i] = new PIXI.extras.TilingSprite(this.tiles, this.TILE_WIDTH, this.TILE_HEIGHT + 200);
            this.slotSprite[i].tilePosition.x = 0;
            this.slotSprite[i].tilePosition.y = (-this.preChoosedPosition[i] * this.TILE_HEIGHT);
            this.slotSprite[i].x = this.INITIAL_X + (i * 115);
            this.slotSprite[i].y = 250;
            this.addChild(this.slotSprite[i]);
        }

        this.interactive = true;
    }

    private run = () => {
        if (this.isPaused()) return;   
        this.startAnimation();      
        //this.is25Gold = true;
        //this.q1.texture = this.texture25Gold;
    }


    public update() {
        super.update();
      //  this.draw();
        //if (this.q1.alpha < 1) this.q1.alpha += 0.01;
        //else ScenesManager.goToScene('menu');
        //if (this.is25Gold == true && this.is50Gold == true && this.is100Gold == true) {
            //this.addChild(this.menu);
        //}
    }

    private goTo = () => {
        if (this.isPaused()) return;                
            ScenesManager.goToScene('menu');
    }

    private startAnimation = () => {
        if(this.gameStatus == this.STATE_INIT || this.gameStatus == this.STATE_CHECK_WIN ) {
            this.preChoosedPosition = this.getRandomPositions(); 
            for(var i = 0; i < this.SLOT_NUMBER; i++) {
                //preChoosedPosition[i] = getRandomInt(0,6);
                //console.info( "preChoosedPosition["+i+"]="+preChoosedPosition[i] );
                this.slotSprite[i].tilePosition.y = (-this.preChoosedPosition[i] * this.TILE_HEIGHT) + 10;
                this.finalTileY[i]= (this.N_CYCLE * this.TILE_HEIGHT * this.TOT_TILES);
                //console.info( "tilePosition.y["+i+"]="+slotSprite[i].tilePosition.y );
                //console.info( "finalTile["+i+"]="+finalTileY[i] );
            }
        this.gameStatus = this.STATE_MOVING;
        this.draw();
        }   
    }

    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    private getRandomInt(min:number, max:number):number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
        
    private getRandomPositions() {
        var x = this.getRandomInt(0, 100);
        if(x > 50) {
            x = this.getRandomInt(0, 6);
            return [x,x,x,x,x];
        }
        return [this.getRandomInt(0,6)
                , this.getRandomInt(0,6)
                , this.getRandomInt(0,6)
                , this.getRandomInt(0,6)
                , this.getRandomInt(0,6)];   
    }

    private draw = () => {
        //console.info("draw("+gameStatus+")");
        if(this.gameStatus == this.STATE_ZERO) {

            this.gameStatus = this.STATE_INIT;

        } else if(this.gameStatus == this.STATE_INIT) {
          //console.log("waiting start");
          this.gameStatus = this.STATE_CHECK_WIN;
          
      } else if(this.gameStatus == this.STATE_MOVING) {
        //console.log("moving");
        for(var i = 0; i< this.SLOT_NUMBER; i++) {
            if(this.finalTileY[i] > 0) {
                this.slotSprite[i].tilePosition.y = this.slotSprite[i].tilePosition.y + this.INC[i];
                this.finalTileY[i]= this.finalTileY[i] - this.INC[i];
                //console.info( "dec.finalTile["+i+"]="+finalTileY[i] );
            }            
         }
        if(this.finalTileY[0]-5 <= 0) {
            this.gameStatus = this.STATE_CHECK_WIN;            
        }
        
      //  this.gameStatus = this.STATE_CHECK_WIN;
          
      } else if(this.gameStatus == this.STATE_CHECK_WIN) {

        //console.log("checking win");
        var check = true;

        for(var i = 1; i < this.SLOT_NUMBER; i++) {
            if(this.preChoosedPosition[i] != this.preChoosedPosition[i-1]) {
                check = false;
            }
        }
        if(check) {
            alert("Congratulations, you won!");   
        }

        return; //no more animation
      }
      //renderer.render(stage);
      requestAnimationFrame(this.draw);
    }//draw

}

