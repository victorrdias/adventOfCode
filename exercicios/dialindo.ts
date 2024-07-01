/**
 * Example grid containing 3 blobs (labels are for ease of reading only)
 *
 * grid = [
 *     "00010", # | | | |A| |
 *     "01101", # | |B|B| |B|
 *     "00111", # | | |B|B|B|
 *     "11010", # |C|C| |B| |
 *     "11000"  # |C|C| | | |
 * ]
 */

const dialindo = () => {
  let input: string[] = [
    "00010", // | | | |A| |
    "01101", // |B| |B| |C|
    "00111", // | | |B| |C|
    "11010", // |D|D| |E| |
    "11000", // |D|D| | |F|
  ];

  let x = solution(input, 11);

  console.log("resposta", x);

  function solution(grid: string[], minimunSize: number): number {
    let n = 0;

    let visits: boolean[][] = new Array(grid.length);

    for (let i = 0; i < grid.length; i++) {
      visits[i] = new Array(grid[i].length);
    }

    for (let i = 0; i < visits.length; i++) {
      for (let j = 0; j < visits[i].length; j++) {
        // console.log("JOTA", j);
        // console.log("visitsporram...", visits[i]);  console.log("j", j);
        const blobSize = f(grid, i, j, visits, minimunSize);
        if (blobSize >= minimunSize) n += 1;
      }

      // console.log("i", i);
    }

    return n;
  }

  function f(
    grid: string[],
    i: number,
    j: number,
    visits: boolean[][],
    minimunSize: number
  ): number {
    if (
      i < 0 ||
      j < 0 ||
      i >= grid.length ||
      j >= grid[i].length ||
      visits[i][j]
    )
      return 0;

    if (grid[i][j] === "0") return 0;

    visits[i][j] = true;

    let size = 1;

    size += f(grid, i + 1, j, visits, minimunSize);
    size += f(grid, i - 1, j, visits, minimunSize);
    size += f(grid, i, j + 1, visits, minimunSize);
    size += f(grid, i, j - 1, visits, minimunSize);
    console.log("size", size);

    return size;
  }
};
export default dialindo;
