import { log } from "console";
import { CreateTable } from "../domain/use-cases/create-table.use-cases";
import { SaveFile } from "../domain/use-cases/save-file.use-cases";
import { ServerApp } from "./server-app";

describe("server app tests", () => {
  const options = {
    base: 5,
    limit: 10,
    showTable: false,
    destination: "test-destination",
    fileName: "test-fileName",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create ServerApp instance", () => {
    const serverApp = new ServerApp();
    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe("function");
  });

  it("should run ServerApp with given options", () => {
    const logSpy = jest.spyOn(console, "log");
    const createTableSpy = jest.spyOn(CreateTable.prototype, "execute");
    const saveFileSpy = jest.spyOn(SaveFile.prototype, "execute");
    ServerApp.run(options);
    expect(logSpy).toHaveBeenCalledWith("Server running...");
    expect(logSpy).toHaveBeenCalledWith("File created");
    expect(createTableSpy).toHaveBeenCalledWith({ base: 5, limit: 10 });
    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      destination: "test-destination",
      fileName: "test-fileName",
    });
  });

  it("should run ServerApp with custom mocked", () => {
    const logMock = jest.fn();
    const logErrorMock = jest.fn();
    const createMock = jest.fn().mockReturnValue("test");
    const saveFileMock = jest.fn().mockReturnValue(true);

    console.log = logMock;
    console.error = logErrorMock;
    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveFileMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith("Server running...");
    expect(createMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      destination: options.destination,
      fileName: options.fileName,
    });
    expect(logMock).toHaveBeenCalledWith("File created");
  });
});
