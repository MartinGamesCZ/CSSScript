import { readFileSync, rmSync, writeFileSync } from "fs";
import * as path from "path";
import lexer from "./lexer";
import parser from "./parser";
import generate_ir from "./ir";

const rootFolder = process.cwd();
const indexFile = path.join(rootFolder, "index.css");

const start = performance.now();
console.log("Compiling " + indexFile + "...");

const lexer_out = lexer(readFileSync(indexFile, "utf8"));

writeFileSync("lexer.json", JSON.stringify(lexer_out, null, 2));

const parser_out = parser(lexer_out);

writeFileSync("parser.json", JSON.stringify(parser_out, null, 2));

const ir = generate_ir(parser_out);

writeFileSync("ir.js", ir);

const out =
  readFileSync(path.join(__dirname, "res/header.ts"), "utf-8") + "\n" + ir;

writeFileSync("compiled.js", out);

const compiled = await Bun.build({
  entrypoints: ["compiled.js"],
  minify: true,
});

const compiled_output = await compiled.outputs[0].text();

writeFileSync("compiled.js", compiled_output);

const end = performance.now();
console.log("Compiled in " + Math.floor(end - start) + "ms");
