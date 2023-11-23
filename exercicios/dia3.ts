// 1 mochila = 2 compartimentos
// compartimentos tem tipos
// uma bolsa com compartimento nao segue essa regra
// a and A are diferents
//all items are represented by letters in a single line (ttgJtRGJQctTZtZT)
//each rucksack have one unorganized letter, that means the same letter appears in first half and the second half
//first half of items represents first compartment.
// [1] alfabeto minusculo [27] alfabeto maisculo [52]

// elves are divided in 3
// each elf have an bagde in bag to identify group
// this badge are the item contained in 3 of elves
// only one item will be contained in all of 3 elves in group

//WE SHOULD FOUND BADGE FOR EACH GROUP AND SUM IT

//WE SHOULD FOUND FOR EVERY RUCKSACK THE SAME LETTER IN TWO HALFS, AND SUM THAT
var fs = require("fs");
const dia3 = () => {
  const fileData: string = fs.readFileSync("exercicios/file3.txt", "utf8");

  const fileDataArray: string[] = fileData.split("\r\n");

  const fileDataBlocks: string[][] = [];

  for (let i = 0; i < fileDataArray.length; i += 3) {
    const groupBlock = fileDataArray.slice(i, i + 3);
    fileDataBlocks.push(groupBlock);
  }

  const letterValue = (letter: string): number => {
    const isLowerCase = /[a-z]/.test(letter);
    const isUpperCase = /[A-Z]/.test(letter);
    if (isLowerCase) {
      const lowerCaseAlphabetIndex =
        letter.charCodeAt(0) + 1 - "a".charCodeAt(0);

      return lowerCaseAlphabetIndex;
    } else if (isUpperCase) {
      const upperCaseAlphabetIndex =
        letter.charCodeAt(0) + 27 - "A".charCodeAt(0);

      return upperCaseAlphabetIndex;
    }
    return 0;
  };

  let runningSum = 0;

  const iterateArray = () => {
    fileDataBlocks.map((stringGroup) => {
      const [first, second, third] = stringGroup.map(
        (str) => new Set(str.split("").filter((char) => char !== "\r"))
      );

      const common = Array.from(first).filter(
        (char) => second.has(char) && third.has(char)
      );

      const sum = common.reduce((acc, letter) => acc + letterValue(letter), 0);
      runningSum += sum;

      return sum;
    });

    return runningSum;
  };

  const sumPart2 = iterateArray();

  //FIRST PART
  const splitInput = (string: string) => {
    const vituxotextoLength = string.length;

    const lenghtHalf = vituxotextoLength / 2;

    const firstCompartment = string.substring(0, lenghtHalf);
    const secondCompartment = string.substring(lenghtHalf);

    return [firstCompartment, secondCompartment];
  };

  const compairStringContent = (string: string) => {
    const [firstCompartment, secondCompartment] = splitInput(string);

    const lettersFirstCompartment = new Set(firstCompartment);

    const lettersSecondCompartment = new Set(secondCompartment);

    const commonLetters = Array.from(
      new Set(
        [...lettersFirstCompartment].filter((letter) =>
          lettersSecondCompartment.has(letter)
        )
      )
    );
    return commonLetters;
  };

  let sum = 0;

  fileDataArray.forEach((fileString) => {
    const commonLetters = compairStringContent(fileString);

    const values = letterValue(commonLetters[0]);

    sum += values;
  });

  console.log("part 1", sum);
  console.log("part 2", sumPart2);
};

export default dia3;
