package trianglepeg;

import static org.junit.Assert.assertEquals;

import java.util.HashSet;
import java.util.Set;

import org.junit.Test;

/*
 *      0
 *     1  2
 *    3  4  5
 *   6  7  8  9
 * 10 11 12 13 14
 */
public class Game_Test {
	@Test
	public void equals_init() {
		assertEquals(new Game(0), new Game(0));
	}
	
	@Test 
	public void equals_move() {
		assertEquals(
				new Game(new Game(0), new Move(3, 1, 0)),
				new Game(new Game(0), new Move(3, 1, 0))
		);
	}
	
	@Test
	public void set_number_1() {
		Set<Game> games = new HashSet<Game>();
		games.add(new Game(0));
		games.add(new Game(0));
		assertEquals(games.size(), 1);
	}
	@Test
	public void set_number_3() {
		Set<Game> games = new HashSet<Game>();
		games.add(new Game(0));
		games.add(new Game(1));
		assertEquals(games.size(), 2);
	}
	@Test
	public void set_number_4() {
		Set<Game> games = new HashSet<Game>();
		games.add(new Game(0));
		games.add(new Game(10));
		games.add(new Game(0));
		assertEquals(games.size(), 2);
	}

}
