import { Module } from "module";
import { run } from "node:test";
import { arrayBuffer } from "stream/consumers";
import { Board } from "./board";
import { Position } from "./position";
import { Move } from "./move";
import { Run } from "./run";
import { Solver } from "./solver";

console.log('Solving puzzle...');

let solver = new Solver();
let solutions = solver.solve(new Board(0));
console.log("Solutions (" + solutions.length + "):\n\t" + solutions.map((solution) => solution.toString()).sort().join("\n\t"));
