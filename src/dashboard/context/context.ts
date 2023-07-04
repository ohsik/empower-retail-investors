import { createContext } from "react";

import { Brokerages } from "../../../lib/consts/brokerages";
import { TimeDurationSelectType } from "../../../lib/consts/time-duration-select";
import { AllData } from "../../../lib/types";

type Conext = {
  selectedBrokerage: Brokerages;
  selectedTimeDuration: TimeDurationSelectType;
  setSelectedTimeDuration: (timeDuration: TimeDurationSelectType) => void;
  originalTransformedData: AllData | undefined;
}

export const SelectedDataContext = createContext<Conext>({
  selectedBrokerage: Brokerages.All,
  selectedTimeDuration: TimeDurationSelectType.All,
  setSelectedTimeDuration: () => {},
  originalTransformedData: undefined,
});