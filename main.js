const { crawlURL } = require("./crawl.js");

function main() {
  if (process.argv.length < 3) {
    console.log("no url provided");
    process.exit(1);
  }

  if (process.argv.length > 3) {
    console.log("too many arguments provided");
    console.log("Usage: node main.js <url>");
    process.exit(1);
  }

  const url = process.argv[2];
  crawlURL(url);
}

main();
