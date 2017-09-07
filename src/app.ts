//import MoviesViewModel from './MoviesViewModel';

//new MoviesViewModel().movies.forEach(movie => console.log(movie.title));
import {ScenesManager} from "./engine/ScenesManager.class";
import {Scene} from "./engine/Scene.class";
import {GameScene} from "./game/GameScene.class";
import {IntroScene} from "./game/IntroScene.class";
import {MenuScene} from "./game/MenuScene.class";
import {BonusScene} from "./game/BonusScene.class";
import * as PIXI from 'pixi.js';

// var renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor: 0x1099bb});
// document.body.appendChild(renderer.view);

// var stage = new PIXI.Container();
// var texture = PIXI.Texture.fromImage('bunny.png');
// var bunny = new PIXI.Sprite(texture);
// bunny.anchor.x = 0.5;
// bunny.anchor.y = 0.5;
// bunny.position.x = 400;
// bunny.position.y = 300;
// bunny.scale.x = 4;
// bunny.scale.y = 4;
// stage.addChild(bunny);
// animate();

// function animate() {
//     requestAnimationFrame(animate);
//     var bunny = stage.getChildAt(0);
//     bunny.rotation += 0.01;
//     renderer.render(stage);
// }

//get reference of ScenesManager;
var scenesManager = ScenesManager;

//note the scale parameter is set to true
scenesManager.create(480, 640, true);

//create a the game scene
var game = scenesManager.createScene('game', GameScene);
var intro = scenesManager.createScene('intro', IntroScene);
var menu = scenesManager.createScene('menu', MenuScene);
var bonus = scenesManager.createScene('bonus', BonusScene);

scenesManager.goToScene('bonus');