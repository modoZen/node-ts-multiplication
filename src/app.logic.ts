// import { mkdirSync, writeFileSync } from "fs";

import { mkdir, writeFile } from "fs/promises";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const base = 5;
let template = `===================\n    Tabla del ${base}    \n===================`;

numbers.forEach((number) => {
  const newLine = `${base} x ${number} = ${base * number}`;
  template = `${template}\n${newLine}`;
});

console.log(template);

const folder = "outputs";

// const outputPath = resolve(process.cwd(), folder, `table-${base}.txt`);

const outputPath = `${folder}/table-${base}.txt`;

const saveFile = async () => {
  await mkdir(folder, { recursive: true });
  await writeFile(outputPath, template);
  console.log("carga exitosa de tabla");
};

saveFile();

// mkdirSync(folder, { recursive: true });
// writeFileSync(outputPath, template);
// console.log("carga exitosa de tabla");
