import { Board } from "./board";
import { Run } from "./run";

export class Solver {
    solve(input: Board | Run[]) : Run[] {
        if (Array.isArray(input)) {
            console.log("Solving list of " + input.length + " runs");
            const children = input.map(run => run.calculateChildren()).flat();
            // If there's no children, return the current list of Runs of the solutions
            if (children.length === 0) {
                return input;
            }
            // Otherwise, solve on the children
            const withoutDuplicats = this.removeDuplicates(children);
            if (withoutDuplicats.length < children.length) {
                console.log("Removed " + (children.length - withoutDuplicats.length) + " duplicates (of " + children.length + ")");
            }
            return this.solve(withoutDuplicats);
        } else {
            return this.solve([new Run(input)]);
        }
    }

    // Remove duplicates (same start and end board, moves can differ)
    removeDuplicates(runs : Run[]) : Run[] {
        let boardsMatch = (run1 : Run, run2 : Run) => {
            return run1.startingBoard.toString() === run2.startingBoard.toString() && 
                   run1.currentBoard.toString() === run2.currentBoard.toString();
        }
        return runs.reduce((accumulator, currentRun) => {
            if (!accumulator.some((testingRun) => boardsMatch(currentRun, testingRun))) {
                accumulator.push(currentRun);
                //console.log(currentRun);
            }
            return accumulator;
        }, [] as Run[]);
    }
}

