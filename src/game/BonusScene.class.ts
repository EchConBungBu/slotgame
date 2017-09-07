import {ScenesManager} from "../engine/ScenesManager.class";
import {Scene} from "../engine/Scene.class";
import * as PIXI from 'pixi.js';

// Class
export class BonusScene extends Scene {

    private q1: PIXI.Sprite;
    private q2: PIXI.Sprite;
    private q3: PIXI.Sprite;

    constructor() {
        super();
        /*var renderer = PIXI.autoDetectRenderer(256, 256, {antialias: false, transparent: false, resolution: 1});
        document.body.appendChild(renderer.view);
        renderer.backgroundColor = 0xff0000;

        var render = function() {
            renderer.render(this);
            requestAnimationFrame(render);
        }*/

        var q1 = new PIXI.Sprite(PIXI.Texture.fromImage("mg/question-180x180.png"));
        q1.position.x = ScenesManager.defaultWidth;
        q1.scale.x = 0.5;
        q1.scale.y = 0.5;

        var q2 = new PIXI.Sprite(PIXI.Texture.fromImage("mg/question-180x180.png"));
        q2.position.x = ScenesManager.defaultWidth /2;
        q2.scale.x = 0.5;
        q2.scale.y = 0.5;

        var q3 = new PIXI.Sprite(PIXI.Texture.fromImage("mg/question-180x180.png"));
        q3.position.x = 0;
        q3.scale.x = 0.5;
        q3.scale.y = 0.5;

        this.addChild(this.q1);
        this.addChild(this.q2);
        this.addChild(this.q3);

        
        //this.logo.scale.x = ScenesManager.defaultWidth/230;
        //this.logo.scale.y = this.logo.scale.x;

        this.q1.anchor.x = 0.5;
        this.q1.anchor.y = 0.5;
        this.q1.alpha = 0;

        this.q2.anchor.x = 1;
        this.q2.anchor.y = 1;
        this.q2.alpha = 0;

        this.q1.position.x = ScenesManager.defaultWidth;
        this.q1.position.y = ScenesManager.defaultHeight;

        // move the sprite to the center of the screen
        this.q2.position.x = ScenesManager.defaultWidth / 2;
        this.q2.position.y = ScenesManager.defaultHeight /2;

        
    }

    public update() {
        super.update();
        if (this.q1.alpha < 1) this.q1.alpha += 0.01;
        else ScenesManager.goToScene('menu');
    }
}

