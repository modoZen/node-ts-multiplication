import { CreateTable } from "./create-table.use-cases";

describe("create-table.use-cases", () => {
  it("should create table with default values", () => {
    const base = 2;
    const createTable = new CreateTable();

    const table = createTable.execute({ base });
    const row = table.split("\n").length;

    expect(createTable).toBeInstanceOf(CreateTable);
    expect(table).toContain("2 x 1 = 2");
    expect(table).toContain("2 x 10 = 20");
    expect(row).toBe(14);
  });

  it("should create table with custom values", () => {
    const options = {
      base: 3,
      limit: 20,
    };

    const table = new CreateTable().execute(options);
    const row = table.split("\n").length;

    expect(table).toContain("3 x 1 = 3");
    expect(table).toContain("3 x 20 = 60");
    expect(row).toBe(options.limit + 4);
  });
});
