import { expect } from 'chai';
import {RuleAllSpinsMatch} from "../src/game/RuleAllSpinsMatch.class";

describe("RuleAllSpinsMatch", () => {
	// test checkFreeSpin
	it("should get free spins", () => {
		// arrange
		let expected = true;
		let positions = [6,6,6,1,2];
		let slotNumber = 5;
		// act
		let actual = RuleAllSpinsMatch.checkFreeSpin(positions, slotNumber);
		// assert
		expect(actual).to.be.equal(expected);
	});

	// test checkFreeSpin
	it("there are no free spins", () => {
		// arrange
		let expected = false;
		let positions = [6,6,1,1,2];
		let slotNumber = 5;
		// act
		let actual = RuleAllSpinsMatch.checkFreeSpin(positions, slotNumber);
		// assert
		expect(actual).to.be.equal(expected);
	});

	// test checkBonusMainDiagonalLine
	it("should get a bonus in the main diagonal line 5x5", () => {
		// arrange
		let expected = true;
		let positions = [3,4,2,6,1];
		let slotNumber = 5;
		// act
		let actual = RuleAllSpinsMatch.checkBonusMainDiagonalLine(positions, slotNumber);
		// assert
		expect(actual).to.be.equal(expected);
	});

	// test checkBonusMainDiagonalLine
	it("should not get a bonus in the main diagonal line 5x5", () => {
		// arrange
		let expected = false;
		let positions = [1,4,2,6,1];
		let slotNumber = 5;
		// act
		let actual = RuleAllSpinsMatch.checkBonusMainDiagonalLine(positions, slotNumber);
		// assert
		expect(actual).to.be.equal(expected);
	});

	// test checkBonusSecondiagonalLine
	it("should get a bonus in the secondary diagonal line 5x5", () => {
		// arrange
		let expected = true;
		let positions = [1,4,2,6,3];
		let slotNumber = 5;
		// act
		let actual = RuleAllSpinsMatch.checkBonusSecondiagonalLine(positions, slotNumber);
		// assert
		expect(actual).to.be.equal(expected);
	});

	// test checkBonusSecondiagonalLine
	it("should not get a bonus in the secondary diagonal line 5x5", () => {
		// arrange
		let expected = false;
		let positions = [1,4,2,6,4];
		let slotNumber = 5;
		// act
		let actual = RuleAllSpinsMatch.checkBonusSecondiagonalLine(positions, slotNumber);
		// assert
		expect(actual).to.be.equal(expected);
	});

	// test checkWinSecondiagonalLine
	it("should be won in the secondary diagonal line 3x3", () => {
		// arrange
		let expected = true;
		let positions = [4,1,2,3,6];
		let slotNumber = 5;
		// act
		let actual = RuleAllSpinsMatch.checkWinSecondiagonalLine(positions, slotNumber);
		// assert
		expect(actual).to.be.equal(expected);
	});

	// test checkWinSecondiagonalLine
	it("should not win in the secondary diagonal line 3x3", () => {
		// arrange
		let expected = false;
		let positions = [1,1,2,4,4];
		let slotNumber = 5;
		// act
		let actual = RuleAllSpinsMatch.checkWinSecondiagonalLine(positions, slotNumber);
		// assert
		expect(actual).to.be.equal(expected);
	});

	// test checkWinMainDiagonalLine
	it("should be won in the main diagonal line 3x3", () => {
		// arrange
		let expected = true;
		let positions = [4,3,2,1,6];
		let slotNumber = 5;
		// act
		let actual = RuleAllSpinsMatch.checkWinMainDiagonalLine(positions, slotNumber);
		// assert
		expect(actual).to.be.equal(expected);
	});

	// test checkWinMainDiagonalLine
	it("should not win in the main diagonal line 3x3", () => {
		// arrange
		let expected = false;
		let positions = [1,3,2,4,4];
		let slotNumber = 5;
		// act
		let actual = RuleAllSpinsMatch.checkWinMainDiagonalLine(positions, slotNumber);
		// assert
		expect(actual).to.be.equal(expected);
	});

	// test checkWin
	it("should be won in the special case", () => {
		// arrange
		let expected = true;
		let positions = [1,1,1,1,1];
		let slotNumber = 5;
		// act
		let actual = RuleAllSpinsMatch.checkWin(positions, slotNumber);
		// assert
		expect(actual).to.be.equal(expected);
	});

	// test checkWin
	it("should not win in the special case", () => {
		// arrange
		let expected = false;
		let positions = [1,2,1,1,1];
		let slotNumber = 5;
		// act
		let actual = RuleAllSpinsMatch.checkWin(positions, slotNumber);
		// assert
		expect(actual).to.be.equal(expected);
	});
});