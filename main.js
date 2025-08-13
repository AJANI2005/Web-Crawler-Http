const { crawlURL } = require("./crawl.js");

async function main() {
  if (process.argv.length < 3) {
    console.log("no url provided");
    process.exit(1);
  }

  if (process.argv.length > 3) {
    console.log("too many arguments provided");
    console.log("Usage: node main.js <url>");
    process.exit(1);
  }

  const baseURL = process.argv[2];
  const pages = await crawlURL(baseURL, baseURL, {});
  for (const page in pages) {
    console.log(`${page}: ${pages[page]}`);
  }
}

main();
