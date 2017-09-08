import {ScenesManager} from "../engine/ScenesManager.class";
import {Scene} from "../engine/Scene.class";
import * as PIXI from 'pixi.js';

// Class
export class IntroScene extends Scene {

    private logo: PIXI.Sprite;

    constructor() {
        super();
        /*var renderer = PIXI.autoDetectRenderer(256, 256, {antialias: false, transparent: false, resolution: 1});
        document.body.appendChild(renderer.view);
        renderer.backgroundColor = 0xff0000;

        var render = function() {
            renderer.render(this);
            requestAnimationFrame(render);
        }*/

        this.logo = PIXI.Sprite.fromImage("img/logo.png");
        this.addChild(this.logo);

        
        this.logo.scale.x = ScenesManager.defaultWidth/230;
        this.logo.scale.y = this.logo.scale.x;

        this.logo.anchor.x = 0.5;
        this.logo.anchor.y = 0.5;
        this.logo.alpha = 0;

        // move the sprite to the center of the screen
        this.logo.position.x = ScenesManager.defaultWidth / 2;
        this.logo.position.y = ScenesManager.defaultHeight / 2;        
    }

    public update() {
        super.update();
        if (this.logo.alpha < 1) this.logo.alpha += 0.01;
        else ScenesManager.goToScene('menu');
    }
}

