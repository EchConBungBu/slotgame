import {ScenesManager} from "../engine/ScenesManager.class";
import {Scene} from "../engine/Scene.class";
import * as PIXI from 'pixi.js';

// Class
export class BonusScene extends Scene {

    //private q1: PIXI.Sprite;
    //private q2: PIXI.Sprite;
    //private q3: PIXI.Sprite;

    private button: PIXI.Sprite;
    private q1: PIXI.Sprite;
    private q2: PIXI.Sprite;
    private q3: PIXI.Sprite;
    private menu: PIXI.Sprite;
    private is25Gold: boolean;
    private is50Gold: boolean;
    private is100Gold: boolean;
    private texture25Gold: PIXI.Texture;
    private texture50Gold: PIXI.Texture;
    private texture100Gold: PIXI.Texture;

    constructor() {
        super();

        this.is25Gold = false;
        this.is50Gold = false;
        this.is100Gold = false;

        this.texture25Gold = PIXI.Texture.fromImage("img/25Gold.png");
        this.texture50Gold = PIXI.Texture.fromImage("img/50Gold.png");
        this.texture100Gold = PIXI.Texture.fromImage("img/100Gold.png");


        this.menu = new PIXI.Sprite(PIXI.Texture.fromImage("img/Menubutton.png"));
        this.menu.position.x = ScenesManager.defaultWidth - 200;
        this.menu.scale.x = 0.5;
        this.menu.scale.y = 0.5;
        this.menu.on("mouseup", this.goTo);
        this.menu.interactive = true;

        this.q1 = new PIXI.Sprite(PIXI.Texture.fromImage("img/question.png"));
        this.q1.scale.x = 0.25;
        this.q1.scale.y = 0.25;
        this.q1.on("mouseup", this.answer25Gold);

        this.q2 = new PIXI.Sprite(PIXI.Texture.fromImage("img/question.png"));
        this.q2.scale.x = 0.25;
        this.q2.scale.y = 0.25;
        this.q2.on("mouseup", this.answer50Gold);

        this.q3 = new PIXI.Sprite(PIXI.Texture.fromImage("img/question.png"));
        this.q3.scale.x = 0.25;
        this.q3.scale.y = 0.25; 
        this.q3.on("mouseup", this.answer100Gold);

        this.q1.position.x = 0;
        this.q1.position.y = ScenesManager.defaultHeight/2;

        // move the sprite to the center of the screen
        this.q2.position.x = ((ScenesManager.defaultWidth -90) /2);
        this.q2.position.y = ScenesManager.defaultHeight/2;

        // move the sprite to the center of the screen
        this.q3.position.x = ScenesManager.defaultWidth-90;
        this.q3.position.y = ScenesManager.defaultHeight/2;

        this.q1.interactive = true;
        this.q2.interactive = true;
        this.q3.interactive = true;

        this.addChild(this.q1);
        this.addChild(this.q2);
        this.addChild(this.q3);

        this.interactive = true;
    }

    private answer25Gold = () => {
        if (this.isPaused()) return;         
        this.is25Gold = true;
        this.q1.texture = this.texture25Gold;
    }

    private answer50Gold = () => {
        if (this.isPaused()) return;         
        this.is50Gold = true;
        this.q2.texture = this.texture50Gold;
    }

    private answer100Gold = () => {
        if (this.isPaused()) return;         
        this.is100Gold = true;
        this.q3.texture = this.texture100Gold;
    }

    public update() {
        super.update();
        //if (this.q1.alpha < 1) this.q1.alpha += 0.01;
        //else ScenesManager.goToScene('menu');
        if (this.is25Gold == true && this.is50Gold == true && this.is100Gold == true) {
            this.addChild(this.menu);
        }
    }

    private goTo = () => {
        if (this.isPaused()) return;                
            ScenesManager.goToScene('menu');
    }
}

