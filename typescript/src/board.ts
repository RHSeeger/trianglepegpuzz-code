import { Position } from "./position";
import { Move } from "./move";

/*
 * Represents the game board; which holes currently have pegs
 *      0
 *     1  2
 *    3  4  5
 *   6  7  8  9
 * 10 11 12 13 14
 * 
 */
export class Board {
    pegs = [ true, 
        true, true, 
        true, true, true, 
        true, true, true, true, 
        true, true, true, true, true];

    constructor(startingPosition : Position);
    constructor(startingBoard : Board);
    constructor(pegs : boolean[])
    constructor(positionOrBoard : Position | Board | boolean[]) {
        if (typeof positionOrBoard === "number") {
            this.pegs[positionOrBoard] = false;
        } else if (Array.isArray(positionOrBoard)) {
            this.pegs = positionOrBoard;
        } else {
            // Shallow copy of the pegs of the passed in Board
            this.pegs = Object.assign([], positionOrBoard.pegs);
        }
    }

    isFilled(position : Position) : boolean {
        return this.pegs[position];
    }

    isEmpty(position : Position) : boolean {
        return !this.pegs[position];
    }

    /*
     * Returns true if the move is valid for this board
     * there are pegs in both "from" and "over", but no peg in "to"
     */
    isValidMove(move : Move) : boolean {
        return (this.isFilled(move.from) && this.isFilled(move.over) && this.isEmpty(move.to));
    }

    /*
     * Returns a new board with the effects the move applied
     */
    withMove(move : Move) : Board {
        let result = new Board(this);
        result.pegs[move.from] = false;
        result.pegs[move.over] = false;
        result.pegs[move.to] = true;
        return result;
    }

    toString() : string {
        return this.pegs.map((val) => val ? "|" : "o").join("");
    }
}
