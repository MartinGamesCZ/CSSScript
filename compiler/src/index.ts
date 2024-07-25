import { mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import * as path from "path";
import lexer from "./lexer";
import parser from "./parser";
import generate_ir from "./ir";
import compile from "./compiler";
import { $ } from "bun";

const rootFolder = process.cwd();
const indexFile = path.join(rootFolder, "index.css");

const start = performance.now();
console.log("Compiling " + indexFile + "...");

rmSync("build", { recursive: true, force: true });
mkdirSync("build");
mkdirSync("build/bindings");

const deps = readFileSync(
  path.join(rootFolder, "requirements.txt"),
  "utf-8",
).split("\n");

await $`cd build && bun add ${deps.join(" ")}`;

const ir = compile(indexFile);

const out =
  readFileSync(path.join(__dirname, "res/header.ts"), "utf-8") +
  "\n" +
  ir +
  "\n" +
  readFileSync(path.join(__dirname, "res/end.ts"), "utf-8");

writeFileSync("build/compiled.js", out);

const compiled = await Bun.build({
  entrypoints: ["build/compiled.js"],
  minify: true,
});

await $`bun build --minify --compile --outfile compiled build/compiled.js`;

const compiled_output = await compiled.outputs[0].text();

writeFileSync("build/compiled.min.js", compiled_output);

const end = performance.now();
console.log("Compiled in " + Math.floor(end - start) + "ms");
