import {ScenesManager} from "./engine/ScenesManager.class";
import {Scene} from "./engine/Scene.class";
import {BonusScene} from "./game/BonusScene.class";
import {NormalScene} from "./game/NormalScene.class";
import * as PIXI from 'pixi.js';

//get reference of ScenesManager;
var scenesManager = ScenesManager;

//note the scale parameter is set to true
scenesManager.create(680, 640, false);

//create a the game scene
var bonus = scenesManager.createScene('bonus', BonusScene);
var normal = scenesManager.createScene('normal', NormalScene);

scenesManager.goToScene('normal');