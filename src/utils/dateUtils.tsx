export default function convertUnixTimeToNormal(unixTimestamp: number): string {
    const date = new Date(unixTimestamp);
    const formattedDate = date.toLocaleString();
    return formattedDate;
  }