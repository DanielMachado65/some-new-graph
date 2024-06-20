const axios = require("axios");
const htmlToText = require("html-to-text");

module.exports = class BlogService {
    _convertConfig = {
        wordwrap: false,
        selectors: [
            {
                selector: 'a',
                format: 'anchor',
                options: { ignoreHref: true },
            },
        ],
    }

    async fetchPostDataFromLink(url) {
        const slug = url.match(/(?<=https?:\/\/www\.olhonocarro\.com\.br\/blog\/).+?(?=(\?|\/)|$)/)[0];
        return this.fetchPostData(url, slug);
    }

    async fetchPostData(url, slug) {
        const response = await axios
            .get(`https://blog.olhonocarro.com.br/wp-json/wp/v2/posts?slug=${slug}&_embed`);
        const data = response.data[0];
        return {
            thumbnailImageUrl: data._embedded['wp:featuredmedia']['0'].source_url,
            title: htmlToText.convert(data.title.rendered, this._convertConfig),
            texts: htmlToText.convert(data.content.rendered, this._convertConfig)
                .split(/\n+/g)
                .slice(0, 3)
                .map(p => p.trim()),
            link: url
        };
    }
}