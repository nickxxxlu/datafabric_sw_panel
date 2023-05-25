import { TimeType } from './enums';

export interface SimpleOptions {
  text: string;
  adjustFontSize: boolean;
  fontSize: string;
  fontColor: string;
  updateTime: string;
  queryDate: any;
  groupLabels?: string[];
  machineLabel?: string;
  parameterLabel?: string;
  timeTypeLabel?: string;
  timeTypeEnable?: boolean;
  timeTypes?: TimeType[];
  groupOnly?: boolean;
  parameterEnable?: boolean;
  energyDeviceKindLabel?: string;
  energyDeviceKindUsageLabel?: string;
  energyDeviceKindEnable?: boolean;
  energyDeviceKindUsageEnable?: boolean;
  alarmLevelLabel?: string;
  alarmLevelEnable?: boolean;
  oeeAlertKindLabel?: string;
  oeeAlertKindEnable?: boolean;
}

export const defaults: SimpleOptions = {
  text: '',
  adjustFontSize: true,
  fontSize: '90%',
  fontColor: '#ffffff',
  updateTime: '',
  queryDate: '',
};