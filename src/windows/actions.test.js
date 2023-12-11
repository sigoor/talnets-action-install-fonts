const { hello } = require("./actions");

test("says hello", () => {
  expect(hello()).toBe("Hello");
});
