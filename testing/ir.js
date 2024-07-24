async function main() {
  
  await input.read("Your name:");await greet(getVariable("result"));
}
async function greet(name) {
  setVariable("name", name);
  await process.stdout.write("Hello, ");await process.stdout.write(getVariable("name"));await process.stdout.write("!\n");
}
async function print(text) {
  setVariable("text", text);
  await process.stdout.write(getVariable("text"));
}
async function println(text) {
  setVariable("text", text);
  await console.log(getVariable("text"));
}
