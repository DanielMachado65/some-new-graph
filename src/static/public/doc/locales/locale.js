define([
    './doc/doc/doc/locales/ca.js',
    './doc/doc/doc/locales/cs.js',
    './doc/doc/doc/locales/de.js',
    './doc/doc/doc/locales/es.js',
    './doc/doc/doc/locales/fr.js',
    './doc/doc/doc/locales/it.js',
    './doc/doc/doc/locales/nl.js',
    './doc/doc/doc/locales/pl.js',
    './doc/doc/doc/locales/pt_br.js',
    './doc/doc/doc/locales/ro.js',
    './doc/doc/doc/locales/ru.js',
    './doc/doc/doc/locales/tr.js',
    './doc/doc/doc/locales/vi.js',
    './doc/doc/doc/locales/zh.js',
    './doc/doc/doc/locales/zh_cn.js',
], function () {
    var langId = (navigator.language || navigator.userLanguage)
        .toLowerCase()
        .replace('-', '_');
    var language = langId.substr(0, 2);
    var locales = {};

    for (index in arguments) {
        for (property in arguments[index])
            locales[property] = arguments[index][property];
    }
    if (!locales['en']) locales['en'] = {};

    if (!locales[langId] && !locales[language]) language = 'en';

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
