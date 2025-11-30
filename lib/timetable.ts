import { type CheerioAPI, load } from "cheerio";

/**
 * @param html The HTML content of the timetable page.
 */
export default class TimeTable {
	public $: CheerioAPI;

	public constructor(html: string) {
		this.$ = load(html);
	}

	public getTitle(): string {
		return this.$("title").text();
	}

	public getListPath(): string {
		return this.$('frame[name="list"]').attr("src") || "";
	}
}
