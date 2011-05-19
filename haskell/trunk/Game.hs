module Game (
  Game(Game),
  fromHole,
  fromMove,
  merge,
  allNext,
  startingBoard,
  endingBoard,
  count,
  moves
  ) where

import qualified Board
import qualified Move

data Game = Game { 
  startingBoard :: Board.Board, 
  moves :: [Move.Move], 
  endingBoard :: Board.Board,
  count :: Int
  } deriving (Show)

fromHole :: Int -> Game
fromHole hole = 
  Game {
    startingBoard = Board.fromHole hole,
    moves = [],
    endingBoard = Board.fromHole hole,
    count = 1
  }

fromMove :: Game -> Move.Move -> Maybe Game
fromMove game move = 
  case newEndingBoard of
    Nothing -> Nothing
    Just x -> Just Game {
      startingBoard = startingBoard game,
      moves = move : (moves game),
      endingBoard = x,
      count = (count game)
      }
  where newEndingBoard = Board.fromMove (endingBoard game) move

-- merges two games together
-- in theory, should check to make sure both have same starting and ending positions        
merge :: Game -> Game -> Game
merge game1 game2 =
  Game {
    startingBoard = startingBoard game1,
    moves = moves game1,
    endingBoard = endingBoard game1,
    count = (count game1) + (count game2)
    }

allNext :: Game -> [Move.Move] -> [Game]
allNext game moves =
  [ x | Just x <- map (\move -> fromMove game move) moves]


instance Eq Game where
  game1 == game2 = 
    (startingBoard game1) == (startingBoard game2) 
    && 
    (endingBoard game1) == (endingBoard game2)
