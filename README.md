# React WeekView

A React component and hook for creating week view calendars.

You can use the `useWeekView` hooks for creating a fully customized week calendar or use the `WeekView` component.

**Demo**: [react-weekview.vercel.app](https://react-weekview.vercel.app)

## Quick Features

- Headless hook for building customized designs
- Prestyled and customizable component
- Minimal dependency (only [date-fns](https://date-fns.org/))
- Simple, not bloated

## Example

```bash
# npm
npm install react-weekview

# yarn
yarn add react-weekview
```

```tsx
// use the hook and build the design yourself
const { days, nextWeek, previousWeek, goToToday, viewTitle } = useWeekView({
  disabledCell(date) {
    return isBefore(date, new Date());
  },
  disabledWeek(startDayOfWeek) {
    return isBefore(startDayOfWeek, startOfWeek(new Date()));
  },
});

// or use the component
<WeekView />;
```

## `useWeekView`

### Props

| prop           | type                                                          | default            | description                                                  |
| :------------- | :------------------------------------------------------------ | :----------------- | :----------------------------------------------------------- |
| `initialDate`  | `?Date`                                                       | `new Date()`       | Initial date to start from                                   |
| `minuteStep`   | `?number`                                                     | `30`               | How many minutes should there be between the generated cells |
| `weekStartsOn` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6`                             | `1`                | the index of the first day of the week (0 - Sunday)          |
| `locale`       | [`date-fns` Locale](https://date-fns.org/v2.30.0/docs/Locale) | `date-fns` default | A locale object                                              |
| `disabledCell` | `?(date: Date) => boolean`                                    | -                  | A function for determining the cells that cannot be selected |
| `disabledDay`  | `?(date: Date) => boolean`                                    | -                  | A function for determining the days that cannot be selected  |
| `disabledWeek` | `?(startDayOfWeek: Date) => boolean`                          | -                  | A function for determining the weeks that cannot be viewed   |

### Returns

| field          | type                                    | description                                    |
| :------------- | :-------------------------------------- | :--------------------------------------------- |
| `days`         | [`Days`](/src/lib/use-weekview.ts#L115) | An array of days and hours for the active week |
| `weekNumber`   | `string`                                | Week number of the active week                 |
| `viewTitle`    | `string`                                | Month and year of the active week              |
| `nextWeek`     | `() => void`                            | Go to next week                                |
| `previousWeek` | `() => void`                            | Go to previous week                            |
| `goToToday`    | `() => void`                            | Go to current week                             |

## `<WeekView />`

### Props

_...`useWeekView` props_
| prop | type | default | description |
| :------------- | :------------------------------------------------------------ | :----------------- | :----------------------------------------------------------- |
| `events` | [`?Event[]`](/src/lib/weekview.tsx#L9) | - | Event list to display on the calendar |
| `onCellClick` | `?(cell: Cell) => void` | - | Cell click callback |
| `onEventClick` | `?(evet: Event) => void` | - | Event click callback |
