import { mkdirSync, writeFileSync } from "fs";
// import { mkdir, writeFile } from "fs/promises";
import { yarg } from "./config/plugin/args.plugin";

// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const { b: base, l: limit, s } = yarg;

let template = `===================\n    Tabla del ${base}    \n===================`;

for (let number = 1; number <= limit; number++) {
  const newLine = `${base} x ${number} = ${base * number}`;
  template = `${template}\n${newLine}`;
}

// numbers.forEach((number) => {
//   const newLine = `${base} x ${number} = ${base * number}`;
//   template = `${template}\n${newLine}`;
// });

s && console.log(template);

const folder = "outputs";

// const outputPath = resolve(process.cwd(), folder, `table-${base}.txt`);

const outputPath = `${folder}/table-${base}.txt`;

// const saveFile = async () => {
//   await mkdir(folder, { recursive: true });
//   await writeFile(outputPath, template);
//   console.log("carga exitosa de tabla");
// };

// saveFile();

mkdirSync(folder, { recursive: true });
writeFileSync(outputPath, template);
console.log("carga exitosa de tabla");
