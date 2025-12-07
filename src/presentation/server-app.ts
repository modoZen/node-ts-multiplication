import { CreateTable } from "../domain/use-cases/create-table.use-cases";
import { SaveFile } from "../domain/use-cases/save-file.use-cases";

interface RunOptions {
  base: number;
  limit: number;
  showTable: boolean;
}

export class ServerApp {
  static run({ base, limit, showTable }: RunOptions) {
    console.log("Server running...");

    const table = new CreateTable().execute({ base, limit });
    const isCreated = new SaveFile().execute({
      fileContent: table,
      destination: `outputs/table-${base}`,
    });

    if (showTable) console.log(table);

    isCreated ? console.log("File created") : console.error("File not created");
  }
}
