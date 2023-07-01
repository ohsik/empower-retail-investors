import { createContext } from "react";

import { Brokerages } from "../../../lib/consts/brokerages";
import { TimeDurationSelectType } from "../../../lib/consts/time-duration-select";

type Conext = {
  selectedBrokerage: Brokerages;
  selectedTimeDuration: TimeDurationSelectType;
  setSelectedTimeDuration: (timeDuration: TimeDurationSelectType) => void;
}

export const SelectedDataContext = createContext<Conext>({
  selectedBrokerage: Brokerages.All,
  selectedTimeDuration: TimeDurationSelectType.All,
  setSelectedTimeDuration: () => {},
});