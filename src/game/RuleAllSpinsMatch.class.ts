import * as PIXI from 'pixi.js';

export class RuleAllSpinsMatch {

	public static stopUpdate:boolean;

	constructor() {
	}

	public static checkWin = (preChoosedPosition:any[], slotNumber:number): boolean => {

		var check = false;

		for(var i = 1; i < slotNumber; i++) {
		    if(preChoosedPosition[i] != preChoosedPosition[i-1]) {
		         check = false;
		         RuleAllSpinsMatch.stopUpdate = false;
		    }
		}

		return check;
	}
}

