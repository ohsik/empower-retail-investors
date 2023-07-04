import { useContext } from "react";
import { SelectedDataContext } from "../../src/dashboard/context";
import { formatDate } from "./date-format";
import moment from "moment";

export function splitWeeklyDateRange(dateRange: string): string[] {
  const [startDate, endDate] = dateRange.split(" to ")
  const dateArray = [startDate, endDate]
  return dateArray
}

export function dateKeyConvert(dateInput: string): string {
  const { selectedTimeDuration } = useContext(SelectedDataContext);

  if(selectedTimeDuration === 'weekly') {
    const [startDate, endDate] = dateInput.split(" to ")
    const date = `${formatDate(startDate)} to ${formatDate(endDate)}`
    return date
  }

  if(selectedTimeDuration === 'monthly') {
    return moment(dateInput, 'YYYY-MM-DD').format('MMM YYYY');
  }

  if(selectedTimeDuration === 'yearly') {
    return moment(dateInput, 'YYYY-MM-DD').format('YYYY');
  }

  return moment(dateInput, 'YYYY-MM-DD').format('MMM DD, YYYY');
}