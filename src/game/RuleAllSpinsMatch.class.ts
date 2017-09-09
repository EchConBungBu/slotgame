import * as PIXI from 'pixi.js';

export class RuleAllSpinsMatch {
	constructor() {
	}

	public static checkWin = (preChoosedPosition:any[], slotNumber:number): boolean => {
		var check = true;
		for(var i = 1; i < slotNumber; i++) {
		    if(preChoosedPosition[i] != preChoosedPosition[i-1]) {
		         check = false;
		    }
		}

		return check;
	}

	// check win (main-diagonal line 3x3)
	public static checkWinMainDiagonalLine = (preChoosedPosition:any[], slotNumber:number): boolean => {
		var check = false;
		for(var i = 0; i < slotNumber; i++) {
            if (i == Math.floor(slotNumber/2) - 1) {
                if(preChoosedPosition[i] == (preChoosedPosition[i+1] + 1)
                && preChoosedPosition[i+1] == (preChoosedPosition[i+2] + 1)) {
                    check = true;
                }
            }            
        }

		return check;
	}
	// check win (sub-diagonal line 3x3)
	public static checkWinSubDiagonalLine = (preChoosedPosition:any[], slotNumber:number): boolean => {
		var check = false;
		for(var i = 0; i < slotNumber; i++) {
            if (i == Math.floor(slotNumber/2) - 1) {
                if(preChoosedPosition[i] == (preChoosedPosition[i+1] - 1)
                && preChoosedPosition[i+1] == (preChoosedPosition[i+2] - 1)) {
                    check = true;
                }
            }            
        }

		return check;
	}
	// check bonus (main-diagonal line 5x5)
	public static checkBonusMainDiagonalLine = (preChoosedPosition:any[], slotNumber:number): boolean => {
		return (preChoosedPosition[0] == (preChoosedPosition[Math.floor(slotNumber/2)] + 1)
            && preChoosedPosition[Math.floor(slotNumber/2)] == (preChoosedPosition[slotNumber - 1] + 1));
	}

	// check bonus (sub-diagonal line 5x5)
	public static checkBonusSubDiagonalLine = (preChoosedPosition:any[], slotNumber:number): boolean => {
		return (preChoosedPosition[0] == (preChoosedPosition[Math.floor(slotNumber/2)] - 1)
            && preChoosedPosition[Math.floor(slotNumber/2)] == (preChoosedPosition[slotNumber - 1] - 1));
	}

	// check free spin
	public static checkFreeSpin = (preChoosedPosition:any[], slotNumber:number): boolean => {
		return (preChoosedPosition[0] == (preChoosedPosition[1])
            && preChoosedPosition[1] == (preChoosedPosition[2]));
	}
}

