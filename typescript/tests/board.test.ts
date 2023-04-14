import { Board } from '../src/board';
import { Move } from '../src/move';

/*
 * BOARD CONSTRUCTOR
 */
describe('Constructor - from position', () => {

    test('Only the specified peg (0) should be empty', () => {
      const board : Board = new Board(0);
      expect(board.pegs).toStrictEqual([false, true, true, true, true, true, true, true, true, true, true, true, true, true, true]);
    });

    test('Only the specified peg (5) should be empty', () => {
      const board : Board = new Board(5);
      expect(board.pegs).toStrictEqual([true, true, true, true, true, false, true, true, true, true, true, true, true, true, true]);
    });
});

describe('Board creation from a board / 1', () => {

    test('Pegs should match the pegs in the source board (1)', () => {
      const sourceBoard : Board = new Board(1);
      const copyBoard : Board = new Board(sourceBoard);

      expect(copyBoard.pegs).toStrictEqual(sourceBoard.pegs);
    });

    test('Pegs should match the pegs in the source board (6)', () => {
      const sourceBoard : Board = new Board(6);
      const copyBoard : Board = new Board(sourceBoard);
      expect(copyBoard.pegs).toStrictEqual(sourceBoard.pegs);
    });
});

describe('Board creation from pegs list / 6, 8', () => {
  test('Pegs should match the pegs in the source list (6)', () => {
    const pegs = [true, true, true, true, true, true, false, true, true, true, true, true, true, true, true];
    const board : Board = new Board(pegs);
    expect(board.pegs).toStrictEqual(pegs);
  });

  test('Pegs should match the pegs in the source list (7, 9)', () => {
    const pegs = [true, true, true, true, true, true, true, false, true, false, true, true, true, true];
    const board : Board = new Board(pegs);
    expect(board.pegs).toStrictEqual(pegs);
  });
});

/*
 *     isValidMove(move : Move) : boolean
 */
describe('isValidMove(move : Move) : boolean', () => {

  test('It should be possible to from (peg) over (peg) to (nopeg/5)', () => {
    const board = new Board(5);
    expect(board.isValidMove(Move.move(3, 4, 5))).toBe(true);
  })

  test('It should be possible to from (peg) over (peg) to (nopeg/13)', () => {
    const board = new Board(13);
    expect(board.isValidMove(Move.move(11, 12, 13))).toBe(true);
  })

  test('If the "to" hole has a peg in it, it is not a valid move', () => {
    const board = new Board(5);
    expect(board.isValidMove(Move.move(6, 7, 8))).toBe(false);
  })
  
  test('If the "over" hole does not have a peg, it is not a valid mode', () => {
    const pegs = Array(15).fill(true);
    pegs[4] = false;
    pegs[5] = false;
    const board = new Board(pegs);
    expect(board.isValidMove(Move.move(3, 4, 5))).toBe(false);
  })
  
  test('If the "from" hole does not have a peg, it is not a valid mode', () => {
    const pegs = Array(15).fill(true);
    pegs[3] = false;
    pegs[5] = false;
    const board = new Board(pegs);
    expect(board.isValidMove(Move.move(3, 4, 5))).toBe(false);
  })
});

/*
 * withMove(move : Move) : Board
 */
describe('withMove(move : Move) : Board', () => {
 
  test('After jumping from 3 over 4 to 5, 3 & 4 should be empty, 5 should be filled', () => {
    const originalBoard = new Board(4); 
    const newBoard = originalBoard.withMove(Move.move(3, 4, 5));
    expect(newBoard.isEmpty(3)).toBe(true);
    expect(newBoard.isEmpty(4)).toBe(true);
    expect(newBoard.isFilled(5)).toBe(true);
  })

  test('After jumping from 12 over 7 to 3, 12 & 7 should be empty, 3 should be filled', () => {
    const originalBoard = new Board(3); 
    const newBoard = originalBoard.withMove(Move.move(12, 7, 3));
    expect(newBoard.isEmpty(12)).toBe(true);
    expect(newBoard.isEmpty(7)).toBe(true);
    expect(newBoard.isFilled(3)).toBe(true);
  })
});
