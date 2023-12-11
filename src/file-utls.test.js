const { getFontFiles } = require("./file-utils");
const path = require("path");

test("list fonts in a directory recursively", async () => {
  const fontsTestDir = path.resolve(__dirname, "../test_data/fonts");
  const results = await getFontFiles(fontsTestDir);
  expect(results).toHaveLength(2);
  results.forEach((result) => {
    expect(result["path"].endsWith(".ttf")).toBeTruthy();
    expect(result["name"]).toBeDefined();
  });
});

test("list fonts in a directory - empty list", async () => {
  const emptyFontsTestDir = path.resolve(__dirname, "../test_data/fonts/other");
  const results = await getFontFiles(emptyFontsTestDir);
  expect(results).toHaveLength(0);
});
