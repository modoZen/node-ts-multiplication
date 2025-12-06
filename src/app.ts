import { yarg } from "./config/plugin/args.plugin";

// console.log(process.argv);

// console.log(yarg);

(async () => {
  await main();
})();

async function main() {
  // console.log("main");
  console.log(yarg);
}
