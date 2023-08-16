import { useState } from "react";
import {
  addDays,
  eachDayOfInterval,
  eachMinuteOfInterval,
  endOfDay,
  startOfDay,
  startOfWeek,
  isToday,
  format,
  Day,
  Locale,
  isSameMonth,
  isSameYear,
} from "date-fns";

export default function useWeekView({
  initialDate,
  minuteStep = 30,
  weekStartsOn = 1,
  locale,
  disabledCell,
  disabledDay,
  disabledWeek,
}:
  | {
      initialDate?: Date;
      minuteStep?: number;
      weekStartsOn?: Day;
      locale?: Locale;
      disabledCell?: (date: Date) => boolean;
      disabledDay?: (date: Date) => boolean;
      disabledWeek?: (startDayOfWeek: Date) => boolean;
    }
  | undefined = {}) {
  const [startOfTheWeek, setStartOfTheWeek] = useState(
    startOfWeek(startOfDay(initialDate || new Date()), { weekStartsOn })
  );

  const nextWeek = () => {
    const nextWeek = addDays(startOfTheWeek, 7);
    if (disabledWeek && disabledWeek(nextWeek)) return;
    setStartOfTheWeek(nextWeek);
  };

  const previousWeek = () => {
    const previousWeek = addDays(startOfTheWeek, -7);
    if (disabledWeek && disabledWeek(previousWeek)) return;
    setStartOfTheWeek(previousWeek);
  };

  const goToToday = () => {
    setStartOfTheWeek(startOfWeek(startOfDay(new Date()), { weekStartsOn }));
  };

  const days = eachDayOfInterval({
    start: startOfTheWeek,
    end: addDays(startOfTheWeek, 6),
  }).map((day) => ({
    date: day,
    isToday: isToday(day),
    name: format(day, "EEEE", { locale }),
    shortName: format(day, "EEE", { locale }),
    dayOfMonth: format(day, "d", { locale }),
    dayOfMonthWithZero: format(day, "dd", { locale }),
    dayOfMonthWithSuffix: format(day, "do", { locale }),
    disabled: disabledDay ? disabledDay(day) : false,
    cells: eachMinuteOfInterval(
      {
        start: startOfDay(day),
        end: endOfDay(day),
      },
      {
        step: minuteStep,
      }
    ).map((hour) => ({
      date: hour,
      hour: format(hour, "HH", { locale }),
      minute: format(hour, "mm", { locale }),
      hourAndMinute: format(hour, "HH:mm", { locale }),
      disabled: disabledCell ? disabledCell(hour) : false,
    })),
  }));

  const isAllSameYear = isSameYear(days[0].date, days[days.length - 1].date);
  const isAllSameMonth = isSameMonth(days[0].date, days[days.length - 1].date);

  let viewTitle = "";
  if (isAllSameMonth) viewTitle = format(days[0].date, "MMMM yyyy", { locale });
  else if (isAllSameYear)
    viewTitle = `${format(days[0].date, "MMM", { locale })} - ${format(
      days[days.length - 1].date,
      "MMM",
      { locale }
    )} ${format(days[0].date, "yyyy", { locale })}`;
  else
    viewTitle = `${format(days[0].date, "MMM yyyy", { locale })} - ${format(
      days[days.length - 1].date,
      "MMM yyyy",
      { locale }
    )}`;

  const weekNumber = format(days[0].date, "w", { locale });

  return {
    nextWeek,
    previousWeek,
    goToToday,
    days,
    weekNumber,
    viewTitle,
  };
}

export type Days = ReturnType<typeof useWeekView>["days"];
export type Cell = Days[number]["cells"][number];
