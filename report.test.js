const { sortPages } = require("./report.js");
const { test, expect } = require("@jest/globals");

test("sortPages", () => {
  const input = {
    "www.example.com/path": 1,
    "www.example.com/path2": 2,
    "www.example.com/path3": 3,
  };

  const actual = sortPages(input);
  const expected = {
    "www.example.com/path3": 3,
    "www.example.com/path2": 2,
    "www.example.com/path": 1,
  };

  expect(actual).toStrictEqual(expected);
});
