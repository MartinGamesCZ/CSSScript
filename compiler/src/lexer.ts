export default function lexer(script: string) {
  const tokens = script.split("");

  let buf = "";

  const result = [];

  for (let i = 0; i < tokens.length; i++) {
    switch (tokens[i]) {
      case ".":
        for (let j = i + 1; j < tokens.length; j++) {
          if (tokens[j] === " " || tokens[j] === "{") {
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

      case " ":
        break;

      case "\n":
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
          if (tokens[j] === " " || tokens[j] === ":") {
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
