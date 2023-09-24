
const oneWeekMillis = 1000 * 60 * 60 * 24 * 7; //1000 milliseconds, 60 seconds, 60 minutes, 24 hours, 7 days
export function getWeekNumber(date: Date = new Date()) {
    const startDate = new Date(date.getFullYear(), 0, 0);
    const diffMillis = date.getTime() - startDate.getTime();
    return Math.floor(diffMillis / oneWeekMillis);
}