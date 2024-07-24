export default function lexer(script: string) {
  const tokens = script.split("");

  let buf = "";

  const result = [];

  for (let i = 0; i < tokens.length; i++) {
    switch (tokens[i]) {
      case ".":
        for (let j = i + 1; j < tokens.length; j++) {
          if (
            tokens[j] === " " ||
            tokens[j] === "{" ||
            tokens[j] === ";" ||
            tokens[j] === ":" ||
            tokens[j] === "\n" ||
            tokens[j] === "\r" ||
            tokens[j] === "\t" ||
            tokens[j] === "}" ||
            tokens[j] === "]" ||
            tokens[j] === "[" ||
            tokens[j] === "=" ||
            tokens[j] === "," ||
            tokens[j] === "(" ||
            tokens[j] === ")"
          ) {
            i = j - 1;
            break;
          }
          buf += tokens[j];
        }
        result.push({
          type: "function",
          value: buf,
        });
        buf = "";
        break;

      case "$":
        for (let j = i + 1; j < tokens.length; j++) {
          if (
            tokens[j] === " " ||
            tokens[j] === "{" ||
            tokens[j] === ";" ||
            tokens[j] === ":" ||
            tokens[j] === "\n" ||
            tokens[j] === "\r" ||
            tokens[j] === "\t" ||
            tokens[j] === "}" ||
            tokens[j] === "]" ||
            tokens[j] === "[" ||
            tokens[j] === "=" ||
            tokens[j] === "," ||
            tokens[j] === "(" ||
            tokens[j] === ")"
          ) {
            i = j - 1;
            break;
          }

          buf += tokens[j];
        }

        result.push({
          type: "variable",
          value: buf,
        });

        buf = "";

        break;

      case "{":
        result.push({
          type: "open-curly-brace",
          value: tokens[i],
        });
        break;

      case "}":
        result.push({
          type: "close-curly-brace",
          value: tokens[i],
        });
        break;

      case "[":
        result.push({
          type: "open-square-brace",
          value: tokens[i],
        });
        break;

      case "]":
        result.push({
          type: "close-square-brace",
          value: tokens[i],
        });
        break;

      case "(":
        result.push({
          type: "open-parenthesis",
          value: tokens[i],
        });
        break;

      case ")":
        result.push({
          type: "close-parenthesis",
          value: tokens[i],
        });
        break;

      case "-":
        const next = tokens[i + 1];

        if (next == "-") {
          for (let j = i + 2; j < tokens.length; j++) {
            if (
              tokens[j] === " " ||
              tokens[j] === "{" ||
              tokens[j] === ";" ||
              tokens[j] === ":" ||
              tokens[j] === "\n" ||
              tokens[j] === "\r" ||
              tokens[j] === "\t" ||
              tokens[j] === "}" ||
              tokens[j] === "]" ||
              tokens[j] === "[" ||
              tokens[j] === "=" ||
              tokens[j] === "," ||
              tokens[j] === "(" ||
              tokens[j] === ")"
            ) {
              i = j - 1;
              break;
            }

            buf += tokens[j];
          }

          result.push({
            type: "variable-use",
            value: buf,
          });

          buf = "";
        }

        break;

      case ";":
        result.push({
          type: "semicolon",
          value: tokens[i],
        });
        break;

      case ":":
        result.push({
          type: "colon",
          value: tokens[i],
        });
        break;

      case ",":
        result.push({
          type: "comma",
          value: tokens[i],
        });
        break;

      case " ":
        break;

      case "\n":
      case "\r":
      case "\t":
        break;

      case "=":
        result.push({
          type: "equals",
          value: tokens[i],
        });
        break;

      case '"':
        for (let j = i + 1; j < tokens.length; j++) {
          if (tokens[j] === '"') {
            i = j;
            break;
          }

          buf += tokens[j];
        }

        result.push({
          type: "string",
          value: buf,
        });

        buf = "";
        break;

      default:
        for (let j = i; j < tokens.length; j++) {
          if (
            tokens[j] === " " ||
            tokens[j] === "{" ||
            tokens[j] === ";" ||
            tokens[j] === ":" ||
            tokens[j] === "\n" ||
            tokens[j] === "\r" ||
            tokens[j] === "\t" ||
            tokens[j] === "}" ||
            tokens[j] === "]" ||
            tokens[j] === "[" ||
            tokens[j] === "=" ||
            tokens[j] === "," ||
            tokens[j] === "(" ||
            tokens[j] === ")"
          ) {
            i = j - 1;
            break;
          }
          buf += tokens[j];
        }

        result.push({
          type: "keyword",
          value: buf,
        });

        buf = "";

        break;
    }
  }

  return result;
}
