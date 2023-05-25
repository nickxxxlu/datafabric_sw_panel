import React from 'react';

import { TimeType } from '../enums';

export interface IOptionValueContext {
  groupLabels?: string[];
  machineLabel?: string;
  parameterLabel?: string;
  groupOnly?: boolean;
  parameterEnable?: boolean;
  timeTypeLabel?: string;
  timeTypeEnable?: boolean;
  timeTypes?: TimeType[];
  energyDeviceKindLabel?: string;
  energyDeviceKindUsageLabel?: string;
  energyDeviceKindEnable?: boolean;
  energyDeviceKindUsageEnable?: boolean;
  alarmLevelLabel?: string;
  alarmLevelEnable?: boolean;
  oeeAlertKindLabel?: string;
  oeeAlertKindEnable?: boolean;
  // [key: string]: boolean
}

const OptionValueContext = React.createContext<IOptionValueContext>({});

export default OptionValueContext;
