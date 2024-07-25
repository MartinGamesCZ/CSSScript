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

const modules = new Map();
const functions = new Map();
const bindings = new Map();

function getObjectValue(obj, keys) {
  let val = obj;

  for (let i = 0; i < keys.length; i++) {
    val = val[keys[i]];
  }

  return val;
}

async function import_binding(name) {
  const binding = await import(`./bindings/${name}`);

  bindings.set(name.split(".")[0], binding);
}

async function bind_function(name) {
  const sp = name.split("-");
  const binding = bindings.get(sp.shift());
  const fn = getObjectValue(binding, sp);

  const res = await fn(getVariable("args"));

  setVariable("result", res);
}

async function import_module(name) {
  const module = await import(name);

  modules.set(name, module);

  setVariable("express", module);
}

function define_function(name, fn) {
  functions.set(name, fn);

  setVariable(name, fn);
}

async function call_function(name, ...args) {
  let fn =
    functions.get(name.split(".")[0]) ??
    variables.get(name.split(".")[0]) ??
    modules.get(name.split(".")[0]);

  if (name.includes(".")) {
    fn = getObjectValue(fn, name.split(".").slice(1));
  }

  if (!fn) throw new Error(`Function ${name} not found`);

  setVariable("args", args);

  const res = await fn(...args);

  if (typeof res != "undefined") {
    setVariable("result", res);
  }
}

define_function("print", console.log);
define_function("prompt", input.read);
define_function("fetch", request);
define_function("json", JSON);
