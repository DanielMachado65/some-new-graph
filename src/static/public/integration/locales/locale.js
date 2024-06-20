define([
  "./integration/locales/ca.js",
  "./integration/locales/cs.js",
  "./integration/locales/de.js",
  "./integration/locales/es.js",
  "./integration/locales/fr.js",
  "./integration/locales/it.js",
  "./integration/locales/nl.js",
  "./integration/locales/pl.js",
  "./integration/locales/pt_br.js",
  "./integration/locales/ro.js",
  "./integration/locales/ru.js",
  "./integration/locales/tr.js",
  "./integration/locales/vi.js",
  "./integration/locales/zh.js",
  "./integration/locales/zh_cn.js",
], function () {
  var langId = (navigator.language || navigator.userLanguage)
    .toLowerCase()
    .replace("-", "_");
  var language = langId.substr(0, 2);
  var locales = {};

  for (index in arguments) {
    for (property in arguments[index])
      locales[property] = arguments[index][property];
  }
  if (!locales["en"]) locales["en"] = {};

  if (!locales[langId] && !locales[language]) language = "en";

  var locale = locales[langId] ? locales[langId] : locales[language];

  function __(text) {
    var index = locale[text];
    if (index === undefined) return text;
    return index;
  }

  function setLanguage(language) {
    locale = locales[language];
  }

  return {
    __: __,
    locales: locales,
    locale: locale,
    setLanguage: setLanguage,
  };
});
