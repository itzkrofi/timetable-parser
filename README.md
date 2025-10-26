# @itzkrofi/timetable-parser

## Installation

### PNPM (or any package manager)

```bash
pnpm add @itzkrofi/timetable-parser
```

## Usage/Examples

### Parsing timetable index page

```js
import { Timetable } from "@itzkrofi/timetable-parser";

const timetable = new Timetable(/*Content of index.html file*/);

// Returns: String containing title of the timetable
const title = timetable.getTitle();

// Returns: String containing path to lista.html file
const list = timetable.getListPath();
```

### Parsing Timetable List

```js
import { TimetableList } from "@itzkrofi/timetable-parser";

const timetableList = new TimetableList(/*Content of lista.html file*/);

// Returns: Object of 3 lists
const list = timetableList.getList();

// Returns: String containing path to school logo
const logo = timetableList.getLogoSrc();
```

### Parsing Table

```js
import { Table } from "@itzkrofi/timetable-parser";

const table = new Table(/*Content of plany/XYY.html file*/);

// Returns: String containing title of the timetable
const title = table.getTitle();

// Returns: Array of days from timetable headers
const dayNames = table.getDayNames();

// Returns: Object of hours
const hours = table.getHours();

// Returns: Array of lessons sorted by lesson number
const rawDays = table.getRawDays();

// Returns: Array of lessons sorted by days
const days = table.getDays();

// Returns: String containing timetable generation date
const generated = title.getGeneratedDate();

// Returns: String containing timetable effective date
const generated = title.getVersionInfo();
```
