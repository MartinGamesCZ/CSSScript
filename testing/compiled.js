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

async function println(text) {
  setVariable("text", text);
  await console.log(getVariable("text"));
}
async function main() {
  
  await input.read("Gender (M/F):");await get_greeting(getVariable("result"));await println(getVariable("result"));
}
async function get_greeting(gender) {
  setVariable("gender", gender);
  if (getVariable("gender")=="M") {
  setVariable("result", "Hello, Sir!");return;

}if (getVariable("gender")=="F") {
  setVariable("result", "Hello, Madam!");return;

}setVariable("result", "Hello, there!");return;

}
