import { type CheerioAPI, load } from "cheerio";
import type { List, ListItem } from "./types";

export default class TimeTableList {
	public $: CheerioAPI;

	public constructor(html: string) {
		this.$ = load(html);
	}

	public getList(): List {
		if (this.getListType() === "select") {
			return this.getSelectList();
		}
		if (this.getListType() === "unordered") {
			return this.getUnorderedList();
		}

		return this.getExpandableList();
	}

	public getListType(): string {
		if (this.$("form[name=form]").length > 0) {
			return "select";
		}

		if (this.$("body table").length > 0) {
			return "expandable";
		}

		return "unordered";
	}

	public getLogoSrc(): string | null {
		return this.$(".logo img").attr("src") || null;
	}

	private getSelectList(): List {
		return {
			classes: this.getSelectListValues("oddzialy"),
			teachers: this.getSelectListValues("nauczyciele"),
			rooms: this.getSelectListValues("sale"),
		};
	}

	private getSelectListValues(name: string): ListItem[] {
		const nodes = this.$(`[name=${name}] option`).toArray();
		nodes.shift();

		const values: ListItem[] = [];
		nodes.forEach((node): void => {
			values.push({
				name: this.$(node).text(),
				value: this.$(node).attr("value") || "",
			});
		});

		return values;
	}

	private getExpandableList(): List {
		return this.getTimetableUrlSubType(
			"#oddzialy a",
			"#nauczyciele a",
			"#sale a",
		);
	}

	private getUnorderedList(): List {
		let teachersQuery = "ul:nth-of-type(2) a";
		let roomsQuery = "ul:nth-of-type(3) a";

		// If there is only one header, there are no teachers or rooms sections
		if (this.$("h4").length === 1) {
			teachersQuery = "";
			roomsQuery = "";
		} else if (this.$("h4:nth-of-type(2)").text() === "Sale") {
			// If the second header is "Sale", there is no teachers section
			teachersQuery = "";
			roomsQuery = "ul:nth-of-type(2) a";
		}

		return this.getTimetableUrlSubType(
			"ul:first-of-type a",
			teachersQuery,
			roomsQuery,
		);
	}

	private getTimetableUrlSubType(
		classQuery: string,
		teachersQuery: string,
		roomsQuery: string,
	): List {
		return {
			classes: this.getSubTypeValue(classQuery, "o"),
			// Return empty arrays when the corresponding sections are missing
			teachers: this.getSubTypeValue(teachersQuery, "n"),
			rooms: this.getSubTypeValue(roomsQuery, "s"),
		};
	}

	private getSubTypeValue(query: string, prefix: string): ListItem[] {
		const values: ListItem[] = [];

		// Safeguard: empty query means no section present
		if (!query) return values;

		const nodes = this.$(query);
		if (nodes.length === 0) return values;

		nodes.each((_, node) => {
			const href = this.$(node).attr("href") || "";
			values.push({
				name: this.$(node).text(),
				value: href
					? href.replace(".html", "").replace(`plany/${prefix}`, "")
					: "",
			});
		});

		return values;
	}
}
