const { JSDOM } = require("jsdom");

async function crawlURL(url) {
  console.log("Active Crawling", url);
  try {
    const res = await fetch(url);
    if (res.status > 399) {
      console.log(
        `error fetching with status code ${res.status} on page: ${url}`,
      );
      return;
    }
    const contentType = res.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `error fetching url: ${url} , expected html but got ${contentType}`,
      );
      return;
    }
    const body = await res.text();
    console.log(body);
    return body;
  } catch (e) {
    console.log(`error fetching url: ${e.message}`);
    return;
  }
}

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
        console.log(`error with relative url: ${e.message}`);
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

function normalizeURL(url) {
  try {
    const urlObj = new URL(url);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
      return hostPath.slice(0, -1);
    }
  } catch (e) {
    console.log(`error normalizing url ${e.message}`);
    return;
  }

  return hostPath;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlURL,
};
