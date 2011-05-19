package trianglepeg;

import java.util.ArrayList;
import java.util.List;

/*
 *      0
 *     1  2
 *    3  4  5
 *   6  7  8  9
 * 10 11 12 13 14
 */
public class BoardPosition {
	int[] pegs;
	
	public BoardPosition(int initialEmpty) {
		pegs = new int[15];
		for(int i=0; i<15; i++) {
			pegs[i] = 1;
		}
		pegs[initialEmpty] = 0;
	}
	
	public BoardPosition(int[] pegs) {
		this.pegs = pegs;
	}
	
	public BoardPosition(BoardPosition origin, Move move) {
		pegs = new int[15];
		for(int i=0; i<15; i++) {
			pegs[i] = origin.pegs[i];
		}
		if(pegs[move.from] != 1 || pegs[move.over]!= 1 || pegs[move.to] != 0) {
			throw new RuntimeException("Invalid move");
		}
		pegs[move.from] = 0;
		pegs[move.over] = 0;
		pegs[move.to] = 1;
	}
	
	boolean isValidMove(Move move) {
		return (pegs[move.from] == 1 && pegs[move.over] == 1 && pegs[move.to] == 0);
	}
	
	public String toString() {
		StringBuilder res = new StringBuilder();
		for(int i: pegs) {
			res.append(i);
		}
		return res.toString();
	}

	/**
	 * Returns the minimum valueOf for all possible variations of this board configuration
	 */
	@Override
	public int hashCode() {
		int result=0;
		for(int peg: pegs) {
			result = (result << 1) + peg;
		}
		return result;
	}
	
	@Override
	public boolean equals(Object o) {
		if(!(o instanceof BoardPosition)) {
			return false;
		}
		BoardPosition board = (BoardPosition)o;
		return hashCode() == board.hashCode();
	}
}
