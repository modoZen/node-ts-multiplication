import { mkdirSync, writeFileSync } from "fs";

export interface SaveFileUseCase {
  execute: (options: Options) => boolean;
}

export interface Options {
  fileContent: string;
  destination?: string;
  fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
  constructor() {}

  execute({
    fileContent,
    destination = "outputs",
    fileName = "table",
  }: Options): boolean {
    try {
      const outputPath = `${destination}/${fileName}.txt`;
      mkdirSync(destination, { recursive: true });
      writeFileSync(outputPath, fileContent);
      console.log("carga exitosa de tabla");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
