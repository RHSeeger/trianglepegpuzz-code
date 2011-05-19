package trianglepeg;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/*
 *      0
 *     1  2
 *    3  4  5
 *   6  7  8  9
 * 10 11 12 13 14
 */
public class Game {
	final int initialPosition;
	BoardPosition board;
	List<Move> moves;
	int pathCount = 1; // the number of ways that we've found to get to this state from it's initial position
	
	public Game(int position) {
		initialPosition = position;
		board = new BoardPosition(position);
		moves = new ArrayList<Move>();
	}
	
	public Game(Game origin, Move move) {
		initialPosition = origin.initialPosition;
		moves = new ArrayList<Move>();
		moves.addAll(origin.moves);
		moves.add(move);
		board = new BoardPosition(origin.board, move);
		pathCount = origin.pathCount;
	}
	
	public List<Game> getNextGames() {
		List<Game> result = new ArrayList<Game>();
		for(Move move: Move.ALL_MOVES) {
			if(board.isValidMove(move)) {
				result.add(new Game(this, move));
			}
		}
		return result;
	}
	
	@Override
	public int hashCode() {
		return ((new BoardPosition(initialPosition)).hashCode() << 15) + board.hashCode();
	}
	
	@Override 
	public boolean equals(Object o) {
		if(!(o instanceof Game)) {
			return false;
		}
		Game game = (Game)o;
		return (initialPosition == game.initialPosition) && (board.equals(game.board));
	}
	
	@Override 
	public String toString() {
		return "[Game: " + initialPosition + "->" + board + "]";
	}
	
	public static void addGames(Map<Integer,Game> knownGames, List<Game> newGames) {
		for(Game game : newGames) {
			int code = game.hashCode();
			if(knownGames.containsKey(code)) {
				knownGames.get(code).pathCount += game.pathCount;
			} else {
				knownGames.put(code, game);
			}
		}
	}
	
	public static List<Game> getStartingGames() {
		List<Game> games = new ArrayList<Game>();
		games.add(new Game(0));
		games.add(new Game(1));
		games.add(new Game(3));
		games.add(new Game(4));
		return games;
	}
	
	public static void main(String[] args) {
		Map<Integer,Game> knownGames = new HashMap<Integer,Game>();
		addGames(knownGames, getStartingGames()); 
		System.out.println("Number of starting boards: " + knownGames.size());
		
		for(int iteration=0; iteration<20; iteration++) {
			System.out.println("Iteration " + iteration + " with " + knownGames.size() + " games");
			Map<Integer,Game> nextRound = new HashMap<Integer,Game>();
			for(Game game: knownGames.values()) {
				//System.out.println("\t" + game.initialPosition + " (" + game.pathCount + " paths) -> " + game.board.toString() + " via " + game.moves.toString());
				addGames(nextRound, game.getNextGames());
			}
			if(nextRound.size() == 0) {
				break;
			}
			knownGames = nextRound;
		}
		
		// Print out the results
		System.out.println("Number of final games: " + knownGames.size());
		List<Game> gameList = new ArrayList<Game>();
		gameList.addAll(knownGames.values());
		Collections.sort(gameList, new Comparator<Game>() {
			public int compare(Game g1, Game g2) {
				if(g1.initialPosition < g2.initialPosition) return -1;
				if(g1.initialPosition > g2.initialPosition) return 1;
				return 0;
			}
		});
		if(gameList.size() < 1000) {
			for(Game game : gameList) {
				System.out.println("\t" + game.initialPosition + " (" + game.pathCount + " paths) -> " + game.board.toString() + " via " + game.moves.toString());
			}
		} else {
			System.out.println("\tcould not print more than 1000 games");
		}
	}
}
