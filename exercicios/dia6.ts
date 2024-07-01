var fs = require("fs");
const dia6 = () => {
  const input = fs.readFileSync("exercicios/file6.txt", "utf8");

  console.log("input", input);

  const getMarker = (input: string) => {
    const newInput: string[] = input.split("");
    console.log("newInput", newInput[1093]);

    for (let i = 0; i < newInput.length; i++) {
      const repeated = newInput.slice(i, i + 14);

      const repeatedString = new Set(repeated);

      // console.log("repeatedString", repeatedString);
      if (repeatedString.size === 14) {
        console.log("repeated", repeated);
        console.log("", i + 14);
        return;
      }
    }
  };
  getMarker(input);
};
export default dia6;
