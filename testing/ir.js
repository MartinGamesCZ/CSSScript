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
