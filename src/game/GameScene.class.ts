import {Scene} from "../engine/Scene.class";
import {ScenesManager} from "../engine/ScenesManager.class";

import * as PIXI from 'pixi.js';

// Class
export class GameScene extends Scene {
    
    private bunny: PIXI.Sprite;

    constructor() {
        super();

        //add a bunny :) 
        this.bunny = PIXI.Sprite.fromImage("img/bunny.png");
        // center the sprites anchor point
        this.bunny.anchor.x = 0.5;
        this.bunny.anchor.y = 0.5;            
        this.bunny.position.x = 50;
        this.bunny.position.y = 50;
        this.addChild(this.bunny);

        //var _this = this;
        var button = new PIXI.Sprite(PIXI.Texture.fromImage("img/Menubutton.png"));
        button.position.x = ScenesManager.defaultWidth - 200;
        button.scale.x = 0.5;
        button.scale.y = 0.5;
        button.on("mouseup", this.goTo);
        /*button.click = button.tap = function (data) {
            if (this.isPaused()) return;                
            ScenesManager.goToScene('menu');
        }*/
        button.interactive = true;
        this.addChild(button);
        
        this.interactive = true;
    }

    public update() {
        super.update();
        this.bunny.rotation += 0.1;
    }

    private goTo = () => {
        if (this.isPaused()) return;                
            ScenesManager.goToScene('menu');
    }

}

