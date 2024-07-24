export default function generate_ir(parsed: any) {
  let out = "";

  for (let i = 0; i < parsed.length; i++) {
    switch (parsed[i].type) {
      case "function":
        out += fn(
          parsed[i].name,
          parsed[i].args,
          generate_ir(parsed[i].children),
        );
        break;

      case "variable":
        if (
          parsed[i].value.type == "keyword" &&
          parsed[i].value.value == "var"
        ) {
          out += variable(parsed[i].name, parsed[i + 1]);

          i += 2;
        } else out += variable(parsed[i].name, parsed[i].value);
        break;

      case "variable-use":
        out += variable_use(parsed[i].value);
        break;

      case "instruction":
        out += instruction(parsed[i].name, parsed[i].args);
        break;
    }
  }

  return out;
}

function fn(
  name: string,
  args: {
    name: string;
    default_value?: string;
  }[],
  content: string,
) {
  const proc_args = args
    .map((a) => a.name + (a.default_value ? ` = "${a.default_value}"` : ""))
    .join(", ");

  return `async function ${name}(${proc_args}) {
  ${args
    .map((a) => {
      return variable(
        a.name,
        a.default_value
          ? {
              type: "raw-var-expression",
              value: `${a.name} ?? "${a.default_value}"`,
            }
          : {
              type: "raw-var",
              value: a.name,
            },
      );
    })
    .join("\n")}
  ${content}
}\n`;
}

function instruction(name: string, args: any[]) {
  return `await ${name.replaceAll("-", ".")}(${args
    .map((arg) => {
      if (arg.type == "string") return `"${arg.value}"`;
      if (arg.type == "variable-use") return variable_use(arg.value);
      else return arg.value;
    })
    .join(", ")});`;
}

function variable(name: string, value: any) {
  return `setVariable("${name}", ${value.type == "string" ? `"${value.value}"` : value.type == "variable-use" ? variable_use(value.value) : value.value});`;
}

function variable_use(name: string) {
  return `getVariable("${name}")`;
}
