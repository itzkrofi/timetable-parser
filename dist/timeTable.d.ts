import { type CheerioAPI } from "cheerio";
/**
 * @param html The HTML content of the timetable page.
 */
export default class TimeTable {
    $: CheerioAPI;
    constructor(html: string);
    getTitle(): string;
    getListPath(): string;
}
