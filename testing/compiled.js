const variables = new Map();

function setVariable(name, value) {
  variables.set(name, value);
}

function getVariable(name) {
  return variables.get(name);
}

const request = {
  json: async (url) => {
    const res = await fetch(url).then((res) => res.json());

    setVariable("result", res);
  },
};

const input = {
  read: async (name) => {
    const res = prompt(name);

    setVariable("result", res);
  },
};

main();

async function main() {
  
  await input.read("Is AI sentinent? ");if (getVariable("result")!="Yes") {
  await println("Okay, fine.");
}if (getVariable("result")=="Yes") {
  await println("Oh shit! We will die.");
}
}
async function print(text) {
  setVariable("text", text);
  await process.stdout.write(getVariable("text"));
}
async function println(text) {
  setVariable("text", text);
  await console.log(getVariable("text"));
}
