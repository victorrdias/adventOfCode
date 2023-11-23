var fs = require("fs");

const checkMoreFoodElf = () => {
  const fileData = fs.readFileSync("exercicios/file.txt", "utf8");

  const groups = fileData.split("\r\n\r\n");

  const cumulative = [];

  for (const group of groups) {
    const strings = group.split("\r\n");

    let sum = 0;

    for (const str of strings) {
      const num = parseFloat(str);

      sum += num;
    }

    cumulative.push(sum);
  }

  const melhorElfo = Math.max(...cumulative);

  const melhorElfoIndex = cumulative.indexOf(melhorElfo);

  const arrayWithout1Elfo = cumulative.slice(0, melhorElfoIndex - 1);
  const arrayWithout1Elfo2 = cumulative.slice(melhorElfoIndex + 1);

  const segundoElfoPorra = arrayWithout1Elfo.concat(...arrayWithout1Elfo2);

  const segundoMelhorElfo = Math.max(...segundoElfoPorra);
  const segundoMelhorElfoIndex = segundoElfoPorra.indexOf(segundoMelhorElfo);

  const arrayWithoutTwoElfs = segundoElfoPorra.slice(
    0,
    segundoMelhorElfoIndex - 1
  );
  const arrayWithoutTwoElfs2 = segundoElfoPorra.slice(
    segundoMelhorElfoIndex + 1
  );

  const terceiroElfoPorra = arrayWithoutTwoElfs.concat(...arrayWithoutTwoElfs2);

  const terceiroMelhorElfo = Math.max(...terceiroElfoPorra);

  console.log("terceiroMelhor", terceiroMelhorElfo);

  console.log("segundo", segundoMelhorElfo);

  console.log("segundo melhor", segundoMelhorElfo);

  console.log("melhor elfo", melhorElfo);

  const elfsSum = melhorElfo + segundoMelhorElfo + terceiroMelhorElfo;
  console.log("elfsSum", elfsSum);
};
export default checkMoreFoodElf;
