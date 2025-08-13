const { normalizeUrl, getURLsFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeUrl strip protocol", () => {
  const input = "https://www.example.com/path";
  const actual = normalizeUrl(input);
  const expected = "www.example.com/path";
  expect(actual).toBe(expected);
});

test("normalizeUrl trailing slash", () => {
  const input = "https://www.example.com/path/";
  const actual = normalizeUrl(input);
  const expected = "www.example.com/path";
  expect(actual).toBe(expected);
});

test("normalizeUrl capitals", () => {
  const input = "https://WWW.example.com/path/";
  const actual = normalizeUrl(input);
  const expected = "www.example.com/path";
  expect(actual).toBe(expected);
});
test("normalizeUrl strip http", () => {
  const input = "http://www.example.com/path/";
  const actual = normalizeUrl(input);
  const expected = "www.example.com/path";
  expect(actual).toBe(expected);
});

test("getURLsFromHTML absolute", () => {
  const inputHTML = `
    <html>
        <body>
          <a href="https://www.example.com/path/">Example</a>
        </body>
    </html>
  `;
  const inputBaseURL = "https://www.example.com";
  const actual = getURLsFromHTML(inputHTML, inputBaseURL);
  const expected = ["https://www.example.com/path/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputHTML = `
    <html>
        <body>
          <a href="/path/">Example</a>
        </body>
    </html>
  `;
  const inputBaseURL = "https://www.example.com";
  const actual = getURLsFromHTML(inputHTML, inputBaseURL);
  const expected = ["https://www.example.com/path/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative and absolute", () => {
  const inputHTML = `
    <html>
        <body>
          <a href="https://www.example.com/path1/">Example</a>
          <a href="/path2/">Example</a>
        </body>
    </html>
  `;
  const inputBaseURL = "https://www.example.com";
  const actual = getURLsFromHTML(inputHTML, inputBaseURL);
  const expected = [
    "https://www.example.com/path1/",
    "https://www.example.com/path2/",
  ];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML invalid url", () => {
  const inputHTML = `
    <html>
        <body>
          <a href="invalid">Example</a>
        </body>
    </html>
  `;
  const inputBaseURL = "https://www.example.com";
  const actual = getURLsFromHTML(inputHTML, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
