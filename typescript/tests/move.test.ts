import { Move } from '../src/move';

/*
 * static move(from: Position, over: Position, to:Position)
 */
describe('static move(from: Position, over: Position, to:Position)', () => {

    test('Should be able to create a valid move', () => {
        const move = Move.move(3, 4, 5);
        expect(move.from).toBe(3);
        expect(move.over).toBe(4);
        expect(move.to).toBe(5);
    });

    test('Should fail able to create an invalid move', () => {
        expect(() => { Move.move(3, 4, 12); }).toThrow(Error);
    });

});

