module Main
       where

import qualified Board
import qualified Move
import qualified Game
import Assert
import qualified Data.IntSet as IntSet
import Data.List
    
-- fromMove :: Board -> Move -> Maybe Board
test_fromMove :: Maybe String
test_fromMove = 
  assertEquals expected actual "test_fromMove"
  where
    expected = Just $ Game.Game
      (Board.fromList $ [0..2] ++ [4..14])
      [(0,1,3)]
      (Board.fromList [2..14])
      1
    actual = Game.fromMove (Game.fromHole 3) (0, 1, 3)
    
test_fromMove_invalid :: Maybe String
test_fromMove_invalid = 
  assertEquals expected actual "test_fromMove_invalid"
  where
    expected = Nothing
    actual = Game.fromMove (Game.fromHole 12) (0, 1, 3)

main = do
  reportTests [
    test_fromMove,
    test_fromMove_invalid]
