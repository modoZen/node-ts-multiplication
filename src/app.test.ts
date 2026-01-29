import { ServerApp } from "./presentation/server-app";

describe("server app tests", () => {
  it("should call Server.run with values", async () => {
    const serverRunMock = jest.fn();

    ServerApp.run = serverRunMock;

    process.argv = [
      "node",
      "app",
      "-b",
      "10",
      "-l",
      "7",
      "-d",
      "my-dir",
      "-n",
      "my-file",
      "-s",
    ];

    await import("./app");

    expect(serverRunMock).toHaveBeenCalledWith({
      base: 10,
      limit: 7,
      showTable: true,
      destination: "my-dir",
      fileName: "my-file",
    });
  });
});
