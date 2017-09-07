/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = PIXI;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//file ScenesManager.class.ts
var Scene_class_1 = __webpack_require__(2);
var PIXI = __webpack_require__(0);
var ScenesManager = /** @class */ (function () {
    function ScenesManager() {
    }
    ScenesManager.create = function (width, height, scale) {
        if (scale === void 0) { scale = false; }
        if (ScenesManager.renderer)
            return this;
        this.defaultWidth = ScenesManager.width = width;
        this.defaultHeight = ScenesManager.height = height;
        ScenesManager.renderer = PIXI.autoDetectRenderer(ScenesManager.width, ScenesManager.height);
        ScenesManager.renderer.backgroundColor = 0xffffff;
        document.body.appendChild(ScenesManager.renderer.view);
        if (scale) {
            ScenesManager._rescale();
            window.addEventListener('resize', ScenesManager._rescale, false);
        }
        requestAnimationFrame(ScenesManager.loop);
        return this;
    };
    ScenesManager._rescale = function () {
        ScenesManager.ratio = Math.min(window.innerWidth / ScenesManager.defaultWidth, window.innerHeight / ScenesManager.defaultHeight);
        ScenesManager.width = this.defaultWidth * ScenesManager.ratio;
        ScenesManager.height = this.defaultHeight * ScenesManager.ratio;
        ScenesManager.renderer.resize(ScenesManager.width, ScenesManager.height);
    };
    ScenesManager._applyRatio = function (displayObj, ratio) {
        if (ratio == 1)
            return;
        var object = displayObj;
        object.position.x = object.position.x * ratio;
        object.position.y = object.position.y * ratio;
        object.scale.x = object.scale.x * ratio;
        object.scale.y = object.scale.y * ratio;
        for (var i = 0; i < object.children.length; i++) {
            ScenesManager._applyRatio(object.children[i], ratio);
        }
    };
    ScenesManager.loop = function () {
        requestAnimationFrame(function () { ScenesManager.loop(); });
        if (!this || !this.currentScene || this.currentScene.isPaused())
            return;
        this.currentScene.update();
        ScenesManager._applyRatio(this.currentScene, ScenesManager.ratio);
        ScenesManager.renderer.render(this.currentScene);
        ScenesManager._applyRatio(this.currentScene, 1 / ScenesManager.ratio);
    };
    ScenesManager.createScene = function (id, TScene) {
        if (TScene === void 0) { TScene = Scene_class_1.Scene; }
        if (ScenesManager.scenes[id]) {
            return ScenesManager.scenes[id];
        }
        var scene = new TScene();
        ScenesManager.scenes[id] = scene;
        return scene;
    };
    ScenesManager.goToScene = function (id) {
        if (ScenesManager.scenes[id]) {
            if (ScenesManager.currentScene)
                ScenesManager.currentScene.pause();
            ScenesManager.currentScene = ScenesManager.scenes[id];
            ScenesManager.currentScene.resume();
            return true;
        }
        return false;
    };
    ScenesManager.scenes = {}; // should be hashmap but a JS object is fine too :)
    ScenesManager.ratio = 1;
    return ScenesManager;
}());
exports.ScenesManager = ScenesManager;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = __webpack_require__(0);
// Class
var Scene = /** @class */ (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        var _this = _super.call(this) || this;
        _this.paused = false;
        _this.updateCB = function () { };
        return _this;
    }
    Scene.prototype.onUpdate = function (updateCB) {
        this.updateCB = updateCB;
    };
    Scene.prototype.update = function () {
        this.updateCB();
    };
    Scene.prototype.pause = function () {
        this.paused = true;
    };
    Scene.prototype.resume = function () {
        this.paused = false;
    };
    Scene.prototype.isPaused = function () {
        return this.paused;
    };
    return Scene;
}(PIXI.Container));
exports.Scene = Scene;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Scene_class_1 = __webpack_require__(2);
var ScenesManager_class_1 = __webpack_require__(1);
var PIXI = __webpack_require__(0);
// Class
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.goTo = function () {
            if (_this.isPaused())
                return;
            ScenesManager_class_1.ScenesManager.goToScene('menu');
        };
        //add a bunny :) 
        _this.bunny = PIXI.Sprite.fromImage("img/bunny.png");
        // center the sprites anchor point
        _this.bunny.anchor.x = 0.5;
        _this.bunny.anchor.y = 0.5;
        _this.bunny.position.x = 50;
        _this.bunny.position.y = 50;
        _this.addChild(_this.bunny);
        //var _this = this;
        var button = new PIXI.Sprite(PIXI.Texture.fromImage("img/MenuButton.png"));
        button.position.x = ScenesManager_class_1.ScenesManager.defaultWidth - 200;
        button.scale.x = 0.5;
        button.scale.y = 0.5;
        button.on("mouseup", _this.goTo);
        /*button.click = button.tap = function (data) {
            if (this.isPaused()) return;
            ScenesManager.goToScene('menu');
        }*/
        button.interactive = true;
        _this.addChild(button);
        _this.interactive = true;
        return _this;
    }
    GameScene.prototype.update = function () {
        _super.prototype.update.call(this);
        this.bunny.rotation += 0.1;
    };
    return GameScene;
}(Scene_class_1.Scene));
exports.GameScene = GameScene;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ScenesManager_class_1 = __webpack_require__(1);
var Scene_class_1 = __webpack_require__(2);
var PIXI = __webpack_require__(0);
// Class
var IntroScene = /** @class */ (function (_super) {
    __extends(IntroScene, _super);
    function IntroScene() {
        var _this = _super.call(this) || this;
        /*var renderer = PIXI.autoDetectRenderer(256, 256, {antialias: false, transparent: false, resolution: 1});
        document.body.appendChild(renderer.view);
        renderer.backgroundColor = 0xff0000;

        var render = function() {
            renderer.render(this);
            requestAnimationFrame(render);
        }*/
        _this.logo = PIXI.Sprite.fromImage("img/logo.png");
        _this.addChild(_this.logo);
        _this.logo.scale.x = ScenesManager_class_1.ScenesManager.defaultWidth / 230;
        _this.logo.scale.y = _this.logo.scale.x;
        _this.logo.anchor.x = 0.5;
        _this.logo.anchor.y = 0.5;
        _this.logo.alpha = 0;
        // move the sprite to the center of the screen
        _this.logo.position.x = ScenesManager_class_1.ScenesManager.defaultWidth / 2;
        _this.logo.position.y = ScenesManager_class_1.ScenesManager.defaultHeight / 2;
        return _this;
    }
    IntroScene.prototype.update = function () {
        _super.prototype.update.call(this);
        if (this.logo.alpha < 1)
            this.logo.alpha += 0.01;
        else
            ScenesManager_class_1.ScenesManager.goToScene('menu');
    };
    return IntroScene;
}(Scene_class_1.Scene));
exports.IntroScene = IntroScene;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ScenesManager_class_1 = __webpack_require__(1);
var Scene_class_1 = __webpack_require__(2);
var PIXI = __webpack_require__(0);
// Class
var MenuScene = /** @class */ (function (_super) {
    __extends(MenuScene, _super);
    function MenuScene() {
        var _this = _super.call(this) || this;
        _this.down = function () {
            if (_this.isPaused())
                return;
            _this.isdown = true;
            _this.button.texture = _this.textureButtonDown;
            _this.alpha = 1;
        };
        _this.up = function () {
            if (_this.isPaused())
                return;
            _this.isdown = false;
            if (_this.isOver) {
                _this.button.texture = _this.textureButtonOver;
            }
            else {
                _this.button.texture = _this.textureButton;
            }
            if (_this.isPaused())
                return;
            ScenesManager_class_1.ScenesManager.goToScene('game');
        };
        _this.over = function () {
            if (_this.isPaused())
                return;
            _this.isOver = true;
            if (_this.isdown)
                return;
            _this.button.texture = _this.textureButtonOver;
        };
        _this.out = function () {
            if (_this.isPaused())
                return;
            _this.isOver = false;
            if (_this.isdown)
                return;
            _this.button.texture = _this.textureButton;
        };
        _this.tap = function () {
            if (_this.isPaused())
                return;
            ScenesManager_class_1.ScenesManager.goToScene('game');
        };
        /*var renderer = PIXI.autoDetectRenderer(256, 256, {antialias: false, transparent: false, resolution: 1});
        document.body.appendChild(renderer.view);
        renderer.backgroundColor = 0xffffff;

        //var scene = new PIXI.Container();

        

        var render = function() {
            renderer.render(this);
            requestAnimationFrame(render);
        }*/
        //this.setBackgroundColor(0xffffff);
        _this.isdown = false;
        _this.isOver = false;
        _this.textureButton = PIXI.Texture.fromImage("img/button.png");
        _this.textureButtonDown = PIXI.Texture.fromImage("img/buttonDown.png");
        _this.textureButtonOver = PIXI.Texture.fromImage("img/buttonOver.png");
        _this.button = new PIXI.Sprite(_this.textureButton);
        // Scaling and positionning 
        _this.button.scale.x = ScenesManager_class_1.ScenesManager.defaultWidth / 400;
        _this.button.scale.y = _this.button.scale.x;
        _this.button.anchor.x = 0.5;
        _this.button.anchor.y = 0.5;
        // move the sprite to the center of the screen
        _this.button.position.x = ScenesManager_class_1.ScenesManager.defaultWidth / 2;
        _this.button.position.y = ScenesManager_class_1.ScenesManager.defaultHeight / 2;
        // make the button interactive..
        _this.button.interactive = true;
        _this._registerEvents();
        _this.addChild(_this.button);
        _this.interactive = true;
        return _this;
    }
    MenuScene.prototype._registerEvents = function () {
        // set the mousedown and touchstart callback..
        this.button.on("mousedown", this.down);
        // set the mouseup and touchend callback..
        this.button.on("mouseup", this.up);
        // set the mouseover callback..
        this.button.on("mouseover", this.over);
        // set the mouseout callback..
        this.button.on("mouseout", this.out);
        this.button.on("mousedown", this.down);
    };
    return MenuScene;
}(Scene_class_1.Scene));
exports.MenuScene = MenuScene;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

//import MoviesViewModel from './MoviesViewModel';
Object.defineProperty(exports, "__esModule", { value: true });
//new MoviesViewModel().movies.forEach(movie => console.log(movie.title));
var ScenesManager_class_1 = __webpack_require__(1);
var GameScene_class_1 = __webpack_require__(3);
var IntroScene_class_1 = __webpack_require__(4);
var MenuScene_class_1 = __webpack_require__(5);
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
var scenesManager = ScenesManager_class_1.ScenesManager;
//note the scale parameter is set to true
scenesManager.create(350, 480, true);
//create a the game scene
var game = scenesManager.createScene('game', GameScene_class_1.GameScene);
var intro = scenesManager.createScene('intro', IntroScene_class_1.IntroScene);
var menu = scenesManager.createScene('menu', MenuScene_class_1.MenuScene);
scenesManager.goToScene('intro');


/***/ })
/******/ ]);