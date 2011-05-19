module Main
       where

import qualified Game
import qualified Board
import qualified Move
import List
import qualified Data.IntSet as IntSet

-- Given a list of games, returns the list of all solutions to all those games
solve :: [Game.Game] -> [Game.Game]
solve games
  | length solutions > 100000 = error $ "zomg, " ++ (show $ length solutions) ++ " solutions so far: \n\t" ++ (show $ solutions !! 0)
  | length solutions > 0 = solve solutions
  | otherwise = games
  where 
    merge all next =
      case (List.elemIndex next all) of
        Nothing -> next : all
        Just index -> (Game.merge next (all !! index)) : (List.delete (all !! index) all)
    allsol = concat $ map (\game -> Game.allNext game Move.allMoves) games
    solutions = foldl (\all next -> merge all next) [] allsol
    
--    solutions = concat $ map (\game -> Game.allNext game Move.allMoves) games

-- foldl :: (a -> b -> a) -> a -> [b] -> a
-- map :: (a -> b) -> [a] -> [b]
-- allNext :: Game -> [Move] -> [Game]
          
display games = 
  putStr (foldl (\x y -> (x ++ "\t" ++ (game_as_str y) ++ "\n")) "" games)

game_as_str game =
  (show $ IntSet.difference (IntSet.fromList [0..14]) (Game.startingBoard game)) ++ 
  " (" ++ 
  (show $ Game.count game) ++ 
  " times) to " ++ 
  (show $ Game.endingBoard game) ++ 
  " via " ++ 
  (show $ Game.moves game)
  
main = do
  putStr ("hello\n" ++ show (Board.fromHole 15) ++ "\n")
  putStr ("Solutions:\n")
  display (solve games)
  where games = [Game.fromHole 0, Game.fromHole 1, Game.fromHole 3, Game.fromHole 4]
