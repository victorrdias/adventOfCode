// ("Oi, tudo bem?", 20) -> "Oi, tudo bem?"
// ("Bem-vindo, tudo bem?", 3) -> "..."
// ("Oi, tudo bem?", 8) -> "Oi, ..."
// ("Oi, tudo bem?", 7) -> "Oi, ..."
// ("Oi, tudo bem?", 12) -> "Oi, tudo ..."

const especial = () => {
  const input: [string, number][] = [
    ["Oi, tudo bem?", 20],
    ["Bem-vindo, tudo bem?", 3],
    ["Oi, tudo bem?", 7],
    ["Oi, tudo bem?", 7],
    ["Oi, tudo bem?", 12],
    ["oi, tudo bem tudo bem tudo bem", 6],
  ];

  const output: string[] = input.map(([str, num]) => {
    if (str.length <= num) {
      return str;
    } else {
      const lastIndex = str.lastIndexOf(" ", num);

      console.log("lastIndex", lastIndex);

      const stringSliced = `${str.slice(0, lastIndex)} ...`;
      console.log("stringSliced", stringSliced);

      return stringSliced;
    }
  });

  console.log("ot", output);
  return output;
};

export default especial;
