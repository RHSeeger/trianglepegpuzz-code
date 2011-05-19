module Board ( 
  Board,
  fromMove,
  fromHole,
  fromList,
  allNext
  ) where

import Move
import qualified Data.IntSet as IntSet

type Board = IntSet.IntSet

-- Create a board containing pegs in all holes but the one specified
fromHole :: Int -> Board
fromHole hole = IntSet.delete hole $ IntSet.fromList [0..14]

-- Create a board from an original board and a move to make
fromMove :: Board -> Move -> Maybe Board
fromMove board move
  | has1 && has2 && not has3 = Just (IntSet.delete t1 $ IntSet.delete t2 $ IntSet.insert t3 board)
  | otherwise = Nothing
  where (t1,t2,t3) = move
        has1 = IntSet.member t1 board
        has2 = IntSet.member t2 board
        has3 = IntSet.member t3 board
       
fromList :: [Int] -> Board
fromList pegs = IntSet.fromList pegs
  
allNext :: Board -> [Move] -> [Board]
allNext board moves =
  [ x | Just x <- map (\move -> fromMove board move) moves]
