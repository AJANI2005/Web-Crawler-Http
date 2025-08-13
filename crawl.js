const { JSDOM } = require("jsdom");

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const links = dom.window.document.querySelectorAll("a");
  for (const link of links) {
    if (link.href.slice(0, 1) == "/") {
      // relative url
      try {
        const urlObj = new URL(`${baseURL}${link.href}`);
        urls.push(urlObj.href);
      } catch (e) {
        console.log(`error with relative url ${e.message}`);
      }
    } else {
      // absolute url
      try {
        const urlObj = new URL(`${link.href}`);
        urls.push(urlObj.href);
      } catch (e) {
        console.log(`error with absolute url ${e.message}`);
      }
    }
  }
  return urls;
}

function normalizeUrl(url) {
  const urlObj = new URL(url);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = {
  normalizeUrl,
  getURLsFromHTML,
};
