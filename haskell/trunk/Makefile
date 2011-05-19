# HC      = ghc
# HC_OPTS = -cpp $(EXTRA_HC_OPTS)

# SRCS = Main.hs Board.hs Move.hs
# OBJS = Main.o   Board.o   Move.o

# .SUFFIXES : .o .hs .hi .lhs .hc .s

# all: triangle-peg-puzzle run

# run: triangle-peg-puzzle
# 	./triangle-peg-puzzle

# triangle-peg-puzzle: $(OBJS)
# 	rm -f $@
# 	$(HC) -o $@ $(HC_OPTS) $(OBJS)

# clean:
# 	rm -f $(OBJS)

# # Standard suffix rules
# .o.hi:
# 	@:

# .lhs.o:
# 	$(HC) -c $< $(HC_OPTS)

# .hs.o:
# 	$(HC) -c $< $(HC_OPTS)

# .o-boot.hi-boot:
# 	@:

# .lhs-boot.o-boot:
# 	$(HC) -c $< $(HC_OPTS)

# .hs-boot.o-boot:
# 	$(HC) -c $< $(HC_OPTS)

# # Inter-module dependencies
# Board.o Board.hc Board.s    : Move.hi          # Foo imports Baz
# Main.o Main.hc Main.s : Board.hi Move.hi   # Main imports Foo and Baz



HC      = ghc
SRCS = Game.hs Board.hs Move.hs Assert.hs
MAIN_SRCS = Main.hs $(SRCS)
TEST_SRCS = Board_Test.hs Assert_Test.hs $(SRCS)

OBJS = Game.o Board.o Move.o Assert.o
MAIN_OBJS = Main.o $(OBJS)
TEST_OBJS = Board_Test.o Assert_Test.o $(OBJS)

.SUFFIXES : .o .hs .hi .lhs .hc .s

all : triangle-peg-puzzle run

test: test-compile test-run

triangle-peg-puzzle: $(MAIN_SRCS)
	ghc --make Main.hs -o triangle-peg-puzzle

test-compile: $(TEST_SRCS)
	ghc --make Board_Test.hs -o board_test
	ghc --make Game_Test.hs -o game_test
	ghc --make Assert_Test.hs -o assert_test

# .hs.o:
# 	$(HC) -c $<

run: triangle-peg-puzzle
	./triangle-peg-puzzle

test-run: board_test assert_test
	./board_test
	./game_test
	./assert_test

clean:
	rm *.o *.hi *.exe *~

