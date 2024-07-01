//Every section has unique ID number;
//Each Elf is assigned a range of section IDs;
//many of the assignments overlap, causing more than one Elf to claim ownership of the same sections.
// 0-9 = 123456789 || 4-6 = 456 || 5-9 = 56789;
//.2345678.  2-8 => contem 3-7
//..34567..  3-7
var fs = require("fs");

const dia4 = () => {
  const fileData: string = fs.readFileSync("exercicios/file4.txt", "utf8");

  const fileArray = fileData.split("\n");

  const filteredFile = fileArray.map((numberLine) => {
    const pairs = numberLine.trim().split(",");

    const pairsArray = pairs.map((pair) => {
      const [first, second] = pair.split("-");
      return [first, second];
    });

    return pairsArray;
  });

  const numbers = filteredFile.map((numberGroup) => {
    return numberGroup.map((n) => n);
  });

  let counter: number = 0;

  numbers.map((pair) => {
    const [first, second] = pair;
    console.log("first", first);
    console.log("second", second);
    //first part
    const conditions =
      Number(first[0]) <= Number(second[0]) &&
      Number(first[1]) >= Number(second[1]);

    const conditions2 =
      Number(second[0]) <= Number(first[0]) &&
      Number(second[1]) >= Number(first[1]);

    // if (conditions || conditions2) {
    //   counter++;
    // }

    //second part
    const conditions3 =
      Number(first[0]) <= Number(second[1]) &&
      Number(second[0]) <= Number(first[1]);

    if (conditions3) {
      counter++;
    }

    console.log("counter", counter);
  });
};

export default dia4;
