function printReport(pages) {
  console.log("*-----*");
  console.log("REPORT");
  console.log("*-----*");
  const sortedPages = sortPages(pages);
  for (const page in sortedPages) {
    console.log(`Found ${pages[page]} links on : ${page}`);
  }
}

function sortPages(pages) {
  const sorted = {};

  Object.keys(pages)
    .sort((a, b) => pages[b] - pages[a])
    .forEach((key) => {
      sorted[key] = pages[key];
    });

  return sorted;
}

module.exports = {
  sortPages,
  printReport,
};
