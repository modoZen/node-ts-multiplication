import { SaveFile } from "./save-file.use-cases";
import fs from "fs";

describe("save-file.use-cases", () => {
  const options = {
    fileContent: "custom content",
    destination: "custom-outputs",
    fileName: "custom-table-name",
  };

  const filePath = `${options.destination}/${options.fileName}.txt`;

  afterEach(() => {
    const outputFolderExists = fs.existsSync("outputs");
    if (outputFolderExists) fs.rmSync("outputs", { recursive: true });

    const customOutputFolderExists = fs.existsSync(options.destination);
    if (customOutputFolderExists)
      fs.rmSync(options.destination, { recursive: true });
  });

  it("should save file with default values", () => {
    const saveFile = new SaveFile();
    const filePath = "outputs/table.txt";
    const options = {
      fileContent: "test content",
    };

    const result = saveFile.execute(options);
    expect(result).toBeTruthy();
    const checkFile = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    expect(checkFile).toBeDefined();
    expect(fileContent).toBe(options.fileContent);
  });

  it("should save file with custom values", () => {
    const saveFile = new SaveFile();

    const result = saveFile.execute(options);
    expect(result).toBeTruthy();
    const checkFile = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    expect(checkFile).toBeDefined();
    expect(fileContent).toBe(options.fileContent);
  });

  it("should return false if directory could not be created", () => {
    const saveFile = new SaveFile();
    const mkdirSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
      throw new Error("This is a custom error message from testing");
    });

    const result = saveFile.execute(options);
    expect(result).toBeFalsy();

    mkdirSpy.mockRestore();
  });

  it("should return false if directory could not be created", () => {
    const saveFile = new SaveFile();
    const writeFyleSpy = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation(() => {
        throw new Error("This is a custom writing error message");
      });

    const result = saveFile.execute(options);
    expect(result).toBeFalsy();
    writeFyleSpy.mockRestore();
  });
});
