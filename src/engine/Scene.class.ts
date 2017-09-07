 import * as PIXI from 'pixi.js';
 
 // Class
    export class Scene extends PIXI.Container {
        private paused: boolean = false;
        private updateCB = function () { };

        constructor() {
            super();

        }
        public onUpdate(updateCB: () => void ) {
            this.updateCB = updateCB;
        }

        public update() {
            this.updateCB();
        }
        public pause() {
            this.paused = true;
        }
        public resume() {
            this.paused = false;
        }
        public isPaused() {
            return this.paused;
        }


    }