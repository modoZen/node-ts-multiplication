import { yarg } from "./config/plugin/args.plugin";
import { ServerApp } from "./presentation/server-app";

// console.log(process.argv);

// console.log(yarg);

(async () => {
  await main();
})();

async function main() {
  // console.log("main");
  const { b: base, l: limit, s: showTable, d: destination, n: fileName } = yarg;
  ServerApp.run({ base, limit, showTable, destination, fileName });
}
