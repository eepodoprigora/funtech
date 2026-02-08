import Typograf from 'typograf';

const DEFAULT_LOCALE = 'en-US';

Typograf.addRule({
    name: 'common/other/aposToQuot',
    handler: function (text) {
        return text.replace(/&apos;/g, "'");
    },
});

const typograf = new Typograf({ locale: ['ru', 'en-US'] });

typograf.enableRule(['common/nbsp/afterNumber']);


const cache = new Map<string, string>();

export const tp = (str: string, locale = DEFAULT_LOCALE) => {
    if (cache.has(str)) {
        return cache.get(str)!;
    }

    const result = typograf.execute(str, { locale: locale === 'ru' ? 'ru' : 'en-US' });
    cache.set(str, result);

    return result;
};
