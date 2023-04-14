
import { Run } from '../src/run';
import { Board } from '../src/board';
import { Move } from '../src/move';

/*
 * calculateChildren() : Run[]
 */
describe('calculateChildren() : Run[]', () => {

    describe('A run/board with one valid move', () => {
        const pegs = [
            false,
            false, false,
            true, true, false,
            false, false, false, false,
            false, false, false, false, false
        ];
        const run = new Run(new Board(pegs));
        const childRuns = run.calculateChildren();

        test('Only a single child is returned', () => {
            childRuns.length === 1;
        });

        const childRun = childRuns[0];
        test('The child has the right number of pegs (1)', () => {
            expect(childRun.currentBoard.pegs.filter((peg) => peg).length).toBe(1);
        });
        test('The child has the right peg set (5)', () => {
            expect(childRun.currentBoard.pegs[5]).toBe(true);
        });
        test('The list of moves has the most recent move at the end', () => {
            expect(childRun.moves.at(-1)).toStrictEqual(Move.move(3, 4, 5));
        });
        
    });

    describe('A board with no valid moves returns no children', () => {
        const pegs = [
            true,
            false, false,
            false, true, false,
            false, false, false, false,
            true, false, true, false, true
        ];
        const run = new Run(new Board(pegs));
        const childRuns = run.calculateChildren();

        test('No children are returned', () => {
            childRuns.length === 0;
        });
    });

    describe('A board with two valid moves returns two children', () => {
        const pegs = [
            true,
            true, true,
            false, false, false,
            false, false, false, false,
            true, false, true, false, true
        ];
        const run = new Run(new Board(pegs));
        const childRuns = run.calculateChildren();

        test('Only a single child is returned', () => {
            childRuns.length === 2;
        });

        describe('First child', () => {
            const childRun = childRuns.sort()[0];
            test('The child has the right number of pegs (5)', () => {
                expect(childRun.currentBoard.pegs.filter((peg) => peg).length).toBe(5);
            });
            test('The child has the right peg set (0)', () => {
                expect(childRun.currentBoard.isFilled(0)).toBe(false);
                expect(childRun.currentBoard.isFilled(1)).toBe(false);
                expect(childRun.currentBoard.isFilled(3)).toBe(true);
            });
        });

        describe('Second child', () => {
            const childRun = childRuns.sort()[1];
            test('The child has the right number of pegs (5)', () => {
                expect(childRun.currentBoard.pegs.filter((peg) => peg).length).toBe(5);
            });
            test('The child has the right peg set (0)', () => {
                expect(childRun.currentBoard.isFilled(0)).toBe(false);
                expect(childRun.currentBoard.isFilled(2)).toBe(false);
                expect(childRun.currentBoard.isFilled(5)).toBe(true);
            });
        });

    });

    describe('A run/board with one move already has the next move added', () => {
        const pegs = [
            false,
            false, false,
            true, true, false,
            false, false, false, false,
            false, false, false, false, false
        ];
        const run = new Run(new Board(pegs));
        run.moves = [ Move.move(0, 1, 3) ];
        const childRuns = run.calculateChildren();

        test('Only a single child is returned', () => {
            childRuns.length === 1;
        });

        const childRun = childRuns[0];
        test('The list of moves has 2 moves in it (the original mave, plus one)', () => {
            expect(childRun.moves.length).toBe(2);
        });
        test('The list of moves has the most recent move at the end', () => {
            expect(childRun.moves.at(-1)).toStrictEqual(Move.move(3, 4, 5));
        });
        
    });

});

