export default function convertUnixTimeToNormal(
  startTime: number,
  endTime: number
): string {
  const optionsDate: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const startDate = new Date(startTime).toLocaleString("en-US", optionsDate);
  const startTimeFormatted = new Date(startTime).toLocaleString(
    "en-US",
    optionsTime
  );
  const endDate = new Date(endTime).toLocaleString("en-US", optionsDate);
  const endTimeFormatted = new Date(endTime).toLocaleString(
    "en-US",
    optionsTime
  );

  if (startDate === endDate) {
    return `${startDate} ${startTimeFormatted} - ${endTimeFormatted}`;
  } else {
    return `${startDate} ${startTimeFormatted} to ${endDate} ${endTimeFormatted}`;
  }
}
