describe("Test args.plugin", () => {
  const originalArgv = process.argv;
  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  const runCommand = async (args: string[]) => {
    process.argv = [...process.argv, ...args];

    const { yarg } = await import("./args.plugin");

    return yarg;
  };

  it("should return default values", async () => {
    const yarg = await runCommand(["-b", "5"]);

    expect(yarg).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: "multiplication-table",
        d: "outputs",
      })
    );
  });

  it("should return custom values", async () => {
    const yarg = await runCommand([
      "-b",
      "5",
      "-l",
      "20",
      "-s",
      "-n",
      "custom-name",
      "-d",
      "custom-dir",
    ]);

    expect(yarg).toEqual(
      expect.objectContaining({
        b: 5,
        l: 20,
        s: true,
        n: "custom-name",
        d: "custom-dir",
      })
    );
  });
});
