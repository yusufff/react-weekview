import { isSameWeek } from "date-fns";

import useWeekView, { Cell } from "./use-weekview";
import Header from "./header";
import DaysHeader from "./days-header";
import Grid from "./grid";
import EventGrid from "./event-grid";

export type Event = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
};

export default function WeekView({
  initialDate,
  minuteStep = 30,
  weekStartsOn = 1,
  locale,
  rowHeight = 56,
  disabledCell,
  disabledDay,
  disabledWeek,
  events,
  onCellClick,
  onEventClick,
}: {
  initialDate?: Date;
  minuteStep?: number;
  weekStartsOn?: Day;
  locale?: Locale;
  rowHeight?: number;
  disabledCell?: (date: Date) => boolean;
  disabledDay?: (date: Date) => boolean;
  disabledWeek?: (startDayOfWeek: Date) => boolean;
  events?: Event[];
  onCellClick?: (cell: Cell) => void;
  onEventClick?: (event: Event) => void;
}) {
  const { days, nextWeek, previousWeek, goToToday, viewTitle } = useWeekView({
    initialDate,
    minuteStep,
    weekStartsOn,
    locale,
    disabledCell,
    disabledDay,
    disabledWeek,
  });

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Header
        title={viewTitle}
        onNext={nextWeek}
        onPrev={previousWeek}
        onToday={goToToday}
        showTodayButton={!isSameWeek(days[0].date, new Date())}
      />
      <div className="flex flex-col flex-1 overflow-hidden select-none">
        <div className="flex flex-col flex-1 isolate overflow-auto">
          <div className="flex flex-col flex-none min-w-[700px]">
            <DaysHeader days={days} />
            <div className="grid grid-cols-1 grid-rows-1">
              <div className="row-start-1 col-start-1">
                <Grid
                  days={days}
                  rowHeight={rowHeight}
                  onCellClick={onCellClick}
                />
              </div>
              <div className="row-start-1 col-start-1">
                <EventGrid
                  days={days}
                  events={events}
                  weekStartsOn={weekStartsOn}
                  locale={locale}
                  minuteStep={minuteStep}
                  rowHeight={rowHeight}
                  onEventClick={onEventClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
