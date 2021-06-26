import _ from "lodash";
import moment from "moment/moment";
import { Moment } from "moment";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import "dayjs/locale/en";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

const language = "ko";
moment.locale(language);
dayjs.extend(relativeTime);
dayjs.locale(language);
dayjs.extend(updateLocale);
dayjs.updateLocale("ko", {
  relativeTime: {
    future: "%s 후",
    past: "%s 전",
    s: "방금",
    m: "1분",
    mm: "%d분",
    h: "1시간",
    hh: "%d시간",
    d: "1일",
    dd: "%d일",
    M: "1달",
    MM: "%d달",
    y: "1년",
    yy: "%d년"
  }
});
dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "%ds",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years"
  }
});

export const DATE_TIME_FORMAT = "YYYY/MM/DD HH:mm:ss";
export const DATE_TIME_FORMAT1 = "YYYY.MM.DD HH:mm:ss a";
export const DATE_TIME_FORMAT2 = "YYYY년 MM월 DD일 HH:mm:ss a";
export const DATE_TIME_FORMAT_INCLUDE_TIME_ZONE = "YYYY/MM/DD HH:mm:ss (UTCZ)";

export const toDateTimeText = (
  datetime: Moment | number,
  format: string = DATE_TIME_FORMAT
) => {
  return moment(datetime).format(format);
};

export const today = () => {
  return moment();
};

export const todayFormat = () => {
  return toDateTimeText(moment(), DATE_TIME_FORMAT1);
};

export const todayTime = () => {
  return new Date().getTime();
};

export const fromNow = (datetime: number | string) => {
  return dayjs(datetime).fromNow();
};

export const diffDays = (date1: number, date2: number) => {
  return dayjs(date1).diff(date2, "day");
};

export const diffMilliseconds = (date1: number, date2: number) => {
  return dayjs(date1).diff(date2);
};

export const toMSText = (seconds: number) => {
  const minutes = _.floor(seconds / 60);
  const remainSeconds = _.round(seconds % 60);
  return `${minutes}분 ${remainSeconds}초`;
};

export const toStartMonth = ({
  year,
  month
}: {
  year: number;
  month: number;
}) => {
  const date = moment()
    .year(year)
    .month(month);
  return date
    .startOf("month")
    .startOf("day")
    .startOf("hour")
    .startOf("minute");
};

export const toEndMonth = ({
  year,
  month
}: {
  year: number;
  month: number;
}) => {
  const date = moment()
    .year(year)
    .month(month);
  return date
    .endOf("month")
    .endOf("day")
    .endOf("hour")
    .endOf("minute");
};
