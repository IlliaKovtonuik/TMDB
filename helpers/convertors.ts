export const formatRuntime = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};
export const getYear = (dateStr: string) =>
  dateStr ? dateStr.split("-")[0] : "";

export const getRatingString = (adult: boolean) => (adult ? "R" : "PG-13");
