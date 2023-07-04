import moment from "moment";
import { AllData } from "../types";

type DataByTimeDurationReturn = {
  [key: string]: any[]
}

export function dataByTimeDuration(duration: string, localData: any): Promise<DataByTimeDurationReturn> | string {

  const dataByDuration: DataByTimeDurationReturn = {};
  let itemCount = 0;

  // Because timeSynced: '2023-07-02T20:33:16.290Z' is string from localData
  if(typeof localData === 'string') {
    return localData
  }

  localData?.all.forEach((order: { executionDate: string; }) => {
    let durationSelected;

    switch (duration) {
      case "yearly":
        durationSelected = moment(order.executionDate).format("Y") + " ";
        break;
      case "monthly":
        durationSelected =
          moment(order.executionDate).format("Y-MM") + " ";
        break;
      case "weekly":
        durationSelected =
          moment(moment(order.executionDate).startOf("week")).format(
            "Y-MM-DD"
          ) +
          " to " +
          moment(moment(order.executionDate).endOf("week")).format("Y-MM-DD") +
          " ";
        break;
      case "daily":
        durationSelected =
          moment(order.executionDate).format("Y-MM-DD") + " ";
        break;
      default:
        durationSelected = "all";
    }

    if (durationSelected in dataByDuration) {
      dataByDuration[durationSelected].push(order);
    } else {
      dataByDuration[durationSelected] = [order];
    }

    itemCount += 1;
  });

  return new Promise((resolve, reject) => {
    if (localData?.all.length > 700) {
      setTimeout(() => {
        itemCount === localData?.all.length
          ? resolve(dataByDuration)
          : reject("dataByTimeDuration setTimeout failed");
      }, 500);
    } else {
      itemCount === localData?.all.length
        ? resolve(dataByDuration)
        : reject("dataByTimeDuration failed");
    }
  });
}
