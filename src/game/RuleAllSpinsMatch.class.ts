import * as PIXI from 'pixi.js';

export class RuleAllSpinsMatch {
	constructor() {
	}
	// check win
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
	// check win (second-diagonal line 3x3)
	public static checkWinSecondiagonalLine = (preChoosedPosition:any[], slotNumber:number): boolean => {
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

	// check bonus (second-diagonal line 5x5)
	public static checkBonusSecondiagonalLine = (preChoosedPosition:any[], slotNumber:number): boolean => {
		return (preChoosedPosition[0] == (preChoosedPosition[Math.floor(slotNumber/2)] - 1)
            && preChoosedPosition[Math.floor(slotNumber/2)] == (preChoosedPosition[slotNumber - 1] - 1));
	}

	// check free spin
	public static checkFreeSpin = (preChoosedPosition:any[], slotNumber:number): boolean => {
		return (preChoosedPosition[0] == (preChoosedPosition[1])
            && preChoosedPosition[1] == (preChoosedPosition[2]));
	}
}

