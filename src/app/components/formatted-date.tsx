export function FormattedDate({
  year,
  month,
  day,
}: {
  year: number;
  month: number;
  day: number;
}) {
  return (
    <span className="whitespace-nowrap md:flex-[0.3]">
      {`${formatMonthAndDay(month)}/${formatMonthAndDay(day)}/${year}`}
    </span>
  );
}

function formatMonthAndDay(monthOrDay: number) {
  return monthOrDay < 10 ? `0${monthOrDay}` : monthOrDay;
}
