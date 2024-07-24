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

main();
