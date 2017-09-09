import {ScenesManager} from "../engine/ScenesManager.class";
import {Scene} from "../engine/Scene.class";
import {RuleAllSpinsMatch} from "./RuleAllSpinsMatch.class";
import * as PIXI from 'pixi.js';

// Class
export class NormalScene extends Scene {

    private buttonMachine: PIXI.Sprite;
    private tiles: PIXI.Texture;
    private slot: PIXI.Sprite;
    private buttonBonus: PIXI.Sprite;
    private spinText: PIXI.Text;
    private freeSpinText: PIXI.Text;
    private styleText: PIXI.TextStyle;

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
    readonly SPIN_NUMBER:number = 5;

    private gameStatus:number = 0;
    private spin:number = this.SPIN_NUMBER;
    private finalTileY:any = [];
    private slotSprite:any = [];
    private preChoosedPosition:any = [];
    readonly INC:any = [20,20,25,25,25];
    private stopUpdate:any = false;
    
    constructor() {
        super();

        this.buttonBonus = new PIXI.Sprite(PIXI.Texture.fromImage("img/buttonBonus.png"));
        this.buttonBonus.on("mouseup", this.getBonus);

        this.buttonMachine = new PIXI.Sprite(PIXI.Texture.fromImage("img/buttonMachine.png"));
        this.buttonMachine.on("mouseup", this.run);

        this.tiles = PIXI.Texture.fromImage("img/tiles.png");

        this.slot = new PIXI.Sprite(PIXI.Texture.fromImage("img/slot.png"));

        this.spinText = new PIXI.Text(String(this.spin));
        this.spinText.x = 250;
        this.spinText.y = 50;

        this.freeSpinText = new PIXI.Text(String(this.spin));
        this.freeSpinText.x = 0;
        this.freeSpinText.y = ScenesManager.defaultHeight/2;
       
        this.slot.position.x = 0;
        this.slot.position.y = 0;

        this.buttonMachine.position.x = 600;
        this.buttonMachine.position.y = 150;

        this.buttonBonus.position.x = 150;
        this.buttonBonus.position.y = 400;

        this.slot.scale.x = 1.5;
        this.slot.scale.y = 1.5;

        this.buttonMachine.interactive = true;
        this.buttonBonus.interactive = true;

        this.gameStatus = this.STATE_ZERO;
        this.addChild(this.slot);
        this.addChild(this.buttonMachine);
        this.addChild(this.spinText);

        this.preChoosedPosition = [1,3,2,5,4];

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
        if (this.spin > 0) {
            this.spin -= 1;
            this.freeSpinText.text = "";
            this.startAnimation();      
        } else {
            this.freeSpinText.text = "There are no spins";
        }
    }

    private getBonus = () => {
         if (this.isPaused()) return;
         ScenesManager.goToScene('bonus');
         this.removeChild(this.buttonBonus);
    }


    public update() {
        super.update();

        if (!this.stopUpdate) {
            this.draw();
        }
    }

    /*private goTo = () => {
        if (this.isPaused()) return;                
            ScenesManager.goToScene('menu');
    }*/

    private startAnimation = () => {
        if(this.gameStatus == this.STATE_INIT || this.gameStatus == this.STATE_CHECK_WIN ) {
            this.stopUpdate = false;    
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
            return [1,3,2,3,3];
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

            this.moving();
          
      } else if(this.gameStatus == this.STATE_CHECK_WIN) {

        var checkWin = true;
        var checkBonus = false;
        var checkFreeSpin = false;

        // check win
        checkWin = RuleAllSpinsMatch.checkWin(this.preChoosedPosition,this.SLOT_NUMBER);
        this.stopUpdate = checkWin;
        if (!checkWin) {
            // check win (main-diagonal line 3x3)
            checkWin = RuleAllSpinsMatch.checkWinMainDiagonalLine(this.preChoosedPosition,this.SLOT_NUMBER);
            this.stopUpdate = checkWin;
        }
        if (!checkWin) {
            // check win (sub-diagonal line 3x3)
            checkWin = RuleAllSpinsMatch.checkWinSubDiagonalLine(this.preChoosedPosition,this.SLOT_NUMBER);
            this.stopUpdate = checkWin;
        }

        this.preChoosedPosition[0] = (this.preChoosedPosition[0] == 0?7:this.preChoosedPosition[0]);
        if (!checkWin) {
            // check bonus (main-diagonal line 5x5)
            checkBonus = RuleAllSpinsMatch.checkBonusMainDiagonalLine(this.preChoosedPosition,this.SLOT_NUMBER);
            this.stopUpdate = checkBonus;
            if (!checkBonus) {
                // check bonus (sub-diagonal line 5x5)
                checkBonus = RuleAllSpinsMatch.checkBonusSubDiagonalLine(this.preChoosedPosition,this.SLOT_NUMBER);
                this.stopUpdate = checkBonus;
            }
        }
        if (!checkWin && !checkBonus) {
            // check free spin
            checkFreeSpin = RuleAllSpinsMatch.checkFreeSpin(this.preChoosedPosition,this.SLOT_NUMBER);
            this.stopUpdate = checkFreeSpin;
        }
        if (this.stopUpdate) {
            if (checkWin) {
                this.freeSpinText.text = "Congratulation, You won!";
                this.addChild(this.freeSpinText);
            }
            if (checkBonus) {
                 this.addChild(this.buttonBonus);
            }
            if (checkFreeSpin) {
                this.spin += 5;
                this.freeSpinText.text = "Congratulations, you've got 5 free spins!";
                this.spinText.text = String(this.spin);
                this.addChild(this.freeSpinText);
            }
        }
        return; //no more animation
      }
    }

    private moving = () => {
        this.spinText.text = String(this.spin);
        for(var i = 0; i< this.SLOT_NUMBER; i++) {
            if(this.finalTileY[i] > 0) {
                this.slotSprite[i].tilePosition.y = this.slotSprite[i].tilePosition.y + this.INC[i];
                this.finalTileY[i]= this.finalTileY[i] - this.INC[i];
            }            
         }
        if(this.finalTileY[0]-5 <= 0) {
            this.gameStatus = this.STATE_CHECK_WIN;            
        }
    }
}

