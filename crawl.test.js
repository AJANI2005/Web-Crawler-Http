const { normalizeUrl } = require("./crawl");
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
