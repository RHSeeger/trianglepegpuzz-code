module Assert ( 
  assertEquals,
  reportTests
  ) where

import Data.List

assertEquals :: (Eq a, Show a) => a -> a -> String -> Maybe String
assertEquals expected actual message =
  if actual == expected   
  then    
    Nothing
  else    
    Just $ message ++ ": '" ++ (show expected) ++ "' != '" ++ (show actual) ++ "'"
    
reportTests results = do
  putStr ("Number of Tests: " ++ (show $ length results) ++ "\n")
  putStr ("Succeeded: " ++ (show $ length succeeded) ++ "\n")
  putStr ("Failed: " ++ (show $ length failed) ++ "\n") 
  putStr (foldl (\x y -> (x ++ "\t" ++ y ++ "\n")) ""
          $ map (\x -> case x of Nothing -> "" ; Just y -> y) failed)
  where
    (succeeded,failed) = partition (\x -> case x of Nothing -> True ; Just _ -> False) results



