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

  return `function ${name}(${proc_args}) {
  ${content}
}`;
}

function instruction(name: string, args: any[]) {
  return `${name.replaceAll("-", ".")}(${args
    .map((arg) => {
      if (arg.type == "string") return `"${arg.value}"`;
      else return arg.value;
    })
    .join(", ")});`;
}
