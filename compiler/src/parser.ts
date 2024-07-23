export default function parser(
  lexer_out: {
    type: string;
    value: string;
  }[],
): any {
  let open_scope = {};

  let children = [];

  for (let i = 0; i < lexer_out.length; i++) {
    switch (lexer_out[i].type) {
      case "function":
        const [content, moveBy] = getScopeContent(i, lexer_out);

        children.push({
          type: "function",
          name: lexer_out[i].value,
          children: parser(content),
        });

        i = moveBy;

        break;

      case "keyword":
        const args = [];
        let name = "";

        for (let j = i; j < lexer_out.length; j++) {
          if (lexer_out[j].type == "semicolon") {
            i = j;
            break;
          }

          if (j == i) name = lexer_out[j].value;
          else if (lexer_out[j].type == "colon") continue;
          else args.push(lexer_out[j].value);
        }

        children.push({
          type: "instruction",
          name: name,
          args: args,
        });

        break;

      default:
        children.push(lexer_out[i]);
        break;
    }
  }

  return children;
}

function getScopeContent(index: number, lexer_out: any): [any, number] {
  let open = 0;
  const content: {
    type: string;
    value: string;
  }[] = [];

  for (let i = index + 1; i < lexer_out.length; i++) {
    switch (lexer_out[i].type) {
      case "open-curly-brace":
        open++;
        break;

      case "close-curly-brace":
        open--;

        if (open === 0) {
          return [content, i];
        }

        break;

      default:
        content.push(lexer_out[i]);

        break;
    }
  }

  return [content, 0];
}
