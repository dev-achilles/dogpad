import dayjs from "dayjs";
import Duration from "dayjs/plugin/duration";
import RelativeTime from "dayjs/plugin/relativeTime";
import Utc from "dayjs/plugin/utc";

dayjs.extend(RelativeTime);
dayjs.extend(Duration);
dayjs.extend(Utc);

export const DEFAULT_FORMAT = "D MMM, HH:mm";
