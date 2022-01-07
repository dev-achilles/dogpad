import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import { DateLocalizer } from "react-big-calendar";
import * as dates from "react-big-calendar/lib/utils/dates";

dayjs.extend(localeData);

let dateRangeFormat = ({ start, end }: any, culture: any, local: any) =>
  local.format(start, "L", culture) + " – " + local.format(end, "L", culture);

let timeRangeFormat = ({ start, end }: any, culture: any, local: any) =>
  local.format(start, "LT", culture) + " – " + local.format(end, "LT", culture);

let timeRangeStartFormat = ({ start }: any, culture: any, local: any) =>
  local.format(start, "LT", culture) + " – ";

let timeRangeEndFormat = ({ end }: any, culture: any, local: any) =>
  " – " + local.format(end, "LT", culture);

let weekRangeFormat = ({ start, end }: any, culture: any, local: any) =>
  local.format(start, "MMMM DD", culture) +
  " – " +
  local.format(end, dates.eq(start, end, "month") ? "DD" : "MMMM DD", culture);

export let formats = {
  dateFormat: "DD",
  dayFormat: "DD ddd",
  weekdayFormat: "ddd",

  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,
  eventTimeRangeStartFormat: timeRangeStartFormat,
  eventTimeRangeEndFormat: timeRangeEndFormat,

  timeGutterFormat: "LT",

  monthHeaderFormat: "MMMM YYYY",
  dayHeaderFormat: "dddd MMM DD",
  dayRangeHeaderFormat: weekRangeFormat,
  agendaHeaderFormat: dateRangeFormat,

  agendaDateFormat: "ddd MMM DD",
  agendaTimeFormat: "LT",
  agendaTimeRangeFormat: timeRangeFormat,
};

export const dayjsLocalizer = () => {
  let locale = (m: any, c: any) => (c ? m.locale(c) : m);

  return new DateLocalizer({
    formats,
    firstOfWeek(culture) {
      return 1;
    },

    format(value, format, culture) {
      return locale(dayjs(value), culture).format(format);
    },
  });
};
