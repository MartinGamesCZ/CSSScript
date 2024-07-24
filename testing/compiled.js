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
  
  await request.json("https://jsonplaceholder.typicode.com/todos/1");await println(getVariable("result"));
}
async function println(text) {
  setVariable("text", text);
  await console.log(getVariable("text"));
}
