import { format, isBefore, setHours, setMinutes, startOfWeek } from "date-fns";
import { WeekView } from "./lib";

function App() {
  return (
    <div className="h-screen">
      <WeekView
        initialDate={new Date()}
        weekStartsOn={1}
        disabledCell={(date) => {
          return isBefore(date, new Date());
        }}
        disabledWeek={(startDayOfWeek) => {
          return isBefore(startDayOfWeek, startOfWeek(new Date()));
        }}
        events={[
          {
            id: "1",
            title: "Meeting",
            startDate: setMinutes(setHours(new Date(), 15), 15),
            endDate: setMinutes(setHours(new Date(), 16), 20),
          },
        ]}
        onCellClick={(cell) => alert(`Clicked ${format(cell.date, "Pp")}`)}
        onEventClick={(event) =>
          alert(
            `${event.title} ${format(event.startDate, "Pp")} - ${format(
              event.endDate,
              "Pp"
            )}`
          )
        }
      />
    </div>
  );
}

export default App;
