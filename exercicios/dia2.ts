var fs = require("fs");

// [A - X] = LOSE => 3 POINTS == [A=pedra - Z=tesoura]
// [A - Y] = DRAW => 4 POINTS == [A=pedra - X=pedra]
// [A - Z] = WIN => 8 POINTS == [A=pedra - Y=papel]

// [B - X] = LOSE => 1 POINTS == [B=papel - X=pedra]
// [B - Y] = DRAW => 5 POINTS == [B=papel - Y=papel]
// [B - Z] = WIN => 9 POINTS == [B=papel - Z=tesoura]

// [C - X] = LOSE => 2 POINTS == [C=tesoura - Y=papel]
// [C - Y] = DRAW => 6 POINTS == [C=tesoura - Z=tesoura]
// [C - Z] = WIN => 7 POINTS == [C=tesoura - X=pedra]

export const dia2 = () => {
  const fileData: string = fs.readFileSync("exercicios/file2.txt", "utf8");
  const newInputData: string[] = fileData
    .split("\n")
    .filter((l) => l.trim() !== "");
  console.log("filedata", newInputData);

  interface ValueMap {
    X: number;
    Y: number;
    Z: number;
  }

  interface Values {
    [key: string]: ValueMap;
  }

  const values: Values = {
    A: {
      X: 4,
      Y: 8,
      Z: 3,
    },
    B: {
      X: 1,
      Y: 5,
      Z: 9,
    },
    C: {
      X: 7,
      Y: 2,
      Z: 6,
    },
  };

  let total = 0;

  for (const inputLine of newInputData) {
    const [move, value]: string[] = inputLine.trim().split(" ");

    if (value && values[move] && values[move][value as keyof ValueMap]) {
      total += values[move][value as keyof ValueMap];
    }
  }
  console.log("results", total);
};
