import moment from "moment";

type DataByTimeDurationReturn = {
  [key: string]: any[];
};

export function dataByTimeDuration(
  duration: string,
  localData: any
): Promise<DataByTimeDurationReturn> | string {
  const dataByDuration: DataByTimeDurationReturn = {};
  let itemCount = 0;

  if (typeof localData === "string") {
    return localData;
  }

  localData?.all.forEach((order: { executionDate: string }) => {
    let durationSelected;

    switch (duration) {
      case "yearly":
        durationSelected = moment(order.executionDate).format("YYYY") + " ";
        break;
      case "monthly":
        durationSelected =
          moment(order.executionDate).format("YYYY-MM") + " ";
        break;
      case "weekly":
        durationSelected =
          moment(moment(order.executionDate).startOf("week")).format(
            "YYYY-MM-DD"
          ) +
          " to " +
          moment(moment(order.executionDate).endOf("week")).format(
            "YYYY-MM-DD"
          ) +
          " ";
        break;
      case "daily":
        durationSelected =
          moment(order.executionDate).format("YYYY-MM-DD") + " ";
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

  const createPromise = (resolve: any, reject: any) => {
    if (localData?.all.length > 700) {
      setTimeout(() => {
        if (itemCount === localData?.all.length) {
          resolve(dataByDuration);
        } else {
          reject("dataByTimeDuration setTimeout failed");
        }
      }, 200);
    } else {
      if (itemCount === localData?.all.length) {
        resolve(dataByDuration);
      } else {
        reject("dataByTimeDuration failed");
      }
    }
  };

  return new Promise(createPromise);
}
