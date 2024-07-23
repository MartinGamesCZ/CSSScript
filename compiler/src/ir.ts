export default function generate_ir(parsed: any) {
  let out = "";

  for (let i = 0; i < parsed.length; i++) {
    switch (parsed[i].type) {
      case "function":
        out += fn(parsed[i].name, generate_ir(parsed[i].children));
        break;

      case "instruction":
        out += instruction(parsed[i].name, parsed[i].args);
        break;
    }
  }

  return out;
}

function fn(name: string, content: string) {
  return `function ${name}() {
  ${content}
}`;
}

function instruction(name: string, args: any[]) {
  return `${name.replaceAll("-", ".")}(${args
    .map((arg) => {
      if (typeof arg === "string") return `"${arg}"`;
      else return arg;
    })
    .join(", ")});`;
}
