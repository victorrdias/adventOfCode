var fs = require("fs");

export const dia5 = () => {
  const fileData: string = fs.readFileSync("exercicios/file5.txt", "utf8");
  const [stack, moves] = fileData.split("\r\n\r\n");

  const stack1 = stack.split("\r\n");

  const res = stack1.map((str) => str.replace(/\d/g, ""));

  const transformArray = (arr: string[]) => {
    let result: string[][] = [];

    arr.forEach((row) => {
      row.split("").forEach((char, colIndex) => {
        if (char.match(/[A-Z]/)) {
          result[colIndex] = result[colIndex] || [];

          result[colIndex].unshift(char);
        }
      });
    });

    return result.filter((subArray) => subArray.length > 0);
  };

  const transformedArray = transformArray(res);

  let initialStack = transformedArray;

  const movesContent: string[] = moves.trim().split("\n");

  movesContent.forEach((move) => {
    const n = move.split(/\D+/).filter(Boolean);

    const [n1, n2, n3] = n;

    const containerMovimentsNumber = Number(n1);
    const containerInitialPosition = Number(n2) - 1;
    const containerFinalPosition = Number(n3) - 1;

    let stack: string[] = [];

    const movedCrates = initialStack[containerInitialPosition].splice(
      -containerMovimentsNumber
    );
    console.log("movedCrates", movedCrates);
    initialStack[containerFinalPosition].push(...movedCrates);
  });

  console.log(stack);

  const vitin = initialStack;

  console.log("vitin", vitin);

  console.log("n", initialStack.map((s) => s[s.length - 1]).join(""));
};

export default dia5;
