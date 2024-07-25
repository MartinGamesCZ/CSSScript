import { readFileSync, writeFileSync } from "fs";
import lexer from "./lexer";
import parser from "./parser";
import generate_ir from "./ir";
import p from "path";

export default function compile(path: string) {
  const lexer_out = lexer(readFileSync(path, "utf8"));

  writeFileSync(
    "build/" + path.split("/").toReversed()[0] + ".lexer.json",
    JSON.stringify(lexer_out, null, 2),
  );

  const parser_out = parser(lexer_out);

  writeFileSync(
    "build/" + path.split("/").toReversed()[0] + ".parser.json",
    JSON.stringify(parser_out, null, 2),
  );

  const ir = generate_ir(parser_out);

  writeFileSync("build/" + path.split("/").toReversed()[0] + ".ir.js", ir);

  return ir;
}
