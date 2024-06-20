function isMobileApp(userAgent) {
  const toMatch = [/Android/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i];

  return toMatch.some((toMatchItem) => userAgent.match(toMatchItem));
}

module.exports = {
  isMobileApp,
};
