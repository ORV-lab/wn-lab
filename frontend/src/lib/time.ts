const relativeTimeFormatter = new Intl.RelativeTimeFormat("ru", { numeric: "auto" });

export function formatRelativeDate(isoDate: string): string {
  const target = new Date(isoDate).getTime();
  const now = Date.now();
  const diffSeconds = Math.round((target - now) / 1000);

  const ranges: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ["year", 60 * 60 * 24 * 365],
    ["month", 60 * 60 * 24 * 30],
    ["week", 60 * 60 * 24 * 7],
    ["day", 60 * 60 * 24],
    ["hour", 60 * 60],
    ["minute", 60],
  ];

  for (const [unit, seconds] of ranges) {
    if (Math.abs(diffSeconds) >= seconds || unit === "minute") {
      return relativeTimeFormatter.format(Math.round(diffSeconds / seconds), unit);
    }
  }

  return "только что";
}

export function formatLongDate(isoDate: string): string {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}
