import { ReactNode } from "react";
import { isBefore, isSameWeek, startOfWeek } from "date-fns";

import useWeekView, { Days } from "./use-weekview";
import Header from "./header";
import DaysHeader from "./days-header";
import Grid from "./grid";

export default function WeekView({
  HeaderComponent,
}: {
  HeaderComponent?: (props: {
    days: Days;
    title: string;
    onNext: () => void;
    onPrev: () => void;
    onToday: () => void;
    showTodayButton: boolean;
  }) => ReactNode;
}) {
  const { days, nextWeek, previousWeek, goToToday, viewTitle } = useWeekView({
    disabledCell(date) {
      return isBefore(date, new Date());
    },
    disabledWeek(startDayOfWeek) {
      return isBefore(startDayOfWeek, startOfWeek(new Date()));
    },
  });

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {HeaderComponent ? (
        HeaderComponent({
          days,
          title: viewTitle,
          onNext: nextWeek,
          onPrev: previousWeek,
          onToday: goToToday,
          showTodayButton: !isSameWeek(days[0].date, new Date()),
        })
      ) : (
        <Header
          title={viewTitle}
          onNext={nextWeek}
          onPrev={previousWeek}
          onToday={goToToday}
          showTodayButton={!isSameWeek(days[0].date, new Date())}
        />
      )}
      <div className="flex flex-col flex-1 overflow-hidden select-none">
        <div className="flex flex-col flex-1 isolate overflow-auto">
          <div className="flex flex-col flex-none min-w-[700px]">
            <DaysHeader days={days} />
            <Grid days={days} />
          </div>
        </div>
      </div>
    </div>
  );
}
