async function main() {
  
  await request.json("https://jsonplaceholder.typicode.com/todos/1");await println(getVariable("result"));
}
async function println(text) {
  setVariable("text", text);
  await console.log(getVariable("text"));
}
