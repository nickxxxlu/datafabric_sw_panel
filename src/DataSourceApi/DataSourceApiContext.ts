import { MetricFindValue } from '@grafana/data';
import { IRenderInfo, IQueryBody } from '../constants';
import React from 'react';

export interface  MetricValue extends MetricFindValue {
  value: string;
}

export interface LabelValue {
  label: string;
  value: any;
}

export interface GroupMetricValue extends MetricValue {
  hasChildren: boolean;
  hasMachines: boolean;
}

export interface MachineMetricValue extends MetricValue {
  imageUrl?: string | null;
}

export interface IDataSourceApiContext {
  dataSourceLoaded: boolean;
  // TODO: add type for dataSourceApi
  dataSourceApi: any;
  // getRoots: () => Promise<IRenderInfo[]>;
  getAlarmLevels: () => Promise<LabelValue[]>;
  getGroupItems: (path: string, body: IQueryBody, lang?: string) => Promise<LabelValue[]>;
  getNextLayerInfo: (path: string, body?: IQueryBody, lang?: string) => Promise<IRenderInfo[]>;
  deleteUselessVar: (targetObj: IQueryBody, notForGrafanaQuery?: boolean) => Promise<IQueryBody>
  // getGroupMachines: (groupId: string) => Promise<MachineMetricValue[]>;
  // getMachineGroupId: (machineId: string) => Promise<string | undefined>;
  // getGroupTraverseList: (groupId: string) => Promise<GroupMetricValue[]>;
  // getMachineName: (machineId: string) => Promise<string | undefined>;
  // getParameterNames: (machineId: string) => Promise<LabelValue[]>;
  // getEnergyDeviceKinds: () => Promise<LabelValue[]>;
  // getEnergyUsages: (key: string) => Promise<LabelValue[]>;
}

const DataSourceApiContext = React.createContext<IDataSourceApiContext>({
  dataSourceLoaded: false,
  dataSourceApi: void 0,
  // get getRoots(): () => Promise<IRenderInfo[]> {
  //   throw new Error('You probably forgot to put <DataSourceApiProvider>.');
  // },
  get getAlarmLevels(): () => Promise<LabelValue[]> {
    throw new Error('You probably forgot to put <DataSourceApiProvider>.');
  },
  get getGroupItems(): (path: string, body: IQueryBody, lang?: string) => Promise<LabelValue[]> {
    throw new Error('You probably forgot to put <DataSourceApiProvider>.');
  },
  get getNextLayerInfo(): (path: string, body?: IQueryBody, lang?: string) => Promise<IRenderInfo[]> {
    throw new Error('You probably forgot to put <DataSourceApiProvider>.');
  },
  get deleteUselessVar(): (targetObj: IQueryBody, notForGrafanaQuery?: boolean) => Promise<IQueryBody> {
    throw new Error('You probably forgot to put <DataSourceApiProvider>.');
  },
  // get getGroupMachines(): (groupId: string) => Promise<MachineMetricValue[]> {
  //   throw new Error('You probably forgot to put <DataSourceApiProvider>.');
  // },
  // get getMachineGroupId(): (machineId: string) => Promise<string | undefined> {
  //   throw new Error('You probably forgot to put <DataSourceApiProvider>.');
  // },
  // get getGroupTraverseList(): (groupId: string) => Promise<GroupMetricValue[]> {
  //   throw new Error('You probably forgot to put <DataSourceApiProvider>.');
  // },
  // get getMachineName(): (machineId: string) => Promise<string | undefined> {
  //   throw new Error('You probably forgot to put <DataSourceApiProvider>.');
  // },
  // get getParameterNames(): (machineId: string) => Promise<LabelValue[]> {
  //   throw new Error('You probably forgot to put <DataSourceApiProvider>.');
  // },
  // get getEnergyDeviceKinds(): () => Promise<LabelValue[]> {
  //   throw new Error('You probably forgot to put <DataSourceApiProvider>.');
  // },
  // get getEnergyUsages(): (key: string) => Promise<LabelValue[]> {
  //   throw new Error('You probably forgot to put <DataSourceApiProvider>.');
  // },
});

export default DataSourceApiContext;
