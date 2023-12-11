
const actions = require('./actions');

test('says hello', () => {
    expect(actions.hello()).toBe("Hello");
});