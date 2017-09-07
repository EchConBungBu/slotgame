import {ScenesManager} from "../engine/ScenesManager.class";
import {Scene} from "../engine/Scene.class";
import * as PIXI from 'pixi.js';

// Class
export class MenuScene extends Scene {

    private button: PIXI.Sprite;
    private isdown: boolean;
    private isOver: boolean;
    private textureButton: PIXI.Texture;
    private textureButtonDown: PIXI.Texture;
    private textureButtonOver: PIXI.Texture;
    constructor() {
        super();
        /*var renderer = PIXI.autoDetectRenderer(256, 256, {antialias: false, transparent: false, resolution: 1});
        document.body.appendChild(renderer.view);
        renderer.backgroundColor = 0xffffff;

        //var scene = new PIXI.Container();

        

        var render = function() {
            renderer.render(this);
            requestAnimationFrame(render);
        }*/
        //this.setBackgroundColor(0xffffff);

        this.isdown = false;
        this.isOver = false;

        this.textureButton = PIXI.Texture.fromImage("img/button.png");
        this.textureButtonDown = PIXI.Texture.fromImage("img/buttonDown.png");
        this.textureButtonOver = PIXI.Texture.fromImage("img/buttonOver.png");

        this.button = new PIXI.Sprite(this.textureButton);
        // Scaling and positionning 
        this.button.scale.x = ScenesManager.defaultWidth / 400;
        this.button.scale.y = this.button.scale.x;

        this.button.anchor.x = 0.5;
        this.button.anchor.y = 0.5;
        
        // move the sprite to the center of the screen
        this.button.position.x = ScenesManager.defaultWidth / 2;
        this.button.position.y = ScenesManager.defaultHeight / 2;
        
        // make the button interactive..
        this.button.interactive = true;

        this._registerEvents();

        this.addChild(this.button);

        this.interactive = true;
    }

    private _registerEvents() {

        // set the mousedown and touchstart callback..
        this.button.on("mousedown", this.down);

        // set the mouseup and touchend callback..
        this.button.on("mouseup", this.up);

        // set the mouseover callback..
        this.button.on("mouseover", this.over);

        // set the mouseout callback..
        this.button.on("mouseout", this.out);

        this.button.on("mousedown", this.down);

    }

    private down = () => {

        if (this.isPaused()) return;

            this.isdown = true;
            this.button.texture = this.textureButtonDown;
            this.alpha = 1;
    }

    private up = () => {

        if (this.isPaused()) return;

        this.isdown = false;

        if (this.isOver) {
            this.button.texture = this.textureButtonOver;
        }  
        else{
            this.button.texture = this.textureButton;
        }        

        if (this.isPaused()) return;
        ScenesManager.goToScene('game');
    }

    private over = () => {

        if (this.isPaused()) return;

        this.isOver = true;

        if (this.isdown) return;

        this.button.texture = this.textureButtonOver;
    }

    private out = () => {

        if (this.isPaused()) return;

        this.isOver = false;

        if (this.isdown) return;

        this.button.texture = this.textureButton;
    }

    private tap = () => {
        if (this.isPaused()) return;
        ScenesManager.goToScene('game');
    }

}