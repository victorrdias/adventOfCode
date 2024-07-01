//The total size of a directory is the sum of the sizes of the
//files it contains, directly or indirectly.
// cd means change directory. This changes which directory is the current directory, but the specific result depends on the argument:
// cd x moves in one level: it looks in the current directory for the directory named x and makes it the current directory.
// cd .. moves out one level: it finds the directory that contains the current directory, then makes that directory the current directory.
// cd / switches the current directory to the outermost directory, /.
// ls means list. It prints out all of the files and directories immediately contained by the current directory:
// 123 abc means that the current directory contains a file named abc with size 123.

import { run } from "node:test";

// dir xyz means that the current directory contains a directory named xyz.
var fs = require("fs");

export interface NodeType {
  children: NodeType[];
  size: number;
  isDir: boolean | undefined;
}

export interface CommandFlags {
  cd: boolean;
  ls: boolean;
  isCommand: boolean | undefined;
  currentPath: string | undefined;
}

interface Node {
  name: string;
  type: "file" | "dir";
  size?: number;
  children?: Node[];
}

const dia7 = () => {
  const input = fs.readFileSync("exercicios/file7.txt", "utf8");

  const handleInput = (input: string) => {
    const inputLine = input.split("\n");
    return inputLine;
  };

  const inputLine = handleInput(input);

  const handleIsCommandLs = (input: string[]) => {
    for (const line of input) {
      const isCommandLs = line.startsWith("$ ls");

      return isCommandLs;
    }
  };

  const handleIsCommandCd = (input: string[]) => {
    for (const line of input) {
      const isCommandCd = line.startsWith("$ cd");

      return isCommandCd;
    }
  };

  const handleIsDir = (input: string[]) => {
    for (const line of input) {
      const isDir = line.startsWith("dir");
      // console.log("isDir", isDir);
      return isDir;
    }
  };

  const handleIsNumber = (input: string[]) => {
    for (const line of input) {
      const isNumber = line.includes(
        "1" || "2" || "3" || "4" || "5" || "6" || "7" || "8" || "9" || "0"
      );
      return isNumber;
    }
  };
  // let fileLines = [""];

  // const handlePopulateInput = (input: string[]) => {
  //   for (const line of input) {
  //     const filteredLine = line.replace("\r", "");
  //     const isNumber = handleIsNumber([filteredLine]);
  //     const isDir = handleIsDir([filteredLine]);
  //     const isCommandLs = handleIsCommandLs([filteredLine]);
  //     const isCommandCd = handleIsCommandCd([filteredLine]);

  //     if (isNumber) {
  //       fileLines.push(filteredLine);
  //       console.log("isNumber", filteredLine);
  //     } else if (isDir) {
  //       fileLines.push(filteredLine);
  //     } else if (isCommandCd) {
  //       console.log("isCommandCd", filteredLine);
  //       fileLines.push(filteredLine);
  //     } else if (isCommandLs) {
  //       console.log("isCommandLs", filteredLine);
  //       fileLines.push(filteredLine);
  //     }
  //   }
  // };

  const handlePopulateTree = (fileLines: string[]) => {
    const root: Node = { name: "/", type: "dir", children: [] };

    let currentDir: Node = root;

    for (const line of fileLines) {
      if (line.startsWith("dir")) {
        const dirName = line.substring(4).trim();

        const newDir: Node = { name: dirName, type: "dir", children: [] };

        console.log("newDir", newDir);

        console.log("currentDir", currentDir);

        currentDir.children!.push(newDir);
      } else if (line.startsWith("$ cd")) {
        const commandParts = line.split(" ");

        const targetDirName =
          commandParts[2] === "/" ? "/" : commandParts[2].replace("\r", "");
        // console.log("tarngetDirName", targetDirName);
        if (targetDirName === "..") {
          currentDir = getPartentalDir(currentDir, root)!;
        } else {
          currentDir = findDir(currentDir, targetDirName, root)!;
        }
      } else if (line.startsWith("$ ls")) {
      } else {
        const [size, fileName] = line.split(" ");

        currentDir!.children!.push({
          name: fileName.replace("\r", ""),
          type: "file",
          size: parseInt(size),
        });
      }
    }
    return root;
  };

  const getPartentalDir = (currentDir: Node, root: Node) => {
    // console.log("currentdir==root", currentDir);
    // console.log("root", root);
    // console.log("currentDir!=root", currentDir);
    if (currentDir === root) return root;
    // console.log("currentDir", currentDir);
    const parentPath = currentDir.name.split("/").slice(0, -1).join("/");
    // console.log("parentPath", parentPath);
    if (parentPath === "") return root;
    return findDir(currentDir, parentPath, root);
  };

  const findDir = (
    currentDir: Node,
    targetDirName: string,
    root: Node
  ): Node => {
    console.log("root", root);
    console.log("targetDirName", targetDirName);
    console.log("currentDir", currentDir);

    if (targetDirName === "/") return root;

    for (const child of currentDir!.children!) {
      if (child.type === "dir" && child.name === targetDirName) {
        return child;
      }
    }

    const nodeChildren: Node = {
      name: targetDirName,
      type: "dir",
      children: [],
    };

    currentDir!.children!.push(nodeChildren);

    return nodeChildren;
  };
  handlePopulateTree(inputLine);

  let docSum = 0;
  const runTree = (node: Node, space: string = " ") => {
    let dirSum = 0;

    if (!node.children) return;

    for (const child of node.children ?? []) {
      //PRECISO SOMAR O TAMANHO DOS DIRETORIOS EM TODAS AS CAMADAS. O DOCSUM TAMBEM TEM QUE CONTAR.
      if (child.type === "dir") {
        const fnDirSum = runTree(child, space + "  ");
        child.size = fnDirSum;
      }

      if (child.size !== undefined) {
        console.log(
          `${space}- ${child.name.replace("\r", "")} (${child.type}, size=${
            child.size < 100000 ? child.size : ">100000"
          })`
        );

        const childSize = child.size;
        if (dirSum < 100000 || childSize < 100000) {
          dirSum += childSize;
        }
        // console.log("childSize", childSize);

        console.log(
          `${space}- ${child.name.replace("\r", "")} (${child.type}, size=${
            child.size === undefined ? "" : child.size
          })`
        );
      }
    }
    console.log("dirSum", dirSum);
    if (dirSum < 100000) {
      docSum += dirSum;
    }

    console.log("docSum", docSum);
    return dirSum;
  };

  const root = handlePopulateTree(inputLine);
  runTree(root);
};

export default dia7;

// - / (dir)
//   - a (dir)
//     - e (dir)
//       - i (file, size=584)
//     - f (file, size=29116)
//     - g (file, size=2557)
//     - h.lst (file, size=62596)
//   - b.txt (file, size=14848514)
//   - c.dat (file, size=8504156)
//   - d (dir)
//     - j (file, size=4060174)
//     - d.log (file, size=8033020)
//     - d.ext (file, size=5626152)
//     - k (file, size=7214296)

// dir /
//   dir a
//   b.txt
//   c.dat
//   dir d
//   dir a
//     dir e
//     f.file
//     g.file
//     h.file
//     dir e
//       i.file
//   dir a
// dir /
//   dir d
//     j.file
//     d.file
//     w.file
//     u.file
