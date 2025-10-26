"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("cheerio");
/**
 * @param html The HTML content of the timetable page.
 */
class TimeTable {
    constructor(html) {
        this.$ = (0, cheerio_1.load)(html);
    }
    getTitle() {
        return this.$("title").text();
    }
    getListPath() {
        return this.$('frame[name="list"]').attr("src") || "";
    }
}
exports.default = TimeTable;
