// import { DataQuery } from '@grafana/data';
import { LabelValue } from '../DataSourceApi';
export const DATA_SOURCE_ID = 'dataFabric-datasource';
export const IS_INIT_BY_SERVER = true;
export * from './timeRange';

export enum FormatType {
  Timeseries = 'timeseries',
  Table = 'table',
}

export enum ETreeType{
  Time = 'time',
}

export enum EIconType{
  Filter = 'filter',
  Grupp = 'group',
}

export enum EBtnType{
  MultiSelect = 'multi-selection',
  SwitchGroupFilter = 'switch-group-filter',
  OtherTree = 'other-btn',
}

export interface IEnableVars {
  [key: string]: boolean;
}

export interface INextLayerInfo {
  children: IRenderInfo[],
  enableVars?: IEnableVars
}

export interface IOptions {
  text: string,
  value: string,
}

export interface IQueryBody{
  [key: string]: any
}

export interface IRenderInfo {
  key: string,
  label: string,
  path: string,
  type: EBtnType,
  enable?: string,
  restrictedBy?: string,
  sw?: boolean,
  iconType?: EIconType
}

export interface INode{
  value: LabelValue;
  options: LabelValue[];
  renderInfo: IRenderInfo,
  children?: IRenderInfo[];
  enableVars?: IEnableVars;
}

export class CNode implements INode{
  renderInfo: IRenderInfo;
  value: LabelValue;
  options: LabelValue[];
  children?: IRenderInfo[];
  enableVars?: IEnableVars;

  constructor(props?: any){
    this.renderInfo = props?.label ? props.label: {};
    this.value = props?.value ? props.value: '';
    this.options = props?.options ? props.options: [];
    this.children = props?.children ? props.children: [];
    this.enableVars = props?.enableVars ? props.enableVars: null;
  }
}

export class CRenderInfo implements IRenderInfo{
  key: string;
  label: string;
  path: string;
  type: EBtnType;

  constructor(props?: any){
    this.key = props?.key ? props.key :'';
    this.label = props?.label? props.label : {};
    this.path = props?.path ? props.path :'';
    this.type = props?.type ? props.type :[];
  }
}

export const SUFFIX_FOR_F2E = 'SuffixName';
export const SUFFIX_FOR_ENABLE = 'Enable';
export const TYPE_LABEL = 'Format as';