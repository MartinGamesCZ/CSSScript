async function main() {
  
  await request.json("https://randomuser.me/api/");await println(getVariable("result"));
}
async function print(text, text2) {
  setVariable("text", text);
setVariable("text2", text2);
  await process.stdout.write(getVariable("text"));
}
async function println(text) {
  setVariable("text", text);
  await console.log(getVariable("text"));
}
