"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require("axios");
const cheerio = require("cheerio");

async function kuGeCi(query) {
    let response = await axios.default.get("https://www.kugeci.com/search?q=" + encodeURIComponent(query));
    const $ = cheerio.load(response.data || "")
    const elements = $("#tablesort>tbody>tr");
    if (elements.length === 0) {
        return [];
    }

    let result = elements.map((i, el) => {
        return {
            title: $(el).find("tr>td:nth-child(2) a").text(),
            id: $(el).find("tr>td:nth-child(2) a").attr("href"),
            artist: $(el).find("tr>td:nth-child(3) a").text(),
        }
    }).get();
    return result;
}

async function search(query, page, type) {
    if (type !== 'lyric') {
        return;
    }

    // 替换后缀
    query = query.replace(/(.*)\..*/, "$1");
    let artist = "";
    let title = "";

    if (query.includes("-")) {
        [artist, title] = query.split(/\s*-\s*/).map(i => i.trim());
    } else {
        title = query;
    }

    return {
        isEnd: true,
        data: await kuGeCi(title),// 酷歌词接口
    }
}
    
async function getLyric(musicItem) {
    let response = await axios.default.get(musicItem.id)
    return {
        rawLrc: cheerio.load(response.data)("#lyricsContainer").text()
    }
}

module.exports = {
    platform: "歌词千寻(搜)",
    author: '风言锋语88',
    version: "0.0.0",
	srcUrl: "https://raw.gitmirror.com/yf9988/yf9988.github.io/main/MusicFree/酷歌词搜索.js",
    cacheControl: "no-store",
    supportedSearchType: ['lyric'],
    search,
    getLyric
}