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
