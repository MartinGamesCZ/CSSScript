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
        const [content, fargs, moveBy] = getScopeContent(i, lexer_out);

        children.push({
          type: "function",
          name: lexer_out[i].value,
          args: parseFnArgs(fargs),
          children: parser(content),
        });

        i = moveBy;

        break;

      case "variable":
        const var_name = lexer_out[i].value;
        const var_value = lexer_out[i + 2];

        children.push({
          type: "variable",
          name: var_name,
          value: var_value,
        });

        i += 3;
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
          else {
            const next = lexer_out[j + 1];

            if (next.type == "open-parenthesis") {
              const invocation_name = lexer_out[j].value;

              if (invocation_name == "var") {
                const var_name = lexer_out[j + 2].value;

                args.push({
                  type: "variable-use",
                  value: var_name,
                });

                j += 3;

                continue;
              }
            }

            args.push(lexer_out[j]);
          }
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

function getScopeContent(index: number, lexer_out: any): [any, any, number] {
  let openCurly = 0;
  let openSquare = 0;
  const content: {
    type: string;
    value: string;
  }[] = [];
  const args: any[] = [];

  for (let i = index + 1; i < lexer_out.length; i++) {
    switch (lexer_out[i].type) {
      case "open-curly-brace":
        openCurly++;
        break;

      case "close-curly-brace":
        openCurly--;

        if (openCurly === 0) {
          return [content, args, i];
        }

        break;

      case "open-square-brace":
        openSquare++;
        break;

      case "close-square-brace":
        openSquare--;
        break;

      default:
        if (openSquare === 1) args.push(lexer_out[i]);
        else content.push(lexer_out[i]);

        break;
    }
  }

  return [content, args, 0];
}

function parseFnArgs(fargs: any[]): any[] {
  const args: {
    name: string;
    default_value: string;
  }[] = [];

  let temp:
    | {
        name: string;
        default_value: string;
      }
    | any = {};

  for (let i = 0; i < fargs.length; i++) {
    switch (fargs[i].type) {
      case "keyword":
        temp.name = fargs[i].value;
        break;

      case "equals":
        const next = fargs[i + 1];

        temp.default_value = next.value;

        args.push(temp);
        temp = {};

        i += 2;

        break;

      case "comma":
        args.push(temp);
        temp = {};
        break;
    }
  }

  if (temp.name) args.push(temp);

  return args;
}
