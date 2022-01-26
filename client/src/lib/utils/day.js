import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(updateLocale);
dayjs.extend(relativeTime);

dayjs.updateLocale('en', {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: '1s',
    ss: '%ds',
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1mo",
    MM: "%dmo",
    y: "1y",
    yy: "%dy"
  }
})

export default dayjs;