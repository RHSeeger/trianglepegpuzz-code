import { Board } from "./board";
import { Move, validModes } from "./move";


/*
 * Represents the entire state of one "run" of a game
 * - It's starting Board
 * - It's current Board
 * - The steps that were taken to get from starting to current
 */
export class Run {
    startingBoard: Board
    currentBoard: Board
    moves: Move[]

    constructor(startingBoard : Board);
    constructor(startingBoard : Board, currentBoard : Board, moves : Move[]);
    constructor(startingBoard : Board, currentBoard? : Board, moves? : Move[]) { 
        this.startingBoard = startingBoard;
        this.currentBoard = currentBoard === undefined ? startingBoard : currentBoard as Board;
        this.moves = moves === undefined ? [] : moves as Move[];
    }

    /*
     * Returns a list of Runs, one for each Move/Board that is valid for the currentBoard
     */
    calculateChildren() : Run[] {
        let children : Run[] = [];
        validModes.forEach(move => {
            if (this.currentBoard.isValidMove(move)) {
                children.push(this.withMove(move));
            }
        });
        return children;
    }

    /*
     * Creates a new Run by adding the supplied move to this one (updating the current Board and list of moves) and returns it
     */
    withMove(move : Move) : Run {
        let newMoves = Object.assign([], this.moves);
        newMoves.push(move);

        return new Run(this.startingBoard, this.currentBoard.withMove(move), newMoves);
    }

    toString() : string {
        const moveString = this.moves.map((move) => move.from + "->" + move.to).join(", ");
        return this.currentBoard.toString() + " : " + moveString;
    }
}
