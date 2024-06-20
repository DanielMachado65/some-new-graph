const axios = require("axios");

module.exports = class YoutubeService {
    async getEmbedInfo(url) {
        const videoId = url.match(/(?<=v=).+?(?=&|$)/);
        const response = await axios
            .get(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`);
        return response.status === 200 ? {
            title: response.data.title,
            embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
        } : null;
    }
}