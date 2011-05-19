module Main
       where

import Assert
import Data.List

    
test_failed :: Maybe String
test_failed =                
  assertEquals 3 2 "test_failed"

test_succeeded :: Maybe String
test_succeeded =                
  assertEquals 1 1 "test_succeeded"

test_failed2 :: Maybe String
test_failed2 =                
  assertEquals 1 2 "test_failed2"

  
main = do
  reportTests [
    test_failed, 
    test_succeeded, 
    test_failed2]




