module Main
       where

import qualified Board
import Move
import Assert
import qualified Data.IntSet as IntSet
import Data.List
--import qualified Data.List.Utils as ListUtils

-- fromHole :: Int -> Board
test_fromHole :: Maybe String
test_fromHole =
  assertEquals expected actual "test_fromHole"
  where
    expected = Board.fromList $ [0..5] ++ [7..14]
    actual = Board.fromHole 6
    
-- fromMove :: Board -> Move -> Maybe Board
test_fromMove :: Maybe String
test_fromMove = 
  assertEquals expected actual "test_fromMove"
  where
    expected = Just $ Board.fromList $ [2..14]
    actual = Board.fromMove (Board.fromHole 3) (0, 1, 3)
    
test_fromMove_invalid :: Maybe String
test_fromMove_invalid = 
  assertEquals expected actual "test_fromMove_invalid"
  where
    expected = Nothing
    actual = Board.fromMove (Board.fromHole 12) (0, 1, 3)

-- allNext :: Board -> [Move] -> [Board]
test_allNext_one =   
  assertEquals expected actual "test_allNext_one"
  where
    expected = [(Board.fromList [3])]
    actual = Board.allNext (Board.fromList [0,1]) allMoves

test_allNext_two =   
  assertEquals expected actual "test_allNext_one"
  where
    expected = [(Board.fromList [0,6]), (Board.fromList [1,10])]
    actual = Board.allNext (Board.fromList [1,3,6]) allMoves

test_allNext_none =   
  assertEquals expected actual "test_allNext_one"
  where
    expected = []
    actual = Board.allNext (Board.fromList [0,3,5]) allMoves

main = do
  reportTests [
    test_fromHole, 
    test_fromMove,
    test_fromMove_invalid,
    test_allNext_one,
    test_allNext_two,
    test_allNext_none]
