/* eslint-disable no-undef */
/* eslint-disable global-require */
test('Can mount app', () => {
  document.body.innerHTML = '<div id="app">'
    + '</div>';

  // Executes main file
  require('@/main');

  const appWrapper = document.getElementById('app');
  expect(appWrapper).toBeTruthy();
});
